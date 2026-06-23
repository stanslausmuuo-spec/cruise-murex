const icons = {
  car: (
    <path d="M3 13h-1a1 1 0 0 1-1-1v-2a1 1 0 0 1 .555-.894l1.664-.832L4.5 5.5A2 2 0 0 1 6.236 4h9.528a2 2 0 0 1 1.736 1.5l1.281 2.774 1.664.832A1 1 0 0 1 21 10v2a1 1 0 0 1-1 1h-1m-16 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm12 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" stroke="none" fill="currentColor"/>
  ),
  calendar: (
    <path d="M8 2v2m8-2v2M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  user: (
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  sun: (
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  moon: (
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  menu: (
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  close: (
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  filter: (
    <path d="M3 4h18l-7 8.17V20l-4-2v-5.83L3 4Z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  arrow: (
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'arrow-left': (
    <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" stroke="none" fill="currentColor"/>
  ),
  check: (
    <path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  shield: (
    <path d="M12 2a15.3 15.3 0 0 1 6 3.09V10c0 5.5-3.41 9.5-6 10.91C9.41 19.5 6 15.5 6 10V5.09A15.3 15.3 0 0 1 12 2Z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  logout: (
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  speed: (
    <path d="M12 6v6l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  fuel: (
    <path d="M3 22V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14M7 22h10M3 12h12" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  seat: (
    <path d="M4 15h16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4ZM4 15V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  'arrow-right': (
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" fill="none" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" fill="none" strokeWidth="1.5"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </>
  ),
  twitter: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" stroke="none"/>
  ),
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" stroke="none"/>
  ),
};

export default function Icon({ name, size = 24, className = '', onClick }) {
  const path = icons[name];
  if (!path) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {path}
    </svg>
  );
}
