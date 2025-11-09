import Card from "./Card";
import Label from "./Label";
import AirportSelect from "./AirportSelect";

export default function TransfersCard({
  arrivalAirport,
  setArrivalAirport,
  departureAirport,
  setDepartureAirport,
  loc,
  studentAccommodationId,
  setStudentAccommodationId,
  leaderAccommodationId,
  setLeaderAccommodationId,
}) {
  const studentAccommodationOptions = location?.accommodationStudents ?? [];
  const leaderAccommodationOptions = location?.accommodationLeaders ?? [];

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">3) Transfers</h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Arrival Airport</Label>
          <AirportSelect value={arrivalAirport} onChange={setArrivalAirport} />
        </div>
        <div>
          <Label>Departure Airport</Label>
          <AirportSelect
            value={departureAirport}
            onChange={setDepartureAirport}
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-neutral-600">
        {loc.transfer.includedAirports.join(" / ")} included. Others add a
        supplement per way. You can override supplements in the Admin panel
        below.
      </p>

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
