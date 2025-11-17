import {
  PackageKey,
  LocationPricing,
  TransferOptionId,
  SelectedActivities,
  Overrides,
} from "@/types/types";
import {
  getEffectiveRates,
  computeAccommodationAdjustment,
  getTransferTotal,
  calculateActivitiesPricing,
} from "./pricingUtils";

export type PricingResult = {
  currency: string;

  perStudentCore: number;
  payingLeaders: number;
  studentsAndPayingLeaders: number;
  coreStudentsAndPayingLeadersTotal: number;

  activitiesTotal: number;
  activitiesBreakdown: { label: string; total: number }[];

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

    accommodationAdjustment: number;
    transferTotal: number;
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
  // inferredWeeks: number;

  arrivalTransferOptionId: TransferOptionId;
  departureTransferOptionId: TransferOptionId;

  selectedActivities?: SelectedActivities;
  // selectedBusCards: SelectedBusCards;
  // customItems: CustomItem[];
  overrides: Overrides;
  studentAccommodationId: string | null;
  leaderAccommodationId: string | null;
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
  // inferredWeeks,
  studentAccommodationId,
  leaderAccommodationId,
  arrivalTransferOptionId,
  departureTransferOptionId,
  selectedActivities,
}: CalculatePricingArgs): PricingResult {
  const currency = loc.currency;

  // 1) Leaders / paying heads
  const payingLeaders = Math.max(0, leaders - freeLeaders);
  const studentsAndPayingLeaders = students + payingLeaders;

  // 2) Apply override for base package if present + effective rates
  const ov = overrides[loc.locationId] ?? {};
  const {
    basePerStudent,
    perExtraNight,
    perFewerNight,
    perExtraLesson,
    perFewerLesson,
  } = getEffectiveRates(loc, packageKey, ov);

  // 3) Nights adjustment
  const nightDelta = nights - baseNights;
  const nightAdjPerStudent =
    nightDelta === 0
      ? 0
      : nightDelta > 0
      ? nightDelta * perExtraNight
      : nightDelta * perFewerNight;
  // : Math.abs(nightDelta) * perFewerNight;

  // 4) Lessons based on package key
  // 6/7 nights = 1 "week" → 20 base lessons
  // 13/14 nights = 2 "weeks" → 40 base lessons
  const includedLessons =
    packageKey === "6n7d" || packageKey === "7n8d" ? 20 : 40;
  const totalLessons = lessonsPerWeek;
  const effectiveWeeks = weeks;
  const lessonDelta = totalLessons - includedLessons;

  const lessonAdjPerStudent =
    lessonDelta === 0
      ? 0
      : lessonDelta > 0
      ? lessonDelta * perExtraLesson
      : lessonDelta * perFewerLesson;

  // 5) Core per-student and totals
  const perStudentCore =
    basePerStudent + nightAdjPerStudent + lessonAdjPerStudent;

  const coreStudentsAndPayingLeadersTotal =
    perStudentCore * studentsAndPayingLeaders;

  // 6) Accommodation supplement/discount
  const accommodationAdjustment = computeAccommodationAdjustment(
    loc,
    packageKey,
    students,
    leaders,
    studentAccommodationId,
    leaderAccommodationId
  );

  // 7) Transfer
  const transferTotal = getTransferTotal(
    loc,
    arrivalTransferOptionId,
    departureTransferOptionId,
    students,
    leaders
  );

  // 8) Activities 
  const { activitiesTotal, activitiesBreakdown } = calculateActivitiesPricing(
  loc,
  selectedActivities,
  ov,
  students,
  leaders
);

  // For now, grandTotal is just the core (we'll add extras later)
  const grandTotal =
    coreStudentsAndPayingLeadersTotal + accommodationAdjustment + transferTotal + activitiesTotal;

  const perStudentAllIn = students > 0 ? grandTotal / students : null;

  return {
    currency,
    perStudentCore,
    payingLeaders,
    studentsAndPayingLeaders,
    coreStudentsAndPayingLeadersTotal,
    activitiesTotal,
    activitiesBreakdown,
    grandTotal,
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
      accommodationAdjustment,
      transferTotal,
    },
  };
}
