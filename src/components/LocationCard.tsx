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
  groupName,
  setGroupName,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
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

      {/* OPTIONAL INPUTS */}
      <div className="col-span-3">
        <div className="mt-6 space-y-4 rounded-xl bg-neutral-100/80 p-4 ring-1 ring-neutral-200">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Optional inputs
          </p>

          <div className="space-y-4">
            {/* Group name */}
            <div className="space-y-2">
              <Label>Group name</Label>
              <input
                type="text"
                className={[
                  "block",
                  "w-full",
                  "h-10",
                  "rounded-xl",
                  "bg-white",
                  "dark:bg-neutral-900",
                  "border border-neutral-200/70 dark:border-neutral-800",
                  "px-3",
                  "text-sm",
                  "leading-none",
                  "focus:outline-none",
                  "focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
                  "transition-shadow duration-150",
                ].join(" ")}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              ></input>
            </div>

            {/* Dates */}
            <div className="flex justify-between">
              <div className="space-y-2">
                <Label>From</Label>
                <input
                  type="date"
                  className={[
                    "block",
                    "w-full",
                    "h-10",
                    "rounded-xl",
                    "bg-white",
                    "dark:bg-neutral-900",
                    "border border-neutral-200/70 dark:border-neutral-800",
                    "px-3",
                    "text-sm",
                    "leading-none",
                    "focus:outline-none",
                    "focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
                    "transition-shadow duration-150",
                  ].join(" ")}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                ></input>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <input
                  type="date"
                  className={[
                    "block",
                    "w-full",
                    "h-10",
                    "rounded-xl",
                    "bg-white",
                    "dark:bg-neutral-900",
                    "border border-neutral-200/70 dark:border-neutral-800",
                    "px-3",
                    "text-sm",
                    "leading-none",
                    "focus:outline-none",
                    "focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
                    "transition-shadow duration-150",
                  ].join(" ")}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
