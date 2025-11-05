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
  arrivalAirport,
  setArrivalAirport,
  departureAirport,
  setDepartureAirport,
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
      />

      <DurationCard
        packageKey={packageKey}
        setPackageKey={setPackageKey}
        baseNights={baseNights}
        customNights={customNights}
        setCustomNights={setCustomNights}
        clamp={clamp}
        weeks={weeks}
        setWeeks={setWeeks}
        inferredWeeks={inferredWeeks}
        lessonsPerWeek={lessonsPerWeek}
        setLessonsPerWeek={setLessonsPerWeek}
      />

      <TransfersCard
        arrivalAirport={arrivalAirport}
        setArrivalAirport={setArrivalAirport}
        departureAirport={departureAirport}
        setDepartureAirport={setDepartureAirport}
        loc={loc}
      />
    </div>
  );
}
