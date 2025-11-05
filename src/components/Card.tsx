export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-200 ${className}`}
    >
      {children}
    </div>
  );
}

// Card.tsx
// export default function Card({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <div
//       className={[
//         // measurements unchanged: rounded-2xl, p-4
//         "rounded-2xl p-4",
//         // subtle elevated surface with soft gradient (no size change)
//         "bg-white/90 dark:bg-neutral-900/80",
//         "bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950",
//         // same ring thickness, improved color for dark mode
//         "ring-1 ring-neutral-200/70 dark:ring-neutral-800",
//         // a touch more presence + smoothness
//         "shadow-sm hover:shadow-md transition-shadow duration-200",
//         // optional backdrop polish when on translucent UIs
//         "backdrop-blur-[2px]",
//         className,
//       ].join(" ")}
//     >
//       {children}
//     </div>
//   );
// }
