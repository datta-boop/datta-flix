export function DattaFlixMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Light background */}
      <rect width="40" height="40" rx="9" fill="#111111" />
      {/* White left bar of the "D" */}
      <rect x="11" y="10" width="4" height="20" rx="2" fill="#FFFFFF" />
      {/* White play-arrow forming the right curve of the "D" */}
      <path d="M15 13 L30 20 L15 27 Z" fill="#FFFFFF" />
    </svg>
  );
}
