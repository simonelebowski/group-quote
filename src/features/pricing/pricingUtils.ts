// FOR NOW I'M NOT SPLITTING THE MAIN FUNCTION

import {
  LocationPricing,
  PackageKey,
  LocationOverride,
  TransferOptionId,
  SelectedActivities,
  ActivitiesPricing,
  SelectedBusCards, 
  BusCardsPricing,
  CustomLineItem,
  CustomItemsPricing,
} from "@/types/types";

export function getEffectiveRates(
  loc: LocationPricing,
  packageKey: PackageKey,
  ov: LocationOverride | undefined
) {
  const o = ov ?? {};

  const basePerStudent =
    o.basePackages?.[packageKey] ?? loc.basePackages[packageKey];

  const perExtraNight = o.perExtraNight ?? loc.perExtraNight;
  const perFewerNight = o.perFewerNight ?? loc.perFewerNight;
  const perExtraLesson = o.perExtraLesson ?? loc.perExtraLesson;
  const perFewerLesson = o.perFewerLesson ?? loc.perFewerLesson;

  return {
    basePerStudent,
    perExtraNight,
    perFewerNight,
    perExtraLesson,
    perFewerLesson,
  };
}

export function computeNightAdjustment(
  nights: number,
  baseNights: number,
  perExtraNight: number,
  perFewerNight: number
) {
  const nightDelta = nights - baseNights;

  if (nightDelta === 0) {
    return { nightDelta, nightAdjPerStudent: 0 };
  }

  const nightAdjPerStudent =
    nightDelta > 0
      ? nightDelta * perExtraNight
      : Math.abs(nightDelta) * perFewerNight;

  return { nightDelta, nightAdjPerStudent };
}

export function computeAccommodationAdjustment(
  loc: LocationPricing,
  packageKey: PackageKey,
  students: number,
  leaders: number,
  studentAccommodationId: string | null,
  leaderAccommodationId: string | null
): number {
  // 6/7 nights → 1 “unit”, 13/14 nights → 2 “units”
  const packageWeeks = packageKey === "6n7d" || packageKey === "7n8d" ? 1 : 2;

  // find selected options; fall back to first option if something is missing
  const studentOpt =
    loc.accommodationStudents.find((a) => a.id === studentAccommodationId) ??
    loc.accommodationStudents[0];

  const leaderOpt =
    loc.accommodationLeaders.find((a) => a.id === leaderAccommodationId) ??
    loc.accommodationLeaders[0];

  const studentPerHead = studentOpt?.price ?? 0;
  const leaderPerHead = leaderOpt?.price ?? 0;

  // price is “per head for a short package”; multiply by packageWeeks
  const studentAdj = studentPerHead * packageWeeks * students;
  const leaderAdj = leaderPerHead * packageWeeks * leaders; // or payingLeaders if you prefer

  return studentAdj + leaderAdj; // can be negative or positive
}

export function getTransferTotal(
  loc: LocationPricing,
  arrivalId: TransferOptionId,
  departureId: TransferOptionId,
  students: number,
  leaders: number
): {total: number; arrivalTotal: number; departureTotal: number} {
  const findPrice = (id: string): number => {
    const opt = loc.transfer.options.find((o) => o.id === id);
    return opt?.price ?? 0;
  };

  const arrivalPrice = findPrice(arrivalId);
  const departurePrice = findPrice(departureId);

  const arrivalTotal = arrivalPrice * (students + leaders);
  const departureTotal = departurePrice * (students + leaders);

  // price is per person, per direction
  return {
    total: arrivalTotal + departureTotal,
    arrivalTotal,
    departureTotal
  }
}

