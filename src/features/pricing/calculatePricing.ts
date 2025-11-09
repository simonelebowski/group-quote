import {
  PackageKey,
  LocationPricing,
  AirportCode,
  Overrides,
} from "@/types/types";
import { getEffectiveRates } from "./pricingUtils";

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
    totalLessons: number;
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
  const {
    basePerStudent,
    perExtraNight,
    perFewerNight,
    perExtraLesson,
    perFewerLesson,
  } = getEffectiveRates(loc, packageKey, ov);

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

  const totalLessons = lessonsPerWeek * effectiveWeeks;

  const lessonDelta = lessonsPerWeek * effectiveWeeks - includedLessons;

  const lessonAdjPerStudent =
    lessonDelta === 0
      ? 0
      : lessonDelta > 0
      ? lessonDelta * perExtraLesson
      : lessonDelta * perFewerLesson;

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
      totalLessons,
      lessonDelta,
      lessonAdjPerStudent,
      perExtraNight,
      perFewerNight,
      perExtraLesson,
      perFewerLesson,
    },
  };
}
