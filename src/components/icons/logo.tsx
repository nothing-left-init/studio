export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      {...props}
    >
      <path d="M10.5 5.5L8 3H3v5l2.5 2.5" />
      <path d="M13.5 18.5L16 21h5v-5l-2.5-2.5" />
      <path d="m14 9-5 5" />
      <path d="M4.5 8.5 3 10v4l1.5 1.5" />
      <path d="M19.5 15.5 21 14v-4l-1.5-1.5" />
    </svg>
  );
}
