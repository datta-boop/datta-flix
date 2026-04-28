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
      {/* Rounded-square base with blue-purple fill */}
      <rect width="40" height="40" rx="9" fill="#5D5DAE" />
      {/* Stylised "D" formed by a play arrow — left bar + right triangle */}
      <rect x="12" y="11" width="4" height="18" rx="2" fill="white" />
      <path d="M16 14 L29 20 L16 26 Z" fill="white" />
    </svg>
  );
}
