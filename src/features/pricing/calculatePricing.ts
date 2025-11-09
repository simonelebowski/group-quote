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
  arrivalAirport: AirportCode;
  departureAirport: AirportCode;
  selectedActivities: SelectedActivities;
  selectedBusCards: SelectedBusCards;
  customItems: CustomItem[];
  overrides: Overrides;
  inferredWeeks: number;
};

export function calculatePricing({
  loc,
  students,
  leaders,
  freeLeaders,
  packageKey,
  overrides,
}: CalculatePricingArgs): PricingResult {
  const currency = loc.currency;
  const payingLeaders = Math.max(0, leaders - freeLeaders);
  const studentsAndPayingLeaders = students + payingLeaders;

  // apply override for base package if present
  const ov = overrides[loc.locationId] ?? {};
  const perStudentCore =
    ov.basePackages?.[packageKey] ?? loc.basePackages[packageKey];

  // core total right now = basePerStudent * chargeable heads
  const coreStudentsAndPayingLeadersTotal =
    perStudentCore * studentsAndPayingLeaders;

  // what does that look like per student (only valid if students > 0)
  const perStudentAllIn =
    students > 0 ? coreStudentsAndPayingLeadersTotal / students : null;

  return {
    currency,
    perStudentCore,
    payingLeaders,
    studentsAndPayingLeaders,
    coreStudentsAndPayingLeadersTotal,
    perStudentAllIn,
  };
}
