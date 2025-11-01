type HeaderProps = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ editMode, setEditMode }: HeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Group Quote Calculator</h1>
      <div className="flex items-center gap-3 text-sm text-neutral-600">
        <span>
          Includes: 20 lessons/week, full board shared room, transfers
          (LGW/LHR), placement test, orientation tour, certificate, 1 free
          leader/15 students.
        </span>
        <label className="flex items-center gap-2 rounded-xl border px-2 py-1 text-xs">
          <input
            type="checkbox"
            checked={editMode}
            onChange={(e) => setEditMode(e.target.checked)}
          />
          Edit prices
        </label>
      </div>
    </header>
  );
}

// export default function Header({ editMode, setEditMode }) {
//   return (
//     <header className="mb-8 rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         {/* Title + sub */}
//         <div>
//           <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
//             Group Quote Calculator
//           </h1>
//           <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
//             Quickly build and adjust group pricing.
//           </p>
//         </div>

//         {/* View / Edit segmented toggle */}
//         <div
//           role="group"
//           aria-label="Mode"
//           className="inline-flex overflow-hidden rounded-xl border bg-neutral-50 text-sm dark:border-neutral-800 dark:bg-neutral-900"
//         >
//           <button
//             type="button"
//             onClick={() => setEditMode(false)}
//             className={[
//               "px-3 py-1.5 transition",
//               !editMode
//                 ? "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white"
//                 : "text-neutral-600 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-neutral-800/60",
//             ].join(" ")}
//             aria-pressed={!editMode}
//           >
//             View
//           </button>
//           <button
//             type="button"
//             onClick={() => setEditMode(true)}
//             className={[
//               "px-3 py-1.5 transition",
//               editMode
//                 ? "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white"
//                 : "text-neutral-600 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-neutral-800/60",
//             ].join(" ")}
//             aria-pressed={editMode}
//           >
//             Edit prices
//           </button>
//         </div>
//       </div>

//       {/* Inclusions as pills */}
//       <div className="mt-4 flex flex-wrap gap-2">
//         {[
//           "20 lessons/week",
//           "Full board · shared room",
//           "Transfers (LGW/LHR)",
//           "Placement test",
//           "Orientation tour",
//           "Certificate",
//           "1 free leader / 15 students",
//         ].map((item) => (
//           <span
//             key={item}
//             className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
//           >
//             {item}
//           </span>
//         ))}
//       </div>
//     </header>
//   );
// }