// ACTIVITIES--------------------------------------------------------------------------------------------------------------------
export function calculateActivitiesPricing(
  loc: LocationPricing,
  selectedActivities: SelectedActivities,
  ov: { activities?: Record<string, number>},
  students: number,
  leaders: number,
): ActivitiesPricing {
  let activitiesTotal = 0;
  const activitiesBreakdown: { label: string; total: number }[] = [];

  if (!selectedActivities) {
    return { activitiesTotal, activitiesBreakdown };
  }

  Object.entries(selectedActivities).forEach(([id, sel]) => {
    if (!sel || !sel.enabled) return;

    const act = loc.activities.find((a) => a.id === id);
    if (!act) return;

    const price = ov.activities?.[id] ?? act.price;

    let subtotal = 0;
    let labelDetail = "";

    switch (act.unit) {
      case "perGroup":
      case "flat": {
        subtotal = price;
        labelDetail = "(whole group)";
        break;
      }

      case "perStudent": {
        const people =
          sel.mode === "quantity"
            ? Math.min(Math.max(sel.count || 0, 0), students)
            : students;
        subtotal = price * people;
        labelDetail =
          sel.mode === "quantity"
            ? `(${people} students)`
            : "(all students)";
        break;
      }

      case "perLeader": {
        const people =
          sel.mode === "quantity"
            ? Math.min(Math.max(sel.count || 0, 0), leaders)
            : leaders;
        subtotal = price * people;
        labelDetail =
          sel.mode === "quantity"
            ? `(${people} leaders)`
            : "(all leaders)";
        break;
      }

      case "perPerson": {
        const maxGroup = students + leaders;
        const people =
          sel.mode === "quantity"
            ? Math.min(Math.max(sel.count || 0, 0), maxGroup)
            : maxGroup;
        subtotal = price * people;
        labelDetail =
          sel.mode === "quantity"
            ? `(${people} people)`
            : "(whole group headcount)";
        break;
      }

      default: {
        subtotal = price;
        labelDetail = "";
      }
    }

    activitiesTotal += subtotal;
    activitiesBreakdown.push({
      label: `${act.name} ${labelDetail}`.trim(),
      total: subtotal,
    });
  });

  return { activitiesTotal, activitiesBreakdown };
}

// BUS CARDS--------------------------------------------------------------------------------------------------------------------
export function calculateBusCardsPricing(
  loc: LocationPricing,
  selectedBusCards: SelectedBusCards | undefined,
  ov: LocationOverride | {},
  students: number,
  leaders: number
): BusCardsPricing {
  let busCardsTotal = 0;
  const busBreakdown: { label: string; total: number }[] = [];

  if (!selectedBusCards) {
    return { busCardsTotal, busBreakdown };
  }

  Object.entries(selectedBusCards).forEach(([id, sel]) => {
    if (!sel || !sel.enabled) return;

    const card = loc.busCards.find((b) => b.id === id);
    if (!card) return;

    const price = ov.busCards?.[id] ?? card.price;

    let qty = 0;
    let labelDetail = "";

    switch (card.unit) {
      case "perStudent": {
        const max = students;
        qty =
          sel.mode === "quantity"
            ? Math.min(Math.max(sel.count || 0, 0), max)
            : max;
        labelDetail =
          sel.mode === "quantity"
            ? `(${qty} students)`
            : `(all ${students} students)`;
        break;
      }

      case "perLeader": {
        const max = leaders;
        qty =
          sel.mode === "quantity"
            ? Math.min(Math.max(sel.count || 0, 0), max)
            : max;
        labelDetail =
          sel.mode === "quantity"
            ? `(${qty} leaders)`
            : `(all ${leaders} leaders)`;
        break;
      }

      case "perPerson": {
        const max = students + leaders;
        qty =
          sel.mode === "quantity"
            ? Math.min(Math.max(sel.count || 0, 0), max)
            : max;
        labelDetail =
          sel.mode === "quantity"
            ? `(${qty} people)`
            : "(whole group headcount)";
        break;
      }

      case "perGroup":
      case "flat":
      case "perUnit":
      default: {
        // treat as price per group/unit
        qty = sel.mode === "quantity" ? Math.max(sel.count || 0, 0) : 1;
        labelDetail =
          sel.mode === "quantity" && qty > 1 ? `(x${qty})` : "(per group)";
        break;
      }
    }

    const subtotal = price * qty;
    busCardsTotal += subtotal;
    busBreakdown.push({
      label: `${card.name} ${labelDetail}`.trim(),
      total: subtotal,
    });
  });

  return { busCardsTotal, busBreakdown };
}

// CUSTOM ITEMS---------------------------------------------------------------------------------------------------------------------
export function calculateCustomItemsPricing(
  customItems: CustomLineItem[],
  students: number,
  leaders: number
): CustomItemsPricing {
  let customTotal = 0;
  const customBreakdown: { label: string; total: number }[] = [];

  const groupSize = students + leaders;

  customItems.forEach((item) => {
    if (!item.qty || item.qty <= 0) return;

    let subtotal = 0;

    if (item.unit === "perStudent") {
      subtotal = item.price * item.qty * students;
    } else if (item.unit === "perLeader") {
      subtotal = item.price * item.qty * leaders;
    } else if (item.unit === "perGroup") {
      subtotal = item.price * groupSize;
    } else if (item.unit === "flat") {
      subtotal = item.price;
    } else if (item.unit === "perUnit") {
      subtotal = item.price * item.qty;
    } else {
      // perUnit, flat
      subtotal = item.price * item.qty;
    }

    customTotal += subtotal;
    customBreakdown.push({
      label: `${item.name} x${item.qty}`,
      total: subtotal,
    });
  });

  return { customTotal, customBreakdown };
}