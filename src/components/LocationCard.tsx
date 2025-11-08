import { priceList } from "@/data/priceList";
import Card from "./Card";
import Label from "./Label";
import Select from "./Select";
import Input from "./Input";

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
  const studentAccommodationOptions = location?.accommodationStudents ?? [];
  const leaderAccommodationOptions = location?.accommodationLeaders ?? [];

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">1) Group</h2>

      {/* SELECT LOCATION */}
      <Label>Location</Label>
      <Select
        value={locationId}
        setValue={setLocationId}
        options={priceList.locations}
      />
      {/* <select
        className={[
          "input",
          // "!w-36 md:!w-36 max-w-full",
          "rounded-xl bg-white dark:bg-neutral-900",
          "ring-1 ring-neutral-200/70 dark:ring-neutral-800",
          "px-3 py-2 pr-9 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
          "transition-shadow duration-150",
          "cursor-pointer",
        ].join(" ")}
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
      >
        {priceList.locations.map((l) => (
          <option key={l.locationId} value={l.locationId}>
            {l.locationName}
          </option>
        ))}
      </select> */}

      {/* STUDENTS / LEADERS / FREE LEADERS — SAME ROW */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div>
          <Label>Students</Label>
          <Input value={students} setValue={setStudents} clamp={clamp} />
        </div>

        <div>
          <Label>Leaders</Label>
          <Input value={leaders} setValue={setLeaders} clamp={clamp} />
        </div>

        <div>
          <Label>Free leaders</Label>
          <Input
            value={freeLeaders}
            setValue={setFreeLeaders}
            clamp={clamp}
            max={leaders}
          />
        </div>
      </div>

      {/* ACCOMMODATION PICKERS */}
      <div className="col-span-3">
        <div className="mt-6 space-y-4 rounded-xl bg-neutral-100/80 p-4 ring-1 ring-neutral-200">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Accommodation
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Students</Label>
              <select
                className="input w-full"
                value={studentAccommodationId ?? ""}
                onChange={(e) =>
                  setStudentAccommodationId(e.target.value || null)
                }
              >
                <option value="">Select accommodation</option>
                {studentAccommodationOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Leaders</Label>
              <select
                className="input w-full"
                value={leaderAccommodationId ?? ""}
                onChange={(e) =>
                  setLeaderAccommodationId(e.target.value || null)
                }
              >
                <option value="">Select accommodation</option>
                {leaderAccommodationOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
