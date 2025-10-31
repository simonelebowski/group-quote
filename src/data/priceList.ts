// TYPES------------------------------------------------------------------------------------
export type Currency = "GBP" | "EUR" | "USD";
export type Unit = "perStudent" | "perLeader" | "perGroup" | "flat";

type Activity = {
  id: string;
  name: string;
  unit: Unit; // how to apply the price
  price: number; // price in base currency
  description?: string;
};

type BusCardOption = {
  id: string;
  name: string; // e.g., "Zones 1-2 (weekly)"
  unit: Unit; // usually perStudent
  price: number;
};

export type AirportCode =
  | "LGW"
  | "LHR"
  | "LTN"
  | "STN"
  | "LCY"
  | "SEN"
  | "OTHER";

type TransferRule = {
  includedAirports: AirportCode[]; // transfers included at no extra cost
  supplements: Record<AirportCode, { unit: Unit; price: number }>; // surcharge if not included
};

export type PackageKey = "6n7d" | "7n8d" | "13n14d" | "14n15d";

type LocationPricing = {
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
};

type PriceList = {
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

// DATA------------------------------------------------------------------------------------
export const priceList: PriceList = {
  defaultCurrency: "GBP",
  freeLeaderRatio: 15,
  locations: [
    {
      locationId: "worthing",
      locationName: "Worthing",
      currency: "GBP",
      basePackages: {
        "6n7d": 690,
        "7n8d": 770,
        "13n14d": 1390,
        "14n15d": 1490,
      },
      perExtraNight: 45,
      perFewerNight: 45,
      perExtraLesson: 7.5,
      perFewerLesson: 7.5,
      transfer: {
        includedAirports: ["LGW", "LHR"],
        supplements: {
          LGW: { unit: "perStudent", price: 0 },
          LHR: { unit: "perStudent", price: 0 },
          LTN: { unit: "perStudent", price: 18 },
          STN: { unit: "perStudent", price: 22 },
          LCY: { unit: "perStudent", price: 15 },
          SEN: { unit: "perStudent", price: 28 },
          OTHER: { unit: "perStudent", price: 35 },
        },
      },
      activities: [
        {
          id: "royal-pav",
          name: "Royal Pavilion Entry",
          unit: "perStudent",
          price: 16,
        },
        {
          id: "sea-life",
          name: "Sea Life Centre",
          unit: "perStudent",
          price: 14,
        },
        {
          id: "bath-day",
          name: "Full-day trip to Bath",
          unit: "perStudent",
          price: 45,
        },
        {
          id: "london-day",
          name: "Full-day trip to London",
          unit: "perStudent",
          price: 40,
        },
        {
          id: "leader-pack",
          name: "Leader Pack (per leader)",
          unit: "perLeader",
          price: 10,
        },
        {
          id: "evening-disco",
          name: "Evening Disco (group)",
          unit: "perGroup",
          price: 180,
        },
      ],
      busCards: [
        {
          id: "bus-week-1-2",
          name: "Bus Card Zones 1-2 (7 days)",
          unit: "perStudent",
          price: 21,
        },
        {
          id: "bus-week-1-4",
          name: "Bus Card Zones 1-4 (7 days)",
          unit: "perStudent",
          price: 28,
        },
      ],
    },
    {
      locationId: "london",
      locationName: "London",
      currency: "GBP",
      basePackages: {
        "6n7d": 820,
        "7n8d": 910,
        "13n14d": 1640,
        "14n15d": 1745,
      },
      perExtraNight: 55,
      perFewerNight: 55,
      perExtraLesson: 9,
      perFewerLesson: 9,
      transfer: {
        includedAirports: ["LGW", "LHR"],
        supplements: {
          LGW: { unit: "perStudent", price: 0 },
          LHR: { unit: "perStudent", price: 0 },
          LTN: { unit: "perStudent", price: 20 },
          STN: { unit: "perStudent", price: 25 },
          LCY: { unit: "perStudent", price: 12 },
          SEN: { unit: "perStudent", price: 30 },
          OTHER: { unit: "perStudent", price: 38 },
        },
      },
      activities: [
        { id: "tower", name: "Tower of London", unit: "perStudent", price: 33 },
        {
          id: "boat",
          name: "Thames Boat Cruise",
          unit: "perStudent",
          price: 19,
        },
        {
          id: "musical",
          name: "West End Musical (group)",
          unit: "perGroup",
          price: 950,
        },
      ],
      busCards: [
        {
          id: "tfl-1-2",
          name: "Travelcard Zones 1-2 (7 days)",
          unit: "perStudent",
          price: 42,
        },
        {
          id: "tfl-1-4",
          name: "Travelcard Zones 1-4 (7 days)",
          unit: "perStudent",
          price: 55,
        },
      ],
    },
  ],
};
