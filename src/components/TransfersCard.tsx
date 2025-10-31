import Card from "./Card";
import Label from "./Label";
import AirportSelect from "./AirportSelect";

export default function TransfersCard({
  arrivalAirport,
  setArrivalAirport,
  departureAirport,
  setDepartureAirport,
  loc,
}) {
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
    </Card>
  );
}
