import { useState, useMemo } from "react";
import Card from "./Card";
import ActivitySection from "./ActivitySection";
import { LocationPricing, Activity, ActivityCategory } from "@/types/types";

type ActivitiesCardProps = {
  loc: LocationPricing;
  // selectedActivities: SelectedActivities;
  // setSelectedActivities: (
  //   updater: (prev: SelectedActivities) => SelectedActivities
  // ) => void;

  unitLabel: (unit: string) => string;
  fmt: (value: number, currency: string) => string;
};

export default function ActivitiesCard({
  loc,
  selectedActivities,
  setSelectedActivities,
  unitLabel,
  fmt,
}) {
  const [open, setOpen] = useState<Record<ActivityCategory, boolean>>({
    afternoon: false,
    evening: false,
    halfDay: false,
    halfDayExtras: false,
    halfDayActivities: false,
    fullDay: false,
  });

  const byCategory = useMemo(() => {
    const map: Record<ActivityCategory, Activity[]> = {
      afternoon: [],
      evening: [],
      halfDay: [],
      halfDayExtras: [],
      halfDayActivities: [],
      fullDay: [],
    };
    for (const a of loc.activities) {
      const cat = a.category;
      map[cat].push(a);
    }
    return map;
  }, [loc.activities]);

  const toggle = (cat: ActivityCategory) =>
    setOpen((o) => ({ ...o, [cat]: !o[cat] }));

  const ACTIVITY_SECTIONS: { cat: ActivityCategory }[] = [
    { cat: "afternoon" },
    { cat: "evening" },
    { cat: "halfDay" },
    { cat: "halfDayExtras" },
    { cat: "halfDayActivities" },
    { cat: "fullDay" },
  ];

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">4) Activities & Trips</h2>
      <div className="space-y-3">
        {ACTIVITY_SECTIONS.map(({ cat }) => {
          const items = byCategory[cat];
          if (!items || items.length === 0) return null;

          return (
            <ActivitySection
              key={cat}
              open={open}
              toggle={toggle}
              byCategory={byCategory}
              cat={cat}
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
              unitLabel={unitLabel}
              fmt={fmt}
              loc={loc}
            />
          );
        })}
      </div>
    </Card>
  );
}
