export default function Select({ value, setValue, options }) {
  return (
    <select
      // className={[
      //   // "!w-36 md:!w-36 max-w-full",
      //   "rounded-xl bg-white dark:bg-neutral-900",
      //   "ring-1 ring-neutral-200/70 dark:ring-neutral-800",
      //   "px-3 py-2 pr-9 text-sm",
      //   "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
      //   "transition-shadow duration-150",
      //   "cursor-pointer",
      // ].join(" ")}
      className={[
        "block",
        "w-full",
        "h-10",
        "rounded-xl",
        "bg-white",
        "dark:bg-neutral-900",
        "border border-neutral-200/70 dark:border-neutral-800",
        "px-3 py-2.5 pr-8 text-sm",
        "box-border",
        "cursor-pointer",
        "focus:outline-none",
        "focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
        "transition-shadow duration-150",
        "[&::-ms-expand]:hidden",
      ].join(" ")}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((l) => (
        <option key={l.locationId} value={l.locationId}>
          {l.locationName}
        </option>
      ))}
    </select>
  );
}
