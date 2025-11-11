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
          OTHER: { unit: "perStudent", price: 35 },
        },
      },
      activities: [
        {
          id: "worthing-town-quiz",
          name: "Worthing Town Quiz",
          unit: "perPerson",
          price: 5,
        },
        {
          id: "worthing-museum",
          name: "Worthing Museum (includes scavenger hunt)",
          unit: "perPerson",
          price: 5,
        },
        {
          id: "worthing-sports",
          name: "Sports Afternoon",
          unit: "perPerson",
          price: 5,
        },
        {
          id: "worthing-kahoot",
          name: "Kahoot Quiz and Games Afternoon",
          unit: "perPerson",
          price: 5,
        },
        {
          id: "worthing-pottery",
          name: "Pottery Painting at ART-ful",
          unit: "perPerson",
          price: 30,
        },
        {
          id: "chichester-trip",
          name: "Chichester Cathedral and Town",
          unit: "perPerson",
          price: 30,
        },
        {
          id: "lewes-trip",
          name: "Lewes Castle",
          unit: "perPerson",
          price: 40,
        },
        {
          id: "brighton-trip",
          name: "Brighton City Tour (includes i360 or Royal Pavillion)",
          unit: "perPerson",
          price: 45,
        },
        {
          id: "arundel-trip",
          name: "Arundel Castle and Village",
          unit: "perPerson",
          price: 40,
        },
        {
          id: "arundel-trip-cathedral",
          name: "Arundel Village and Cathedral",
          unit: "perPerson",
          price: 25,
        },
        {
          id: "london-trip-cruise",
          name: "London (includes a Thames River Cruise)",
          unit: "perPerson",
          price: 65,
        },
        {
          id: "london-trip-museum",
          name: "London (Museum & Galleries)",
          unit: "perPerson",
          price: 55,
        },
        {
          id: "oxford-trip",
          name: "Oxford (includes entrance to Christchurch College)",
          unit: "perPerson",
          price: 85,
        },
        {
          id: "portmouth-trip",
          name: "Portmouth Harbour (Dock yard)",
          unit: "perPerson",
          price: 50,
        },
        {
          id: "portmouth-trip",
          name: "Portmouth Harbour (Dock yard and HMS Victory 20 people minimum)",
          unit: "perPerson",
          price: 60,
        },
          {
          id: "worthing-bbq",
          name: "BBq (Max 40 people)",
          unit: "perPerson",
          price: 8,
        },
        {
          id: "worthing-karaoke",
          name: "Karaoke Evening (Max 40 people)",
          unit: "perPerson",
          price: 5,
        },
        {
          id: "worthing-fish-and-chips",
          name: "Fish and Chips Evening",
          unit: "perPerson",
          price: 25,
        },
        {
          id: "worthing-cinema",
          name: "Cinema Evening",
          unit: "perPerson",
          price: 15,
        },
        {
          id: "worthing-bowling",
          name: "Bowling Evening",
          unit: "perPerson",
          price: 13,
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
          name: "Full-board Single Room Homestay Accommodation",
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
          name: "Half-board Single Room Homestay Accommodation",
          unit: "perLeader",
          price: 0,
        },
      ],
    },
  ],
};
