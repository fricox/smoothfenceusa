"use client";

const PHONE = "13864039460";
const MESSAGE = encodeURIComponent(
  "Hi! I'm interested in getting a fence quote from Smooth Fence USA."
);

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 focus:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-7 w-7"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.498 1.132 6.738 3.054 9.372L1.056 31.08l5.896-1.952a15.93 15.93 0 008.052 2.176C23.826 31.304 31 24.126 31 16.004S24.826 0 16.004 0zm9.35 22.616c-.396 1.116-1.97 2.042-3.238 2.312-.868.184-2.002.33-5.818-1.25-4.882-2.022-8.022-6.96-8.266-7.282-.234-.322-1.966-2.62-1.966-4.998 0-2.378 1.244-3.548 1.686-4.034.442-.486.966-.608 1.288-.608.322 0 .644.002.926.016.296.016.694-.112 1.086.83.396.954 1.35 3.288 1.468 3.528.118.24.198.52.04.838-.158.322-.238.52-.476.802-.238.282-.5.63-.714.844-.238.24-.486.498-.208.978.278.48 1.236 2.038 2.654 3.302 1.822 1.624 3.358 2.126 3.838 2.364.48.238.758.198 1.036-.12.278-.316 1.194-1.39 1.512-1.868.316-.48.634-.396 1.074-.238.44.158 2.786 1.314 3.264 1.554.48.238.798.358.916.556.118.198.118 1.148-.278 2.264z" />
      </svg>
    </a>
  );
}
