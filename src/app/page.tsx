"use client";
import { useMemo, useState, useEffect } from "react";
import {
  Currency,
  Unit,
  TransferOptionId,
  PackageKey,
  SelectedActivities,
  SelectedBusCards,
} from "@/types/types";
import { priceList } from "@/data/priceList";
import { calculatePricing } from "@/features/pricing/calculatePricing";
import Label from "@/components/Label";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Controls from "@/components/Controls";
import ActivitiesCard from "@/components/ActivitiesCard";
import BusExtras from "@/components/BusExtras";
import Summary from "@/components/Summary";
import Total from "@/components/Total";

// ---- Admin override types (manual price editing) ----
type LocationOverrides = {
  basePackages?: Partial<Record<PackageKey, number>>;
  perExtraNight?: number;
  perFewerNight?: number;
  perExtraLesson?: number;
  perFewerLesson?: number;
  transferSupplements?: Partial<Record<TransferOptionId, number>>;
  activities?: Record<string, number>; // activityId -> price
  busCards?: Record<string, number>; // busCardId -> price
};

type CustomLineItem = {
  id: string;
  name: string;
  unit: Unit; // perStudent | perLeader | perGroup | flat
  qty: number;
  price: number; // per-unit per the unit above
};

// ------------------------ Utils -----------------------------

const fmt = (n: number, currency: Currency) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

// -------------------- Main Component ------------------------

