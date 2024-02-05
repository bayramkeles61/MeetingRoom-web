import { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="m16.893 16.92l3.08 3.08m-.889-8.419c0 4.187-3.383 7.581-7.555 7.581c-4.173 0-7.556-3.394-7.556-7.58C3.973 7.393 7.356 4 11.528 4c4.173 0 7.556 3.394 7.556 7.581"
      ></path>
    </svg>
  );
}
