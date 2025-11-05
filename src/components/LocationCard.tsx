import { priceList } from "@/data/priceList";
import Card from "./Card";
import Label from "./Label";

export default function LocationCard({
  locationId,
  setLocationId,
  students,
  setStudents,
  leaders,
  setLeaders,
  clamp,
  freeLeaders,
  setFreeLeaders,
  studentAccommodationId,
  setStudentAccommodationId,
  leaderAccommodationId,
  setLeaderAccommodationId,
}) {
  return (
    // <Card>
    //   <h2 className="mb-3 text-lg font-semibold">1) Group</h2>
    //   {/* SELECT LOCATION */}
    //   <Label>Location</Label>
    //   <select
    //     className="input"
    //     value={locationId}
    //     onChange={(e) => setLocationId(e.target.value)}
    //   >
    //     {priceList.locations.map((l) => (
    //       <option key={l.locationId} value={l.locationId}>
    //         {l.locationName}
    //       </option>
    //     ))}
    //   </select>

    //   {/* SELECT NUMBER OF STUDENTS */}
    //   <div className="mt-3 grid grid-cols-2 gap-3">
    //     <div>
    //       <Label>Students</Label>
    //       <input
    //         type="number"
    //         className="input"
    //         min={1}
    //         value={students}
    //         onChange={(e) =>
    //           setStudents(clamp(parseInt(e.target.value || "0"), 1, 9999))
    //         }
    //       />
    //     </div>

    //     {/* SELECT NUMBER OF LEADERS */}
    //     <div>
    //       <Label>Leaders</Label>
    //       <input
    //         type="number"
    //         className="input"
    //         min={0}
    //         value={leaders}
    //         onChange={(e) =>
    //           setLeaders(clamp(parseInt(e.target.value || "0"), 0, 9999))
    //         }
    //       />
    //       <p className="mt-1 text-xs text-neutral-600">
    //         Free leaders included: <b>{freeLeaders}</b>
    //       </p>
    //     </div>

    //     {/* Manual free leaders only */}
    //     <div className="mt-3 grid grid-cols-2 gap-3">
    //       <div>
    //         <Label>Free leaders</Label>
    //         <input
    //           type="number"
    //           className="input"
    //           min={0}
    //           max={leaders || 0}
    //           value={freeLeaders}
    //           onChange={(e) =>
    //             setFreeLeaders(
    //               clamp(parseInt(e.target.value || "0"), 0, leaders || 0)
    //             )
    //           }
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </Card>

    // Usage
    <Card>
      <h2 className="mb-3 text-lg font-semibold">1) Group</h2>

      {/* SELECT LOCATION */}
      <Label>Location</Label>
      <select
        className="input"
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
      >
        {priceList.locations.map((l) => (
          <option key={l.locationId} value={l.locationId}>
            {l.locationName}
          </option>
        ))}
      </select>

      {/* STUDENTS / LEADERS / FREE LEADERS — SAME ROW */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div>
          <Label>Students</Label>
          <input
            type="number"
            className={[
              "input",
              // compact width (overrides any w-full in your input base)
              "!w-28 md:!w-36 max-w-full",
              // subtle styling polish (no size change to padding/line-height)
              "rounded-xl bg-white dark:bg-neutral-900",
              "ring-1 ring-neutral-200/70 dark:ring-neutral-800",
              "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
              "transition-shadow duration-150",
              "text-right", // numeric inputs feel nicer right-aligned
            ].join(" ")}
            min={1}
            value={students}
            onChange={(e) =>
              setStudents(clamp(parseInt(e.target.value || "0"), 1, 9999))
            }
          />
        </div>

        <div>
          <Label>Leaders</Label>
          <input
            type="number"
            className={[
              "input",
              // compact width (overrides any w-full in your input base)
              "!w-28 md:!w-36 max-w-full",
              // subtle styling polish (no size change to padding/line-height)
              "rounded-xl bg-white dark:bg-neutral-900",
              "ring-1 ring-neutral-200/70 dark:ring-neutral-800",
              "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
              "transition-shadow duration-150",
              "text-right", // numeric inputs feel nicer right-aligned
            ].join(" ")}
            min={0}
            value={leaders}
            onChange={(e) =>
              setLeaders(clamp(parseInt(e.target.value || "0"), 0, 9999))
            }
          />
        </div>

        <div>
          <Label>Free leaders</Label>
          <input
            type="number"
            className={[
              "input",
              // compact width (overrides any w-full in your input base)
              "!w-28 md:!w-36 max-w-full",
              // subtle styling polish (no size change to padding/line-height)
              "rounded-xl bg-white dark:bg-neutral-900",
              "ring-1 ring-neutral-200/70 dark:ring-neutral-800",
              "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
              "transition-shadow duration-150",
              "text-right", // numeric inputs feel nicer right-aligned
            ].join(" ")}
            min={0}
            max={leaders || 0}
            value={freeLeaders}
            onChange={(e) =>
              setFreeLeaders(
                clamp(parseInt(e.target.value || "0"), 0, leaders || 0)
              )
            }
          />
        </div>

        {/* ACCOMMODATION PICKERS */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Accommodation (Students)</Label>
            <select
              className="input"
              value={studentAccommodationId ?? ""}
              onChange={(e) =>
                setStudentAccommodationId(e.target.value || null)
              }
            >
              {(
                priceList.locations.find((l) => l.locationId === locationId)
                  ?.accommodationStudents ?? []
              ).map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}{" "}
                  {opt.price ? `· +${fmt(opt.price, loc.currency)}` : ""}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-neutral-600">
              Applied to students ({students}). Unit: per student.
            </p>
          </div>

          <div>
            <Label>Accommodation (Leaders)</Label>
            <select
              className="input"
              value={leaderAccommodationId ?? ""}
              onChange={(e) => setLeaderAccommodationId(e.target.value || null)}
            >
              {(
                priceList.locations.find((l) => l.locationId === locationId)
                  ?.accommodationLeaders ?? []
              ).map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}{" "}
                  {opt.price ? `· +${fmt(opt.price, loc.currency)}` : ""}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-neutral-600">
              Applied to leaders ({leaders}). Unit: per leader.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
