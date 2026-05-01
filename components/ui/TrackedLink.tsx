"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import {
  trackContactClick,
  trackFinancingClick,
  trackCalendlyClick,
  type ContactChannel,
} from "@/lib/track";

type Tracking =
  | { kind: "contact"; channel: ContactChannel; location: string }
  | { kind: "financing"; provider: string; location: string }
  | { kind: "calendly"; location: string };

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tracking: Tracking;
  children: ReactNode;
};

/**
 * Generic anchor with conversion tracking. Use this anywhere a tel:, sms:,
 * mailto:, WhatsApp, financing partner, or Calendly link needs to be
 * tracked. Server components can render this — it's the only client piece.
 */
export default function TrackedLink({
  tracking,
  onClick,
  children,
  ...rest
}: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    switch (tracking.kind) {
      case "contact":
        trackContactClick(tracking.channel, tracking.location);
        break;
      case "financing":
        trackFinancingClick(tracking.provider, tracking.location);
        break;
      case "calendly":
        trackCalendlyClick(tracking.location);
        break;
    }
    if (onClick) onClick(e);
  }

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
