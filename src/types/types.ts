export type Currency = "GBP" | "EUR" | "USD";

export type Unit =
  | "perStudent"
  | "perLeader"
  | "perGroup"
  | "perUnit"
  | "perPerson"
  | "flat";

  // ACTIVITIES ----------------------------------------------------------------------------------------------------------------
export type ActivityCategory =
  | "afternoon"
  | "evening"
  | "halfDay"
  | "halfDayExtras"
  | "halfDayActivities"
  | "fullDay";

export type Activity = {
  id: string;
  name: string;
  unit: Unit; // how to apply the price
  price: number; // price in base currency
  description?: string;
  qty?: number;
  category: ActivityCategory;
};

export type ActivityPick = {
  enabled: boolean;
  mode: "group" | "quantity";
  count: number;
};

export type SelectedActivities = Record<string, ActivityPick>

export type ActivitiesPricing = {
  activitiesTotal: number;
  activitiesBreakdown: {label: string; total: number}[]
}

// BUS CARDS ----------------------------------------------------------------------------------------------------------------
export type BusCardOption = {
  id: string;
  name: string; // e.g., "Zones 1-2 (weekly)"
  unit: Unit; // usually perStudent
  price: number;
};

export type BusSelection = {
  enabled: boolean;
  mode: "group" | "quantity";
  count: number;
};

export type SelectedBusCards = Record<string, BusSelection>;

export type AccommodationOption = {
  id: string;
  name: string;
  unit: Unit;
  price: number;
};

// export type AirportCode =
//   | "LGW_OR_LHR"
//   | "LGW"
//   | "LHR"
//   | "LTN"
//   | "STN"
//   | "LCY"
//   | "OTHER";

export type TransferOptionId =
  | "lgw_or_lhr"
  | "lgw"
  | "lhr"
  | "ltn"
  | "stn"
  | "lcy"
  | "other";

export type TransferOption = {
  id: TransferOptionId;
  name: string;
  unit: Unit;
  price: number;
};

export type TransferRule = {
  options: TransferOption[];
};

// export type TransferRule = {
//   includedAirports: AirportCode[]; // transfers included at no extra cost
//   supplements: Record<AirportCode, { unit: Unit; price: number }>; // surcharge if not included
// };

export type PackageKey = "6n7d" | "7n8d" | "13n14d" | "14n15d";

export type LocationPricing = {
  locationId: string;
  locationName: string;
  currency: Currency;
  basePackages: Record<PackageKey, number>; // per-student
  // Flex rules when group deviates from the standard package
  perExtraNight: number; // per-student, per-night beyond package
  perFewerNight: number; // per-student, per-night fewer than package
  perExtraLesson: number; // per-student, per-lesson above 20/week
  perFewerLesson: number; // per-student, per-lesson below 20/week
  transfer: TransferRule;
  activities: Activity[];
  busCards: BusCardOption[];
  accommodationStudents: AccommodationOption[];
  accommodationLeaders: AccommodationOption[];
};

export type PriceList = {
  defaultCurrency: Currency;
  freeLeaderRatio: number; // e.g., 15 means 1 free leader per 15 students
  locations: LocationPricing[];
};

export type CustomLineItem = {
  id: string;
  name: string;
  unit: Unit; // perStudent | perLeader | perGroup | flat
  qty: number;
  price: number; // per-unit per the unit above
};

export type LocationOverride = {
  basePackages?: Partial<Record<PackageKey, number>>;
  perExtraNight?: number;
  perFewerNight?: number;
  perExtraLesson?: number;
  perFewerLesson?: number;
};

export type Overrides = Record<string, LocationOverride>;
