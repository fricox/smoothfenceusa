"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const icons = [
  // Clock / experience
  <svg key="exp" viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="h-7 w-7" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
  </svg>,
  // Shield / licensed
  <svg key="lic" viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="h-7 w-7" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>,
  // Banknotes / free estimate
  <svg key="fee" viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="h-7 w-7" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
  </svg>,
  // Star / premium
  <svg key="prem" viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="h-7 w-7" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>,
];

export default function TrustBadges() {
  const { tr } = useLanguage();

  const badges = [
    { icon: icons[0], ...tr.trust.experience },
    { icon: icons[1], ...tr.trust.licensed },
    { icon: icons[2], ...tr.trust.freeEstimate },
    { icon: icons[3], ...tr.trust.premium },
  ];

  return (
    <section className="border-y border-brand-light/60 bg-white py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow text-brand-deep shadow-sm">
                {badge.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-brand-deep sm:text-base">{badge.title}</p>
                <p className="mt-1 text-xs text-brand-deep/70 sm:text-sm">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
