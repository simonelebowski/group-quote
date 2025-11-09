// FOR NOW I'M NOT SPLITTING THE MAIN FUNCTION

import { LocationPricing, PackageKey, LocationOverride } from "@/types/types";

export function getEffectiveRates(
  loc: LocationPricing,
  packageKey: PackageKey,
  ov: LocationOverride | undefined
) {
  const o = ov ?? {};

  const basePerStudent =
    o.basePackages?.[packageKey] ?? loc.basePackages[packageKey];

  const perExtraNight = o.perExtraNight ?? loc.perExtraNight;
  const perFewerNight = o.perFewerNight ?? loc.perFewerNight;
  const perExtraLesson = o.perExtraLesson ?? loc.perExtraLesson;
  const perFewerLesson = o.perFewerLesson ?? loc.perFewerLesson;

  return {
    basePerStudent,
    perExtraNight,
    perFewerNight,
    perExtraLesson,
    perFewerLesson,
  };
}

export function computeNightAdjustment(
  nights: number,
  baseNights: number,
  perExtraNight: number,
  perFewerNight: number
) {
  const nightDelta = nights - baseNights;

  if (nightDelta === 0) {
    return { nightDelta, nightAdjPerStudent: 0 };
  }

  const nightAdjPerStudent =
    nightDelta > 0
      ? nightDelta * perExtraNight
      : Math.abs(nightDelta) * perFewerNight;

  return { nightDelta, nightAdjPerStudent };
}
