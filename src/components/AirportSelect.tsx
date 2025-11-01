import { AirportCode } from "@/types/types";

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
    { code: "SEN", name: "Southend (SEN)" },
    { code: "OTHER", name: "Other" },
  ];
  return (
    <select
      className="input"
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