export default function QuoteCalculatorPage() {
  const [locationId, setLocationId] = useState<string>(
    priceList.locations[0].locationId
  );
  const loc = useMemo(
    () => priceList.locations.find((l) => l.locationId === locationId)!,
    [locationId]
  );

  const [students, setStudents] = useState<number>(15);
  const [leaders, setLeaders] = useState<number>(1);
  const [freeLeaders, setFreeLeaders] = useState<number>(0);
  const [groupName, setGroupName] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [packageKey, setPackageKey] = useState<PackageKey>("7n8d");
  const packageWeeks = packageKey === "6n7d" || packageKey === "7n8d" ? 1 : 2;
  const [customNights, setCustomNights] = useState<number | "">("");
  const [lessonsPerWeek, setLessonsPerWeek] = useState<number>(20);
  const [weeks, setWeeks] = useState<number>(1);

  // ACCOMMODATION VARIABLES--------------------------------------------------------------------------------------------------------
  const [studentAccommodationId, setStudentAccommodationId] = useState<
    string | null
  >(null);
  const [leaderAccommodationId, setLeaderAccommodationId] = useState<
    string | null
  >(null);
  const studentAcc = loc.accommodationStudents.find(
    (a) => a.id === studentAccommodationId
  );
  const leaderAcc = loc.accommodationLeaders.find(
    (a) => a.id === leaderAccommodationId
  );
  const studentAccTotal = studentAcc
    ? studentAcc.price * packageWeeks * students
    : 0;
  const leaderAccTotal = leaderAcc
    ? leaderAcc.price * packageWeeks * leaders
    : 0;

  // TRANSFERS VARIABLES-------------------------------------------------------------------------------------------------------------
  const [arrivalTransferOptionId, setArrivalTransferOptionId] =
    useState<TransferOptionId>("lgw_or_lhr");
  const arrivalOpt = loc.transfer.options.find(
  (o) => o.id === arrivalTransferOptionId
);  
  const [departureTransferOptionId, setDepartureTransferOptionId] =
    useState<TransferOptionId>("lgw_or_lhr");
  const departureOpt = loc.transfer.options.find(
  (o) => o.id === departureTransferOptionId
);

  // ACTIVITIES, BUS VARIABLES & EXTRAS---------------------------------------------------------------------------------------------
  const [selectedActivities, setSelectedActivities] = useState<SelectedActivities>({});
  const [selectedBusCards, setSelectedBusCards] = useState<SelectedBusCards>({});

  // NEW: admin overrides + custom items
  const [editMode, setEditMode] = useState<boolean>(false);
  const [overrides, setOverrides] = useState<Record<string, LocationOverrides>>(
    {}
  );
  const [customItems, setCustomItems] = useState<CustomLineItem[]>([]);
  const getOv = (id: string) => overrides[id] || {};

  // Auto-calc free leaders based on ratio; you can override manually by changing `leaders`.
  // const freeLeaders = useMemo(
  //   () => Math.ceil(students / priceList.freeLeaderRatio),
  //   [students]
  // );

  // Map package to nights baseline
  const packageNights: Record<PackageKey, number> = {
    "6n7d": 6,
    "7n8d": 7,
    "13n14d": 13,
    "14n15d": 14,
  };

  const baseNights = packageNights[packageKey];
  const nights = typeof customNights === "number" ? customNights : baseNights;

  // Weeks inferred from nights; but allow manual override via `weeks`
  const inferredWeeks = nights >= 13 ? 2 : 1;

  useEffect(() => {
    const s0 =
      priceList.locations.find((l) => l.locationId === locationId)
        ?.accommodationStudents?.[0]?.id ?? null;
    const l0 =
      priceList.locations.find((l) => l.locationId === locationId)
        ?.accommodationLeaders?.[0]?.id ?? null;
    setStudentAccommodationId(s0);
    setLeaderAccommodationId(l0);
  }, [locationId]);

  // ---------------- Pricing Engine --------------------------
  const pricing = useMemo(
    () =>
      calculatePricing({
        loc,
        students,
        leaders,
        freeLeaders,
        packageKey,
        overrides,
        nights,
        baseNights,
        lessonsPerWeek,
        weeks,
        studentAccommodationId,
        leaderAccommodationId,
        arrivalTransferOptionId,
        departureTransferOptionId,
        selectedActivities,
        selectedBusCards,
        customItems,
      }),
    [
      loc,
      students,
      leaders,
      freeLeaders,
      packageKey,
      overrides,
      nights,
      baseNights,
      lessonsPerWeek,
      weeks,
      studentAccommodationId,
      leaderAccommodationId,
      arrivalTransferOptionId,
      departureTransferOptionId,
      selectedActivities,
      selectedBusCards,
      customItems,
    ]
  );

  // ------------------------ UI ------------------------------

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl p-6">
        <Header editMode={editMode} setEditMode={setEditMode} />

        {/* Controls */}
        <Controls
          locationId={locationId}
          setLocationId={setLocationId}
          students={students}
          setStudents={setStudents}
          leaders={leaders}
          setLeaders={setLeaders}
          freeLeaders={freeLeaders}
          setFreeLeaders={setFreeLeaders}
          groupName={groupName}
          setGroupName={setGroupName}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          studentAccommodationId={studentAccommodationId}
          setStudentAccommodationId={setStudentAccommodationId}
          leaderAccommodationId={leaderAccommodationId}
          setLeaderAccommodationId={setLeaderAccommodationId}
          clamp={clamp}
          packageKey={packageKey}
          setPackageKey={setPackageKey}
          baseNights={baseNights}
          customNights={customNights}
          setCustomNights={setCustomNights}
          lessonsPerWeek={lessonsPerWeek}
          setLessonsPerWeek={setLessonsPerWeek}
          arrivalTransferOptionId={arrivalTransferOptionId}
          setArrivalTransferOptionId={setArrivalTransferOptionId}
          departureTransferOptionId={departureTransferOptionId}
          setDepartureTransferOptionId={setDepartureTransferOptionId}
          loc={loc}
        />

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ActivitiesCard
            loc={loc}
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
            unitLabel={unitLabel}
            fmt={fmt}
          />
          <BusExtras
            loc={loc}
            selectedBusCards={selectedBusCards}
            setSelectedBusCards={setSelectedBusCards}
            customItems={customItems}
            setCustomItems={setCustomItems}
            unitLabel={unitLabel}
            fmt={fmt}
          />
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Summary 
          loc={loc} 
          students={students} 
          leaders={leaders} 
          freeLeaders={freeLeaders} 
          packageKey={packageKey} 
          baseNights={baseNights} 
          nights={nights} 
          pricing={pricing} 
          studentAccTotal={studentAccTotal} 
          studentAcc={studentAcc} 
          leaderAccTotal={leaderAccTotal} 
          leaderAcc={leaderAcc}
          arrivalOpt={arrivalOpt}
          departureOpt={departureOpt} 
          />

          {/* Total */}
          <Total fmt={fmt} pricing={pricing} />
        </div>

        {/* ---- Admin / Overrides Panel ---- */}
        {editMode && (
          <div className="mt-6 grid grid-cols-1 gap-4">
            <Card>
              <h2 className="mb-3 text-lg font-semibold">
                Admin: Manual Price Overrides ({loc.locationName})
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <div className="mb-2 font-medium">
                    Base Packages (per student)
                  </div>
                  {(["6n7d", "7n8d", "13n14d", "14n15d"] as PackageKey[]).map(
                    (k) => (
                      <div key={k} className="mb-2">
                        <Label>{pkgLabel(k)}</Label>
                        <input
                          className="input"
                          type="number"
                          value={
                            getOv(loc.locationId).basePackages?.[k] ??
                            loc.basePackages[k]
                          }
                          onChange={(e) =>
                            setOverrides((prev) => ({
                              ...prev,
                              [loc.locationId]: {
                                ...getOv(loc.locationId),
                                basePackages: {
                                  ...(getOv(loc.locationId).basePackages || {}),
                                  [k]: parseFloat(e.target.value || "0"),
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    )
                  )}
                </div>

                <div>
                  <div className="mb-2 font-medium">Flex Adjustments</div>
                  <Label>Per extra night (per student)</Label>
                  <input
                    className="input"
                    type="number"
                    value={
                      getOv(loc.locationId).perExtraNight ?? loc.perExtraNight
                    }
                    onChange={(e) =>
                      setOverrides((p) => ({
                        ...p,
                        [loc.locationId]: {
                          ...getOv(loc.locationId),
                          perExtraNight: parseFloat(e.target.value || "0"),
                        },
                      }))
                    }
                  />
                  <Label className="mt-2">Per fewer night (per student)</Label>
                  <input
                    className="input"
                    type="number"
                    value={
                      getOv(loc.locationId).perFewerNight ?? loc.perFewerNight
                    }
                    onChange={(e) =>
                      setOverrides((p) => ({
                        ...p,
                        [loc.locationId]: {
                          ...getOv(loc.locationId),
                          perFewerNight: parseFloat(e.target.value || "0"),
                        },
                      }))
                    }
                  />
                  <Label className="mt-2">Per extra lesson</Label>
                  <input
                    className="input"
                    type="number"
                    value={
                      getOv(loc.locationId).perExtraLesson ?? loc.perExtraLesson
                    }
                    onChange={(e) =>
                      setOverrides((p) => ({
                        ...p,
                        [loc.locationId]: {
                          ...getOv(loc.locationId),
                          perExtraLesson: parseFloat(e.target.value || "0"),
                        },
                      }))
                    }
                  />
                  <Label className="mt-2">Per fewer lesson</Label>
                  <input
                    className="input"
                    type="number"
                    value={
                      getOv(loc.locationId).perFewerLesson ?? loc.perFewerLesson
                    }
                    onChange={(e) =>
                      setOverrides((p) => ({
                        ...p,
                        [loc.locationId]: {
                          ...getOv(loc.locationId),
                          perFewerLesson: parseFloat(e.target.value || "0"),
                        },
                      }))
                    }
                  />
                </div>

                <div>
                  <div className="mb-2 font-medium">
                    Transfer Supplements (per way, per student)
                  </div>
                  {(
                    [
                      "LGW",
                      "LHR",
                      "LTN",
                      "STN",
                      "LCY",
                      "SEN",
                      "OTHER",
                    ] as AirportCode[]
                  ).map((a) => (
                    <div key={a} className="mb-2">
                      <Label>{a}</Label>
                      <input
                        className="input"
                        type="number"
                        value={
                          getOv(loc.locationId).transferSupplements?.[a] ??
                          loc.transfer.supplements[a]?.price ??
                          0
                        }
                        onChange={(e) =>
                          setOverrides((p) => ({
                            ...p,
                            [loc.locationId]: {
                              ...getOv(loc.locationId),
                              transferSupplements: {
                                ...(getOv(loc.locationId).transferSupplements ||
                                  {}),
                                [a]: parseFloat(e.target.value || "0"),
                              },
                            },
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-2 font-medium">
                    Activities (override price)
                  </div>
                  {loc.activities.map((a) => (
                    <div key={a.id} className="mb-2">
                      <Label>{a.name}</Label>
                      <input
                        className="input"
                        type="number"
                        value={
                          getOv(loc.locationId).activities?.[a.id] ?? a.price
                        }
                        onChange={(e) =>
                          setOverrides((p) => ({
                            ...p,
                            [loc.locationId]: {
                              ...getOv(loc.locationId),
                              activities: {
                                ...(getOv(loc.locationId).activities || {}),
                                [a.id]: parseFloat(e.target.value || "0"),
                              },
                            },
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="mb-2 font-medium">
                    Bus Cards (override price)
                  </div>
                  {loc.busCards.map((b) => (
                    <div key={b.id} className="mb-2">
                      <Label>{b.name}</Label>
                      <input
                        className="input"
                        type="number"
                        value={
                          getOv(loc.locationId).busCards?.[b.id] ?? b.price
                        }
                        onChange={(e) =>
                          setOverrides((p) => ({
                            ...p,
                            [loc.locationId]: {
                              ...getOv(loc.locationId),
                              busCards: {
                                ...(getOv(loc.locationId).busCards || {}),
                                [b.id]: parseFloat(e.target.value || "0"),
                              },
                            },
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-neutral-500">
          FOOTER
        </footer>
      </div>
    </div>
  );
}

// ------------------- Small UI Helpers ----------------------
function unitLabel(u: Unit) {
  switch (u) {
    case "perStudent":
      return "per student";
    case "perLeader":
      return "per leader";
    case "perGroup":
      return "per group";
    case "flat":
      return "flat";
  }
}

function pkgLabel(k: PackageKey) {
  switch (k) {
    case "6n7d":
      return "6 nights / 7 days";
    case "7n8d":
      return "7 nights / 8 days";
    case "13n14d":
      return "13 nights / 14 days";
    case "14n15d":
      return "14 nights / 15 days";
  }
}
