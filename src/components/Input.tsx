type NumberInputProps = {
  value: number;
  setValue: (value: number) => void;
  clamp: (value: number, min: number, max: number) => number;
  max?: number;
};

export default function Input({
  value,
  setValue,
  clamp,
  max,
}: NumberInputProps) {
  return (
    <input
      type="number"
      className={[
        "block",
        "max-w-full",
        "h-10",
        "rounded-xl",
        "bg-white",
        "dark:bg-neutral-900",
        "border border-neutral-200/70 dark:border-neutral-800",
        "px-3 py-2.5 text-sm",
        "text-right",
        "[appearance:textfield]",
        "[&::-webkit-outer-spin-button]:appearance-none",
        "[&::-webkit-inner-spin-button]:appearance-none",
        "focus:outline-none",
        "focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10",
        "transition-shadow duration-150",
      ].join(" ")}
      min={0}
      max={max ?? 9999}
      value={value}
      onChange={(e) =>
        setValue(clamp(parseInt(e.target.value || "0"), 0, 9999))
      }
    />
  );
}
