import Card from "./Card";
import Label from "./Label";
import { PackageKey } from "@/types/types";

export default function DurationCard({
  packageKey,
  setPackageKey,
  baseNights,
  customNights,
  setCustomNights,
  clamp,
  weeks,
  setWeeks,
  inferredWeeks,
  lessonsPerWeek,
  setLessonsPerWeek,
}) {
  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">2) Duration & Lessons</h2>
      <Label>Standard Package</Label>
      <select
        className="input"
        value={packageKey}
        onChange={(e) => setPackageKey(e.target.value as PackageKey)}
      >
        <option value="6n7d">6 nights / 7 days</option>
        <option value="7n8d">7 nights / 8 days</option>
        <option value="13n14d">13 nights / 14 days</option>
        <option value="14n15d">14 nights / 15 days</option>
      </select>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <Label>Custom Nights (optional)</Label>
          <input
            type="number"
            className="input"
            min={1}
            placeholder={`${baseNights}`}
            value={customNights}
            onChange={(e) => {
              const v = e.target.value;
              setCustomNights(v === "" ? "" : clamp(parseInt(v), 1, 60));
            }}
          />
          <p className="mt-1 text-xs text-neutral-600">
            Leave blank to use the package default of <b>{baseNights}</b>{" "}
            nights.
          </p>
        </div>
        <div>
          <Label>Weeks</Label>
          <input
            type="number"
            className="input"
            min={1}
            max={8}
            value={weeks}
            onChange={(e) =>
              setWeeks(clamp(parseInt(e.target.value || "1"), 1, 8))
            }
          />
          <p className="mt-1 text-xs text-neutral-600">
            Inferred from nights: <b>{inferredWeeks}</b> week(s)
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <Label>Lessons per week</Label>
          <input
            type="number"
            className="input"
            min={0}
            max={40}
            value={lessonsPerWeek}
            onChange={(e) =>
              setLessonsPerWeek(clamp(parseInt(e.target.value || "0"), 0, 40))
            }
          />
          <p className="mt-1 text-xs text-neutral-600">
            20 lessons/week included. Adjusts ± per lesson.
          </p>
        </div>
      </div>
    </Card>
  );
}
