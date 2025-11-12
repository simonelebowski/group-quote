import {useState, useMemo} from 'react'
import Card from "./Card";
import { Activity, ActivityCategory } from '@/types/types';

const LABELS: Record<ActivityCategory, string> = {
  afternoon: "Afternoon activities",
  evening: "Evening activities",
  halfDay: "Half-day tours",
  halfDayExtras: "Half-day tours extras",
  halfDayActivities: "Half-day activities",
  fullDay: "Full-day tours",
};

export default function ActivitiesCard({loc, selectedActivities, setSelectedActivities, unitLabel, fmt}) {
    const [open, setOpen] = useState<Record<ActivityCategory, boolean>>({
    afternoon: true,
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
      const cat = a.category 
      map[cat].push(a);
    }
    return map;
  }, [loc.activities]);

    const toggle = (cat: ActivityCategory) =>
    setOpen((o) => ({ ...o, [cat]: !o[cat] }));

  const Section = ({ cat }: { cat: ActivityCategory }) => {
    const items = byCategory[cat];
    if (!items?.length) return null;

    return (
      <div className="rounded-2xl border border-neutral-200/80 bg-white/70">
        <button
          type="button"
          onClick={() => toggle(cat)}
          className="flex w-full items-center justify-between px-3 py-2.5 text-left"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
            {LABELS[cat]}
          </div>
          <span className="text-[10px] text-neutral-500">
            {open[cat] ? "Hide" : "Show"} ({items.length})
          </span>
        </button>

        {open[cat] && (
          <div className="divide-y divide-neutral-100">
            {items.map((a) => {
              const sel =
                selectedActivities[a.id] ?? ({ enabled: false, mode: "group", count: 0 } as Sel);

              return (
                <label
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 text-xs md:text-sm hover:bg-neutral-50"
                >
                  {/* Left: checkbox + info */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20"
                      checked={sel.enabled}
                      onChange={(e) =>
                        setSelectedActivities((prev) => ({
                          ...prev,
                          [a.id]: {
                            ...(prev[a.id] ?? { mode: "group", count: 0 }),
                            enabled: e.target.checked,
                          },
                        }))
                      }
                    />
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-[11px] text-neutral-600">
                        {unitLabel(a.unit)} · {fmt(a.price, loc.currency)}
                      </div>
                      {a.description && (
                        <div className="mt-0.5 text-[11px] text-neutral-500">
                          {a.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: mode + qty */}
                  <div className="flex items-center gap-2">
                    <select
                      className="h-9 w-36 rounded-xl border border-neutral-200 bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                      disabled={!sel.enabled}
                      value={sel.mode}
                      onChange={(e) =>
                        setSelectedActivities((prev) => ({
                          ...prev,
                          [a.id]: {
                            ...(prev[a.id] ?? { enabled: true, count: 0 }),
                            mode: e.target.value as "group" | "quantity",
                          },
                        }))
                      }
                    >
                      <option value="group">Whole group</option>
                      <option value="quantity">Specific quantity</option>
                    </select>

                    {sel.enabled && sel.mode === "quantity" && (
                      <input
                        type="number"
                        min={0}
                        placeholder="# people"
                        className="h-9 w-24 rounded-xl border border-neutral-200 bg-white px-2 text-right text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                        value={sel.count}
                        onChange={(e) =>
                          setSelectedActivities((prev) => ({
                            ...prev,
                            [a.id]: {
                              ...(prev[a.id] ?? {
                                enabled: true,
                                mode: "quantity",
                              }),
                              count: Math.max(0, Number(e.target.value) || 0),
                            },
                          }))
                        }
                      />
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

    return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">4) Activities & Trips</h2>
      <div className="space-y-3">
        <Section cat="afternoon" />
        <Section cat="evening" />
        <Section cat="halfDay" />
        <Section cat="halfDayExtras" />
        <Section cat="halfDayActivities" />
        <Section cat="fullDay" />
      </div>
    </Card>

        // <Card>
        //     <h2 className="mb-3 text-lg font-semibold">
        //       4) Activities & Trips
        //     </h2>

        //     <div className="space-y-3">
        //       {loc.activities.map((a) => {
        //         const sel = selectedActivities[a.id] || {
        //           enabled: false,
        //           mode: "group",
        //           count: 0,
        //         };

        //         return (
        //           <div
        //             key={a.id}
        //             className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3"
        //           >
        //             {/* Left: details + include checkbox */}
        //             <div className="flex items-start gap-3">
        //               <input
        //                 type="checkbox"
        //                 className="mt-1 h-5 w-5"
        //                 checked={sel.enabled}
        //                 onChange={(e) =>
        //                   setSelectedActivities((prev) => ({
        //                     ...prev,
        //                     [a.id]: {
        //                       ...(prev[a.id] || { mode: "group", count: 0 }),
        //                       enabled: e.target.checked,
        //                     },
        //                   }))
        //                 }
        //               />
        //               <div>
        //                 <div className="font-medium">{a.name}</div>
        //                 <div className="text-xs text-neutral-600">
        //                   {unitLabel(a.unit)} · {fmt(a.price, loc.currency)}
        //                 </div>
        //                 {a.description && (
        //                   <div className="text-xs text-neutral-600">
        //                     {a.description}
        //                   </div>
        //                 )}
        //               </div>
        //             </div>

        //             {/* Right: group/quantity selector (only active if ticked) */}
        //             <div className="flex items-center gap-2">
        //               <select
        //                 className="input w-40"
        //                 disabled={!sel.enabled}
        //                 value={sel.mode}
        //                 onChange={(e) =>
        //                   setSelectedActivities((prev) => ({
        //                     ...prev,
        //                     [a.id]: {
        //                       ...(prev[a.id] || { enabled: true, count: 0 }),
        //                       mode: e.target.value as "group" | "quantity",
        //                     },
        //                   }))
        //                 }
        //               >
        //                 <option value="group">Whole group</option>
        //                 <option value="quantity">Specific quantity</option>
        //               </select>

        //               {sel.enabled && sel.mode === "quantity" && (
        //                 <input
        //                   type="number"
        //                   min={0}
        //                   placeholder="# people"
        //                   className="input w-28"
        //                   value={sel.count}
        //                   onChange={(e) =>
        //                     setSelectedActivities((prev) => ({
        //                       ...prev,
        //                       [a.id]: {
        //                         ...(prev[a.id] || {
        //                           enabled: true,
        //                           mode: "quantity",
        //                         }),
        //                         count: Math.max(0, Number(e.target.value) || 0),
        //                       },
        //                     }))
        //                   }
        //                 />
        //               )}
        //             </div>
        //           </div>
        //         );
        //       })}
        //     </div>
        // </Card>
    )
}