type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  setValue: (value: string) => void;
  options: Option[];
  className?: string;
};

export default function Select({
  value,
  setValue,
  options,
  className = "",
}: SelectProps) {
  return (
    <select
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
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
