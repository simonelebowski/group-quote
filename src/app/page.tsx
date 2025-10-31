"use client";
import React, { useMemo, useState } from "react";
import {
  Currency,
  Unit,
  AirportCode,
  PackageKey,
  priceList,
} from "@/data/priceList";
import Row from "@/components/Row";
import Label from "@/components/Label";
import Card from "@/components/Card";
import QtyInput from "@/components/QtyInput";
import AirportSelect from "@/components/AirportSelect";
import CustomItemsEditor from "@/components/CustomItemEditor";
import Header from "@/components/Header";
import Controls from "@/components/Controls";

// ---- Admin override types (manual price editing) ----
type LocationOverrides = {
  basePackages?: Partial<Record<PackageKey, number>>;
  perExtraNight?: number;
  perFewerNight?: number;
  perExtraLesson?: number;
  perFewerLesson?: number;
  transferSupplements?: Partial<Record<AirportCode, number>>;
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
  const [packageKey, setPackageKey] = useState<PackageKey>("7n8d");
  const [customNights, setCustomNights] = useState<number | "">("");
  const [lessonsPerWeek, setLessonsPerWeek] = useState<number>(20);
  const [weeks, setWeeks] = useState<number>(1);
  const [arrivalAirport, setArrivalAirport] = useState<AirportCode>("LGW");
  const [departureAirport, setDepartureAirport] = useState<AirportCode>("LGW");
  const [selectedActivities, setSelectedActivities] = useState<
    Record<string, number>
  >({});
  const [selectedBusCards, setSelectedBusCards] = useState<
    Record<string, number>
  >({});

  // NEW: admin overrides + custom items
  const [editMode, setEditMode] = useState<boolean>(false);
  const [overrides, setOverrides] = useState<Record<string, LocationOverrides>>(
    {}
  );
  const [customItems, setCustomItems] = useState<CustomLineItem[]>([]);
  const getOv = (id: string) => overrides[id] || {};

  // Auto-calc free leaders based on ratio; you can override manually by changing `leaders`.
  const freeLeaders = useMemo(
    () => Math.ceil(students / priceList.freeLeaderRatio),
    [students]
  );

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

  // ---------------- Pricing Engine --------------------------

  const pricing = useMemo(() => {
    const currency = loc.currency;
    const payingLeaders = Math.max(0, leaders - freeLeaders); // leaders above the free allowance
    const studentsAndPayingLeaders = students + payingLeaders;

    // Effective prices (apply overrides if present)
    // const ov = getOv(loc.locationId);
    const ov = overrides[loc.locationId] ?? {};
    const basePerStudent =
      ov.basePackages?.[packageKey] ?? loc.basePackages[packageKey];
    const perExtraNight = ov.perExtraNight ?? loc.perExtraNight;
    const perFewerNight = ov.perFewerNight ?? loc.perFewerNight;
    const perExtraLesson = ov.perExtraLesson ?? loc.perExtraLesson;
    const perFewerLesson = ov.perFewerLesson ?? loc.perFewerLesson;

    // Nights
    const nightDelta = nights - baseNights;
    const nightAdjPerStudent =
      nightDelta > 0
        ? nightDelta * perExtraNight
        : Math.abs(nightDelta) * perFewerNight;

    // Lessons (20 lessons/week included)
    const effectiveWeeks = weeks || inferredWeeks;
    const includedLessons = 20 * effectiveWeeks;
    const lessonDelta = lessonsPerWeek * effectiveWeeks - includedLessons;
    const lessonAdjPerStudent =
      lessonDelta > 0
        ? lessonDelta * perExtraLesson
        : Math.abs(lessonDelta) * perFewerLesson;

    // Transfers (arrival + departure). Allow overrides by airport.
    const transferSuppPrice = (airport: AirportCode) => {
      const included = loc.transfer.includedAirports.includes(airport);
      const ovSupp = ov.transferSupplements?.[airport];
      const baseSupp =
        loc.transfer.supplements[airport]?.price ??
        loc.transfer.supplements.OTHER.price;
      return included ? 0 : ovSupp ?? baseSupp;
    };
    const transferPerStudent =
      transferSuppPrice(arrivalAirport) + transferSuppPrice(departureAirport);

    // Activities
    let activitiesTotal = 0;
    let activitiesBreakdown: { label: string; total: number }[] = [];
    Object.entries(selectedActivities).forEach(([id, qty]) => {
      if (!qty) return;
      const act = loc.activities.find((a) => a.id === id);
      if (!act) return;
      const price = ov.activities?.[id] ?? act.price;
      let subtotal = 0;
      const label = `${act.name} x${qty}`;
      switch (act.unit) {
        case "perStudent":
          subtotal = price * qty * studentsAndPayingLeaders;
          break;
        case "perLeader":
          subtotal = price * qty * leaders;
          break;
        case "perGroup":
        case "flat":
          subtotal = price * qty;
          break;
      }
      activitiesTotal += subtotal;
      activitiesBreakdown.push({ label, total: subtotal });
    });

    // Bus cards
    let busCardsTotal = 0;
    let busBreakdown: { label: string; total: number }[] = [];
    Object.entries(selectedBusCards).forEach(([id, qty]) => {
      if (!qty) return;
      const card = loc.busCards.find((b) => b.id === id);
      if (!card) return;
      const price = ov.busCards?.[id] ?? card.price;
      let subtotal = 0;
      const label = `${card.name} x${qty}`;
      if (card.unit === "perStudent") subtotal = price * qty * students;
      else if (card.unit === "perLeader") subtotal = price * qty * leaders;
      else subtotal = price * qty; // perGroup or flat
      busCardsTotal += subtotal;
      busBreakdown.push({ label, total: subtotal });
    });

    // Core totals
    const perStudentCore =
      basePerStudent +
      nightAdjPerStudent +
      lessonAdjPerStudent +
      transferPerStudent;
    const coreStudentsAndPayingLeadersTotal =
      perStudentCore * studentsAndPayingLeaders;

    // Custom items
    let customTotal = 0;
    let customBreakdown: { label: string; total: number }[] = [];
    customItems.forEach((item) => {
      if (!item.qty) return;
      let subtotal = 0;
      if (item.unit === "perStudent")
        subtotal = item.price * item.qty * students;
      else if (item.unit === "perLeader")
        subtotal = item.price * item.qty * leaders;
      else subtotal = item.price * item.qty; // perGroup or flat
      customTotal += subtotal;
      customBreakdown.push({
        label: `${item.name} x${item.qty}`,
        total: subtotal,
      });
    });

    // Grand total
    const grandTotal =
      coreStudentsAndPayingLeadersTotal +
      activitiesTotal +
      busCardsTotal +
      customTotal;
    const perStudentAllIn = grandTotal / students;

    return {
      currency,
      perStudentCore,
      coreStudentsAndPayingLeadersTotal,
      activitiesTotal,
      activitiesBreakdown,
      busCardsTotal,
      busBreakdown,
      grandTotal,
      perStudentAllIn,
      customBreakdown,
      meta: {
        basePerStudent,
        nightDelta,
        nightAdjPerStudent,
        lessonDelta,
        lessonAdjPerStudent,
        transferPerStudent,
        payingLeaders,
        includedLessons,
        effectiveWeeks,
        perExtraNight,
        perFewerNight,
        perExtraLesson,
        perFewerLesson,
      },
    };
  }, [
    loc,
    leaders,
    freeLeaders,
    packageKey,
    nights,
    baseNights,
    lessonsPerWeek,
    weeks,
    arrivalAirport,
    departureAirport,
    selectedActivities,
    selectedBusCards,
    customItems,
    students,
    overrides,
  ]);

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
          clamp={clamp}
          freeLeaders={freeLeaders}
          packageKey={packageKey}
          setPackageKey={setPackageKey}
          baseNights={baseNights}
          customNights={customNights}
          setCustomNights={setCustomNights}
          weeks={weeks}
          setWeeks={setWeeks}
          inferredWeeks={inferredWeeks}
          lessonsPerWeek={lessonsPerWeek}
          setLessonsPerWeek={setLessonsPerWeek}
          arrivalAirport={arrivalAirport}
          setArrivalAirport={setArrivalAirport}
          departureAirport={departureAirport}
          setDepartureAirport={setDepartureAirport}
          loc={loc}
        />

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <h2 className="mb-3 text-lg font-semibold">
              4) Activities & Trips
            </h2>
            <div className="space-y-3">
              {loc.activities.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-3 rounded-xl border p-3"
                >
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-neutral-600">
                      {unitLabel(a.unit)} · {fmt(a.price, loc.currency)}
                    </div>
                    {a.description && (
                      <div className="text-xs text-neutral-600">
                        {a.description}
                      </div>
                    )}
                  </div>
                  <QtyInput
                    value={selectedActivities[a.id] || 0}
                    onChange={(n) =>
                      setSelectedActivities((prev) => ({ ...prev, [a.id]: n }))
                    }
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">5) Bus Cards</h2>
            <div className="space-y-3">
              {loc.busCards.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-3 rounded-xl border p-3"
                >
                  <div>
                    <div className="font-medium">{b.name}</div>
                    <div className="text-xs text-neutral-600">
                      {unitLabel(b.unit)} · {fmt(b.price, loc.currency)}
                    </div>
                  </div>
                  <QtyInput
                    value={selectedBusCards[b.id] || 0}
                    onChange={(n) =>
                      setSelectedBusCards((prev) => ({ ...prev, [b.id]: n }))
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <h2 className="mb-3 text-lg font-semibold">Breakdown</h2>
            <div className="space-y-2 text-sm">
              <Row label="Location" value={loc.locationName} />
              <Row label="Students" value={String(students)} />
              <Row
                label="Leaders (free/paying)"
                value={`${leaders} (${Math.min(
                  leaders,
                  freeLeaders
                )}/${Math.max(0, leaders - freeLeaders)})`}
              />
              <Row label="Package" value={pkgLabel(packageKey)} />
              <Row
                label="Nights (base→actual)"
                value={`${baseNights} → ${nights}`}
              />
              <Row
                label="Weeks (included lessons)"
                value={`${pricing.meta.effectiveWeeks} (${pricing.meta.includedLessons})`}
              />
              <Row label="Lessons/week" value={`${lessonsPerWeek}`} />
              <Row
                label="Airports (arr/dep)"
                value={`${arrivalAirport} / ${departureAirport}`}
              />
              <hr className="my-2" />
              <Row
                label="Base per student"
                value={fmt(pricing.meta.basePerStudent, pricing.currency)}
              />
              {pricing.meta.nightDelta !== 0 && (
                <Row
                  label={`Night adjustment per student (${
                    pricing.meta.nightDelta > 0 ? "+" : "-"
                  }${Math.abs(pricing.meta.nightDelta)} night${
                    Math.abs(pricing.meta.nightDelta) !== 1 ? "s" : ""
                  })`}
                  value={fmt(pricing.meta.nightAdjPerStudent, pricing.currency)}
                />
              )}
              {pricing.meta.lessonDelta !== 0 && (
                <Row
                  label={`Lesson adjustment per student (${
                    pricing.meta.lessonDelta > 0 ? "+" : "-"
                  }${Math.abs(pricing.meta.lessonDelta)} lesson${
                    Math.abs(pricing.meta.lessonDelta) !== 1 ? "s" : ""
                  })`}
                  value={fmt(
                    pricing.meta.lessonAdjPerStudent,
                    pricing.currency
                  )}
                />
              )}
              {pricing.meta.transferPerStudent !== 0 && (
                <Row
                  label={`Transfer supplement per student`}
                  value={fmt(pricing.meta.transferPerStudent, pricing.currency)}
                />
              )}
              <Row
                label="Core x (students + paying leaders)"
                value={`${students + pricing.meta.payingLeaders} × ${fmt(
                  pricing.perStudentCore,
                  pricing.currency
                )}`}
              />
              <Row
                label="Core subtotal"
                value={fmt(
                  pricing.coreStudentsAndPayingLeadersTotal,
                  pricing.currency
                )}
              />
              {pricing.activitiesBreakdown.length > 0 && (
                <div className="mt-2">
                  <div className="mb-1 font-medium">Activities</div>
                  <div className="space-y-1">
                    {pricing.activitiesBreakdown.map((b) => (
                      <Row
                        key={b.label}
                        label={`• ${b.label}`}
                        value={fmt(b.total, pricing.currency)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {pricing.busBreakdown.length > 0 && (
                <div className="mt-2">
                  <div className="mb-1 font-medium">Bus Cards</div>
                  <div className="space-y-1">
                    {pricing.busBreakdown.map((b) => (
                      <Row
                        key={b.label}
                        label={`• ${b.label}`}
                        value={fmt(b.total, pricing.currency)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {pricing.customBreakdown &&
                pricing.customBreakdown.length > 0 && (
                  <div className="mt-2">
                    <div className="mb-1 font-medium">Custom Items</div>
                    <div className="space-y-1">
                      {pricing.customBreakdown.map((b) => (
                        <Row
                          key={b.label}
                          label={`• ${b.label}`}
                          value={fmt(b.total, pricing.currency)}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">Totals</h2>
            <div className="space-y-2 text-sm">
              <Row
                label="Grand total"
                value={fmt(pricing.grandTotal, pricing.currency)}
                strong
              />
              <Row
                label="All-in per student"
                value={fmt(pricing.perStudentAllIn, pricing.currency)}
                strong
              />
            </div>
            <div className="mt-4 text-xs text-neutral-600">
              Notes: Prices are editable in the Admin panel. All totals update
              instantly as you change values.
            </div>
          </Card>
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

              <hr className="my-4" />
              <div>
                <div className="mb-2 font-semibold">
                  Custom Line Items (ad-hoc charges/credits)
                </div>
                <CustomItemsEditor
                  items={customItems}
                  setItems={setCustomItems}
                />
              </div>
            </Card>
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-neutral-500">
          Built with React + TypeScript. Replace the mock priceList with your
          own data.
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
