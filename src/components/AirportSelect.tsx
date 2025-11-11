import { AirportCode } from "@/types/types";
import Select from "./Select";

export default function AirportSelect({
  value,
  onChange,
}: {
  value: AirportCode;
  onChange: (a: AirportCode) => void;
}) {
  const opts: { code: AirportCode; name: string }[] = [
    { code: "LGW", name: "Gatwick (LGW)" },
    { code: "LHR", name: "Heathrow (LHR)" },
    { code: "LTN", name: "Luton (LTN)" },
    { code: "STN", name: "Stansted (STN)" },
    { code: "LCY", name: "London City (LCY)" },
    { code: "OTHER", name: "Other" },
  ];
  return (
    // <Select value={value} setValue={onChange} options={opts} />
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
      onChange={(e) => onChange(e.target.value as AirportCode)}
    >
      {opts.map((o) => (
        <option key={o.code} value={o.code}>
          {o.name}
        </option>
      ))}
    </select>
  );
}
