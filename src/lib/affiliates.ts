export const AFFILIATE_LINKS = {
  default: "https://homedecorlightstore.com?sca_ref=12010970.ffFdRrrTKeRin",
  store: "https://homedecorlightstore.com?sca_ref=12010970.ffFdRrrTKeRin",
  chandeliers: "https://homedecorlightstore.com/collections/chandeliers?sca_ref=12010970.ffFdRrrTKeRin",
  pendant: "https://homedecorlightstore.com/collections/pendant-lights?sca_ref=12010970.ffFdRrrTKeRin",
  sconces: "https://homedecorlightstore.com/collections/wall-sconces?sca_ref=12010970.ffFdRrrTKeRin",
  table: "https://homedecorlightstore.com/collections/table-lamps?sca_ref=12010970.ffFdRrrTKeRin",
  flush: "https://homedecorlightstore.com/collections/ceiling-lights?sca_ref=12010970.ffFdRrrTKeRin"
};

export type AffiliateSlug = keyof typeof AFFILIATE_LINKS;

export function getAffiliateLink(slug: AffiliateSlug = "default"): string {
  return AFFILIATE_LINKS[slug] || AFFILIATE_LINKS.default;
}
