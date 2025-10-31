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
}) {
  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">1) Group</h2>
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

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <Label>Students</Label>
          <input
            type="number"
            className="input"
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
            className="input"
            min={0}
            value={leaders}
            onChange={(e) =>
              setLeaders(clamp(parseInt(e.target.value || "0"), 0, 9999))
            }
          />
          <p className="mt-1 text-xs text-neutral-600">
            Free leaders included: <b>{freeLeaders}</b>
          </p>
        </div>
      </div>
    </Card>
  );
}
