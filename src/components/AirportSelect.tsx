import { TransferOptionId, TransferOption } from "@/types/types";

export default function AirportSelect({
  value,
  onChange,
  options,
}: {
  value: TransferOptionId;
  onChange: (a: TransferOptionId) => void;
  options: TransferOption[];
}) {
  return (
    <select
      className={[
        "block",
        "w-full",
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
      onChange={(e) => onChange(e.target.value as TransferOptionId)}
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  );
}
