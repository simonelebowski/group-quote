import LocationCard from "./LocationCard";
import DurationCard from "./DurationCard";
import TransfersCard from "./TransfersCard";

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
  weeks,
  setWeeks,
  inferredWeeks,
  lessonsPerWeek,
  setLessonsPerWeek,
  // arrivalAirport,
  // setArrivalAirport,
  // departureAirport,
  // setDepartureAirport,
  arrivalTransferOptionId,
  setArrivalTransferOptionId,
  departureTransferOptionId,
  setDepartureTransferOptionId,
  loc,
}) {
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
        // weeks={weeks}
        // setWeeks={setWeeks}
        // inferredWeeks={inferredWeeks}
        lessonsPerWeek={lessonsPerWeek}
        setLessonsPerWeek={setLessonsPerWeek}
      />

      <TransfersCard
        // arrivalAirport={arrivalAirport}
        // setArrivalAirport={setArrivalAirport}
        // departureAirport={departureAirport}
        // setDepartureAirport={setDepartureAirport}
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
