import Card from "./Card";
import Label from "./Label";
import AirportSelect from "./AirportSelect";
import Select from "./Select";

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
  const studentAccommodationOptions = loc?.accommodationStudents ?? [];
  const leaderAccommodationOptions = loc?.accommodationLeaders ?? [];

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">
        3) Accommodation & Transfers
      </h2>
      {/* ACCOMMODATION PICKERS */}
      <div className="col-span-3 mt-3 space-y-2">
        <div className="space-y-4">
          <div className="">
            <Label>Students accommodation</Label>
            <Select
              value={studentAccommodationId}
              setValue={setStudentAccommodationId}
              options={studentAccommodationOptions.map((opt) => ({
                value: opt.id,
                label: opt.name,
              }))}
            />
          </div>

          <div className="">
            <Label>Leaders accommodation</Label>
            <Select
              value={leaderAccommodationId}
              setValue={setLeaderAccommodationId}
              options={leaderAccommodationOptions.map((opt) => ({
                value: opt.id,
                label: opt.name,
              }))}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
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
    </Card>
  );
}
