import Card from "./Card"
import Row from "./Row"
import { Currency, PackageKey } from "@/types/types";

const fmt = (n: number, currency: Currency) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);

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

export default function Summary({loc, students, leaders, freeLeaders, packageKey, baseNights, nights, pricing, studentAccTotal, studentAcc, leaderAccTotal, leaderAcc}) {
    return (
//          <Card className="md:col-span-2">
//   <h2 className="mb-3 text-lg font-semibold">Breakdown</h2>
//   <div className="space-y-2 text-sm">
//     {/* 1. Group & package */}
//     <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
//       Group & Package
//     </div>
//     <Row label="Location" value={loc.locationName} />
//     <Row label="Students" value={String(students)} />
//     <Row
//       label="Leaders (free/paying)"
//       value={`${leaders} (${Math.min(
//         leaders,
//         freeLeaders
//       )}/${Math.max(0, leaders - freeLeaders)})`}
//     />
//     <Row label="Package" value={pkgLabel(packageKey)} />
//     <Row
//       label="Nights (base → actual)"
//       value={`${baseNights} → ${nights}`}
//     />
//     <Row label="Total lessons" value={`${pricing.meta.totalLessons}`} />

//     {pricing.meta.lessonDelta !== 0 && (
//       <Row
//         label={`Lesson adjustment per student (${
//           pricing.meta.lessonDelta > 0 ? "+" : "-"
//         }${Math.abs(pricing.meta.lessonDelta)} lesson${
//           Math.abs(pricing.meta.lessonDelta) !== 1 ? "s" : ""
//         })`}
//         value={fmt(
//           pricing.meta.lessonAdjPerStudent,
//           pricing.currency
//         )}
//       />
//     )}

//     <hr className="my-3" />

//     {/* 2. Core per-student logic */}
//     <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
//       Core per student
//     </div>
//     <Row
//       label="Base per student"
//       value={fmt(pricing.meta.basePerStudent, pricing.currency)}
//     />
//     {pricing.meta.nightDelta !== 0 && (
//       <Row
//         label={`Night adjustment per student (${
//           pricing.meta.nightDelta > 0 ? "+" : "-"
//         }${Math.abs(pricing.meta.nightDelta)} night${
//           Math.abs(pricing.meta.nightDelta) !== 1 ? "s" : ""
//         })`}
//         value={fmt(
//           pricing.meta.nightAdjPerStudent,
//           pricing.currency
//         )}
//       />
//     )}

//     <Row
//       label="Core × (students + paying leaders)"
//       value={`${students + pricing.payingLeaders} × ${fmt(
//         pricing.perStudentCore,
//         pricing.currency
//       )}`}
//     />
//     <Row
//       label="Core subtotal"
//       value={fmt(
//         pricing.coreStudentsAndPayingLeadersTotal,
//         pricing.currency
//       )}
//     />

//     <hr className="my-3" />

//     {/* 3. Add-ons */}
//     <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
//       Add-ons
//     </div>

//     {/* Accommodation */}
//     {studentAccTotal !== 0 && studentAcc && (
//       <Row
//         label={`${studentAcc.name} × ${students}`}
//         value={fmt(studentAccTotal, pricing.currency)}
//       />
//     )}
//     {leaderAccTotal !== 0 && leaderAcc && (
//       <Row
//         label={`${leaderAcc.name} × ${leaders}`}
//         value={fmt(leaderAccTotal, pricing.currency)}
//       />
//     )}

//     {/* Transfers */}
//     {pricing.meta.transferTotal !== 0 && (
//       <Row
//         label="Transfer subtotal"
//         value={fmt(
//           pricing.meta.transferTotal,
//           pricing.currency
//         )}
//       />
//     )}

//     {/* Activities */}
//     {pricing.activitiesBreakdown.length > 0 && (
//       <div className="mt-2">
//         <div className="mb-1 font-medium">Activities</div>
//         <div className="space-y-1">
//           {pricing.activitiesBreakdown.map((b) => (
//             <Row
//               key={b.label}
//               label={`• ${b.label}`}
//               value={fmt(b.total, pricing.currency)}
//             />
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Bus Cards */}
//     {pricing.busBreakdown.length > 0 && (
//       <div className="mt-2">
//         <div className="mb-1 font-medium">Bus Cards</div>
//         <div className="space-y-1">
//           {pricing.busBreakdown.map((b) => (
//             <Row
//               key={b.label}
//               label={`• ${b.label}`}
//               value={fmt(b.total, pricing.currency)}
//             />
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Custom items */}
//     {pricing.customBreakdown &&
//       pricing.customBreakdown.length > 0 && (
//         <div className="mt-2">
//           <div className="mb-1 font-medium">Custom Items</div>
//           <div className="space-y-1">
//             {pricing.customBreakdown.map((b) => (
//               <Row
//                 key={b.label}
//                 label={`• ${b.label}`}
//                 value={fmt(b.total, pricing.currency)}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//   </div>
// </Card>


