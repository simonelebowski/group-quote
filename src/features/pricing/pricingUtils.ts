// FOR NOW I'M NOT SPLITTING THE MAIN FUNCTION

import {
  LocationPricing,
  PackageKey,
  LocationOverride,
  TransferOptionId,
} from "@/types/types";

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

export function computeAccommodationAdjustment(
  loc: LocationPricing,
  packageKey: PackageKey,
  students: number,
  leaders: number,
  studentAccommodationId: string | null,
  leaderAccommodationId: string | null
): number {
  // 6/7 nights → 1 “unit”, 13/14 nights → 2 “units”
  const packageWeeks = packageKey === "6n7d" || packageKey === "7n8d" ? 1 : 2;

  // find selected options; fall back to first option if something is missing
  const studentOpt =
    loc.accommodationStudents.find((a) => a.id === studentAccommodationId) ??
    loc.accommodationStudents[0];

  const leaderOpt =
    loc.accommodationLeaders.find((a) => a.id === leaderAccommodationId) ??
    loc.accommodationLeaders[0];

  const studentPerHead = studentOpt?.price ?? 0;
  const leaderPerHead = leaderOpt?.price ?? 0;

  // price is “per head for a short package”; multiply by packageWeeks
  const studentAdj = studentPerHead * packageWeeks * students;
  const leaderAdj = leaderPerHead * packageWeeks * leaders; // or payingLeaders if you prefer

  return studentAdj + leaderAdj; // can be negative or positive
}

export function getTransferTotal(
  loc: LocationPricing,
  arrivalId: TransferOptionId,
  departureId: TransferOptionId,
  students: number,
  leaders: number
): number {
  const findPrice = (id: string): number => {
    const opt = loc.transfer.options.find((o) => o.id === id);
    return opt?.price ?? 0;
  };

  const arrivalPrice = findPrice(arrivalId);
  const departurePrice = findPrice(departureId);

  const arrivalTotal = arrivalPrice * (students + leaders);
  const departureTotal = departurePrice * (students + leaders);

  // price is per person, per direction
  console.log(arrivalId);
  console.log(departureId);
  return arrivalTotal + departureTotal;
}
