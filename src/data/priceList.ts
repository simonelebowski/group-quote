import { PriceList } from "@/types/types";

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
          unit: "perPerson",
          price: 16,
        },
        {
          id: "sea-life",
          name: "Sea Life Centre",
          unit: "perPerson",
          price: 14,
        },
        {
          id: "bath-day",
          name: "Full-day trip to Bath",
          unit: "perPerson",
          price: 45,
        },
        {
          id: "london-day",
          name: "Full-day trip to London",
          unit: "perPerson",
          price: 40,
        },
        {
          id: "leader-pack",
          name: "Leader Pack (per leader)",
          unit: "perPerson",
          price: 10,
        },
        {
          id: "evening-disco",
          name: "Evening Disco (group)",
          unit: "perPerson",
          price: 180,
        },
      ],
      busCards: [
        {
          id: "bus-week-1-2",
          name: "Bus Card Zones 1-2 (7 days)",
          unit: "perPerson",
          price: 21,
        },
        {
          id: "bus-week-1-4",
          name: "Bus Card Zones 1-4 (7 days)",
          unit: "perPerson",
          price: 28,
        },
      ],
      accommodationStudents: [
        {
          id: "full-board-shared-homestay",
          name: "Full-board Shared Room Homestay Accommodation",
          unit: "perStudent",
          price: 0,
        },
      ],
      accommodationLeaders: [
        {
          id: "full-board-homestay",
          name: "Full-board Homestay Accommodation",
          unit: "perLeader",
          price: 0,
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
      accommodationStudents: [
        {
          id: "half-board-shared-homestay",
          name: "Half-board Shared Room Homestay Accommodation",
          unit: "perStudent",
          price: 0,
        },
      ],
      accommodationLeaders: [
        {
          id: "half-board-homestay",
          name: "Half-board Homestay Accommodation",
          unit: "perLeader",
          price: 0,
        },
      ],
    },
  ],
};
