import {
  PackageKey,
  LocationPricing,
  AirportCode,
  Overrides,
} from "@/types/types";

export type PricingResult = {
  currency: string;
  perStudentCore: number;
  payingLeaders: number;
  studentsAndPayingLeaders: number;
  coreStudentsAndPayingLeadersTotal: number;
  grandTotal: number;
  perStudentAllIn: number | null;

  // for now we don't include extras; we'll add later
  meta: {
    basePerStudent: number;

    // nights
    nightDelta: number;
    nightAdjPerStudent: number;

    // lessons
    effectiveWeeks: number;
    includedLessons: number;
    lessonDelta: number;
    lessonAdjPerStudent: number;

    // leaders
    // payingLeaders: number;

    // reference rates (useful for debugging / UI)
    perExtraNight: number;
    perFewerNight: number;
    perExtraLesson: number;
    perFewerLesson: number;
  };
};

type CalculatePricingArgs = {
  loc: LocationPricing;
  students: number;
  leaders: number;
  freeLeaders: number;
  packageKey: PackageKey;
  nights: number;
  baseNights: number;
  lessonsPerWeek: number;
  weeks: number;
  inferredWeeks: number;
  arrivalAirport: AirportCode;
  departureAirport: AirportCode;
  selectedActivities: SelectedActivities;
  selectedBusCards: SelectedBusCards;
  customItems: CustomItem[];
  overrides: Overrides;
};

export function calculatePricing({
  loc,
  students,
  leaders,
  freeLeaders,
  packageKey,
  overrides,
  nights,
  baseNights,
  lessonsPerWeek,
  weeks,
  inferredWeeks,
}: CalculatePricingArgs): PricingResult {
  const currency = loc.currency;
  const payingLeaders = Math.max(0, leaders - freeLeaders);
  const studentsAndPayingLeaders = students + payingLeaders;

  // apply override for base package if present
  const ov = overrides[loc.locationId] ?? {};
  const basePerStudent =
    ov.basePackages?.[packageKey] ?? loc.basePackages[packageKey];

  const perExtraNight = ov.perExtraNight ?? loc.perExtraNight;
  const perFewerNight = ov.perFewerNight ?? loc.perFewerNight;
  const perExtraLesson = ov.perExtraLesson ?? loc.perExtraLesson;
  const perFewerLesson = ov.perFewerLesson ?? loc.perFewerLesson;

  //
  // Nights adjustment
  //
  const nightDelta = nights - baseNights;

  const nightAdjPerStudent =
    nightDelta === 0
      ? 0
      : nightDelta > 0
      ? nightDelta * perExtraNight
      : Math.abs(nightDelta) * perFewerNight;

  //
  // Lessons adjustment (20 lessons/week included)
  //
  const effectiveWeeks = weeks || inferredWeeks;
  const includedLessons = 20 * effectiveWeeks;

  const lessonDelta = lessonsPerWeek * effectiveWeeks - includedLessons;

  const lessonAdjPerStudent =
    lessonDelta === 0
      ? 0
      : lessonDelta > 0
      ? lessonDelta * perExtraLesson
      : Math.abs(lessonDelta) * perFewerLesson;

  //
  // Core per-student and totals
  //
  const perStudentCore =
    basePerStudent + nightAdjPerStudent + lessonAdjPerStudent;

  const coreStudentsAndPayingLeadersTotal =
    perStudentCore * studentsAndPayingLeaders;

  // For now, grandTotal is just the core (we'll add extras later)
  const grandTotal = coreStudentsAndPayingLeadersTotal;

  const perStudentAllIn = students > 0 ? grandTotal / students : null;

  return {
    currency,
    perStudentCore,
    payingLeaders,
    studentsAndPayingLeaders,
    coreStudentsAndPayingLeadersTotal,
    perStudentAllIn,
    meta: {
      basePerStudent,
      nightDelta,
      nightAdjPerStudent,
      effectiveWeeks,
      includedLessons,
      lessonDelta,
      lessonAdjPerStudent,
      perExtraNight,
      perFewerNight,
      perExtraLesson,
      perFewerLesson,
    },
  };
}
