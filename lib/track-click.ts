/**
 * Back-compat shim. Forwards to the unified `lib/track.ts`.
 * New code should import from `@/lib/track` directly.
 */
export {
  trackContactClick as trackClickToContact,
  type ContactChannel,
} from "./track";