<Card className="md:col-span-2">
  <h2 className="mb-3 text-lg font-semibold">Breakdown</h2>
  <div className="space-y-2 text-sm">
    {/* 1. Group & package */}
    <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
      Group & Package
    </div>

    <Row label="Location" value={loc.locationName} />
    <Row label="Students" value={String(students)} />

    {/* leaders: total / free / paying */}
    <Row
      label="Leaders (total / free / paying)"
      value={`${leaders} / ${freeLeaders} / ${Math.max(
        0,
        leaders - freeLeaders
      )}`}
    />

    <Row label="Package" value={pkgLabel(packageKey)} />
    <Row
      label="Nights (base → actual)"
      value={`${baseNights} → ${nights}`}
    />
    <Row label="Total lessons" value={`${pricing.meta.totalLessons}`} />

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

    <hr className="my-3" />

    {/* 2. Core per-head logic */}
    <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
      Core package (teaching + nights)
    </div>

    {/* Base per student/charged leader */}
    <Row
      label="Base per student / paying leader"
      value={fmt(pricing.meta.basePerStudent, pricing.currency)}
    />

    {pricing.meta.nightDelta !== 0 && (
      <Row
        label={`Night adjustment per head (${
          pricing.meta.nightDelta > 0 ? "+" : "-"
        }${Math.abs(pricing.meta.nightDelta)} night${
          Math.abs(pricing.meta.nightDelta) !== 1 ? "s" : ""
        })`}
        value={fmt(
          pricing.meta.nightAdjPerStudent,
          pricing.currency
        )}
      />
    )}

    <Row
      label="Core × (students + paying leaders)"
      value={`${students + pricing.payingLeaders} × ${fmt(
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

    <hr className="my-3" />

    {/* 3. Accommodation (different prices for students vs leaders) */}
    <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
      Accommodation
    </div>

    {studentAcc && (
      <Row
        label={`${studentAcc.name} (per student)`}
        value={fmt(studentAcc.price, pricing.currency)}
      />
    )}
    {studentAccTotal !== 0 && studentAcc && (
      <Row
        label={`${studentAcc.name} × ${students}`}
        value={fmt(studentAccTotal, pricing.currency)}
      />
    )}

    {leaderAcc && (
      <Row
        label={`${leaderAcc.name} (per leader)`}
        value={fmt(leaderAcc.price, pricing.currency)}
      />
    )}
    {leaderAccTotal !== 0 && leaderAcc && (
      <Row
        label={`${leaderAcc.name} × ${leaders}`}
        value={fmt(leaderAccTotal, pricing.currency)}
      />
    )}

    {/* small note about free leaders */}
    <Row
      label="Free leaders"
      value="Don't pay the core package, but do pay activities, bus cards and custom extras."
    />

    <hr className="my-3" />

    {/* 4. Transfers & extras (charged for all heads, incl. free leaders) */}
    <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
      Transfers & Extras
    </div>

    {pricing.meta.transferTotal !== 0 && (
      <Row
        label="Transfer subtotal"
        value={fmt(
          pricing.meta.transferTotal,
          pricing.currency
        )}
      />
    )}

    {/* Activities */}
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

    {/* Bus cards */}
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

    {/* Custom items */}
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


    )
}