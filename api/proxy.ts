export const config = {
  runtime: "edge",
};

const BLOCKED_HOSTS = ["localhost", "127.0.0.1", "::1", "0.0.0.0"];

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
]);

// @movie-web/providers remaps outgoing headers before sending to proxy.
// We reverse the mapping so the upstream server sees the correct header names.
const HEADER_REVERSE_MAP: Record<string, string> = {
  "x-user-agent": "user-agent",
  "x-x-real-ip": "x-real-ip",
};

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "X-Final-Destination, X-Set-Cookie",
    "Access-Control-Max-Age": "86400",
  };
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const url = new URL(request.url);
  const destination = url.searchParams.get("destination");

  if (!destination) {
    return new Response(JSON.stringify({ error: "destination param required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }

  let destUrl: URL;
  try {
    destUrl = new URL(destination);
    if (destUrl.protocol !== "http:" && destUrl.protocol !== "https:") {
      throw new Error("invalid protocol");
    }
    if (BLOCKED_HOSTS.some((h) => destUrl.hostname === h)) {
      throw new Error("blocked host");
    }
  } catch {
    return new Response(JSON.stringify({ error: "invalid destination URL" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }

  const forwardHeaders = new Headers();
  request.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP.has(lower)) return;
    const mapped = HEADER_REVERSE_MAP[lower] ?? key;
    forwardHeaders.set(mapped, value);
  });

  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  let upstream: Response;
  try {
    upstream = await fetch(destination, {
      method: request.method,
      headers: forwardHeaders,
      body: hasBody ? request.body : undefined,
      redirect: "follow",
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "upstream fetch failed", detail: String(err) }),
      {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      },
    );
  }

  const responseHeaders = new Headers(corsHeaders());
  responseHeaders.set("X-Final-Destination", upstream.url);

  upstream.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP.has(lower) || lower === "content-encoding") return;
    responseHeaders.set(key, value);
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
