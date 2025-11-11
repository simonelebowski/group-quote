import Card from "./Card";
import Label from "./Label";
import { PackageKey } from "@/types/types";
import Select from "./Select";
import Input from "./Input";

const defaultLessonsForPackage = (pkg: PackageKey) => pkg === "13n14d" || pkg === "14n15d" ? 40 : 20;

export default function DurationCard({
  packageKey,
  setPackageKey,
  baseNights,
  customNights,
  setCustomNights,
  clamp,
  // weeks,
  // setWeeks,
  // inferredWeeks,
  lessonsPerWeek,
  setLessonsPerWeek,
}) {
  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">2) Duration & Lessons</h2>
      <Label>Standard Package</Label>
      <Select
        value={packageKey}
        setValue={(v) => {
          const next = v as PackageKey; 
          setPackageKey(next); 
          setCustomNights(''); 
          setLessonsPerWeek(defaultLessonsForPackage(next))}}
        options={[
          { value: "6n7d", label: "6 nights / 7 days" },
          { value: "7n8d", label: "7 nights / 8 days" },
          { value: "13n14d", label: "13 nights / 14 days" },
          { value: "14n15d", label: "14 nights / 15 days" },
        ]}
      />

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <div className="min-h-[40px] flex items-end">
            <Label>Custom Nights (optional)</Label>
          </div>
          <Input
            value={customNights}
            setValue={setCustomNights}
            clamp={clamp}
            placeholder={baseNights}
          />
          <p className="mt-1 text-xs text-neutral-600">
            Leave blank to use the package default of <b>{baseNights}</b>{" "}
            nights.
          </p>
        </div>
        <div>
          <div className="min-h-[40px] flex items-end">
            <Label>Total Lessons</Label>
          </div>
          <Input
            max={60}
            value={lessonsPerWeek}
            setValue={setLessonsPerWeek}
            clamp={clamp}
          />
          <p className="mt-1 text-xs text-neutral-600">
              Adjusts ± per lesson if needed. 
          </p>
        </div>
      </div>
    </Card>
  );
}
