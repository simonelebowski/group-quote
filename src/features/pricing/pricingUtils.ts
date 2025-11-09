import { LocationPricing, PackageKey, Overrides } from "@/types/types";

export function getEffectiveRates(
  loc: LocationPricing,
  packageKey: PackageKey,
  ov: ReturnType<typeof getLocationOverride>
) {
  const basePerStudent =
    ov.basePackages?.[packageKey] ?? loc.basePackages[packageKey];

  const perExtraNight = ov.perExtraNight ?? loc.perExtraNight;
  const perFewerNight = ov.perFewerNight ?? loc.perFewerNight;
  const perExtraLesson = ov.perExtraLesson ?? loc.perExtraLesson;
  const perFewerLesson = ov.perFewerLesson ?? loc.perFewerLesson;

  return {
    basePerStudent,
    perExtraNight,
    perFewerNight,
    perExtraLesson,
    perFewerLesson,
  };
}
