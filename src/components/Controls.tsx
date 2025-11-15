import LocationCard from "./LocationCard";
import DurationCard from "./DurationCard";
import TransfersCard from "./TransfersCard";
import { PackageKey, TransferOptionId, LocationPricing } from "@/types/types";

type ControlsProps = {
  locationId: string;
  setLocationId: (value: string) => void;

  students: number;
  setStudents: (value: number) => void;

  leaders: number;
  setLeaders: (value: number) => void;

  freeLeaders: number;
  setFreeLeaders: (value: number) => void;

  groupName: string | null;
  setGroupName: (value: string) => void;

  fromDate: string | null;
  setFromDate: (value: string | null) => void;

  toDate: string | null;
  setToDate: (value: string | null) => void;

  studentAccommodationId: string;
  setStudentAccommodationId: (value: string) => void;

  leaderAccommodationId: string;
  setLeaderAccommodationId: (value: string) => void;

  clamp: (value: number, min: number, max: number) => number;

  packageKey: PackageKey;
  setPackageKey: (value: PackageKey) => void;

  baseNights: number;
  customNights: number | "";
  setCustomNights: (value: number | "") => void;

  lessonsPerWeek: number;
  setLessonsPerWeek: (value: number) => void;

  arrivalTransferOptionId: TransferOptionId;
  setArrivalTransferOptionId: (value: TransferOptionId) => void;

  departureTransferOptionId: TransferOptionId;
  setDepartureTransferOptionId: (value: TransferOptionId) => void;

  loc: LocationPricing;
};

export default function Controls({
  locationId,
  setLocationId,
  students,
  setStudents,
  leaders,
  setLeaders,
  freeLeaders,
  setFreeLeaders,
  groupName,
  setGroupName,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  studentAccommodationId,
  setStudentAccommodationId,
  leaderAccommodationId,
  setLeaderAccommodationId,
  clamp,
  packageKey,
  setPackageKey,
  baseNights,
  customNights,
  setCustomNights,
  lessonsPerWeek,
  setLessonsPerWeek,
  arrivalTransferOptionId,
  setArrivalTransferOptionId,
  departureTransferOptionId,
  setDepartureTransferOptionId,
  loc,
}: ControlsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <LocationCard
        locationId={locationId}
        setLocationId={setLocationId}
        students={students}
        setStudents={setStudents}
        leaders={leaders}
        setLeaders={setLeaders}
        clamp={clamp}
        freeLeaders={freeLeaders}
        setFreeLeaders={setFreeLeaders}
        groupName={groupName}
        setGroupName={setGroupName}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <DurationCard
        packageKey={packageKey}
        setPackageKey={setPackageKey}
        baseNights={baseNights}
        customNights={customNights}
        setCustomNights={setCustomNights}
        clamp={clamp}
        lessonsPerWeek={lessonsPerWeek}
        setLessonsPerWeek={setLessonsPerWeek}
      />

      <TransfersCard
        arrivalTransferOptionId={arrivalTransferOptionId}
        setArrivalTransferOptionId={setArrivalTransferOptionId}
        departureTransferOptionId={departureTransferOptionId}
        setDepartureTransferOptionId={setDepartureTransferOptionId}
        loc={loc}
        studentAccommodationId={studentAccommodationId}
        setStudentAccommodationId={setStudentAccommodationId}
        leaderAccommodationId={leaderAccommodationId}
        setLeaderAccommodationId={setLeaderAccommodationId}
      />
    </div>
  );
}
