// Central helper for constructing Secret Desires affiliate URLs.
// Every Secret Desires CTA on the site resolves from this helper (or the
// SECRET_DESIRES_AFFILIATE_URL constant which this helper reads).
//
// Default (no args) returns the canonical affiliate URL — same string as
// SECRET_DESIRES_AFFILIATE_URL — so `sdaiHref()` is a drop-in replacement.
//
// - `profile`: appends `&profile=<slug>` for character-specific deep links.
// - `subId`:  appends `&sub_id=<id>` for per-page attribution.

import { SECRET_DESIRES_AFFILIATE_URL } from '../site'

export type SdaiHrefOptions = {
  profile?: string
  subId?: string
}

export function sdaiHref(options?: SdaiHrefOptions): string {
  const base = SECRET_DESIRES_AFFILIATE_URL
  if (!options) return base
  const { profile, subId } = options
  if (!profile && !subId) return base

  const sep = base.includes('?') ? '&' : '?'
  const parts: string[] = []
  if (profile) parts.push(`profile=${profile}`)
  if (subId)   parts.push(`sub_id=${subId}`)
  return `${base}${sep}${parts.join('&')}`
}

// Character profile deep-link builder. Character profile IDs come from Secret
// Desires (e.g. 'agnieszka-kolczyk-OwrmCw') and are NOT derivable from the
// site's own character slug — the trailing 6-char suffix is opaque. We keep
// the URL SHAPE centralized here so nothing hard-codes ?via=... in call sites.
//
// Produces: `https://secretdesires.ai/?via=saddam-299148&profile=<profileId>`
// (byte-identical to the historical hard-coded URLs in lib/data/characters.ts).
export function sdaiProfileHref(profileId: string): string {
  const AFFILIATE_PARAM = 'via=saddam-299148'
  return `https://secretdesires.ai/?${AFFILIATE_PARAM}&profile=${profileId}`
}
