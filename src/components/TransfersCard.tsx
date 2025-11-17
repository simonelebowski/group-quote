import Card from "./Card";
import Label from "./Label";
import AirportSelect from "./AirportSelect";
import Select from "./Select";
import { TransferOptionId, LocationPricing } from "@/types/types";

type TransfersCardProps = {
  arrivalTransferOptionId: TransferOptionId;
  setArrivalTransferOptionId: (value: TransferOptionId) => void;

  departureTransferOptionId: TransferOptionId;
  setDepartureTransferOptionId: (value: TransferOptionId) => void;

  loc: LocationPricing;

  studentAccommodationId: string;
  setStudentAccommodationId: (value: string) => void;

  leaderAccommodationId: string;
  setLeaderAccommodationId: (value: string) => void;
};

export default function TransfersCard({
  arrivalTransferOptionId,
  setArrivalTransferOptionId,
  departureTransferOptionId,
  setDepartureTransferOptionId,
  loc,
  studentAccommodationId,
  setStudentAccommodationId,
  leaderAccommodationId,
  setLeaderAccommodationId,
}: TransfersCardProps) {
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

      <hr className="my-4" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <Label>Arrival Airport</Label>
          <AirportSelect
            value={arrivalTransferOptionId}
            onChange={setArrivalTransferOptionId}
            options={loc.transfer.options}
          />
        </div>
        <div>
          <Label>Departure Airport</Label>
          <AirportSelect
            value={departureTransferOptionId}
            onChange={setDepartureTransferOptionId}
            options={loc.transfer.options}
          />
        </div>
      </div>
      {/* <p className="mt-2 text-xs text-neutral-600">
        {loc.transfer.includedAirports.join(" / ")} included. Others add a
        supplement per way. You can override supplements in the Admin panel
        below.
      </p> */}
    </Card>
  );
}
