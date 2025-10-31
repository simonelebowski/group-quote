export default function QtyInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded-xl border px-2 py-1 text-sm hover:bg-neutral-50"
        onClick={() => onChange(Math.max(0, (value || 0) - 1))}
        type="button"
      >
        −
      </button>
      <input
        type="number"
        min={0}
        value={value || 0}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value || "0")))}
        className="w-16 rounded-xl border px-2 py-1 text-center text-sm"
      />
      <button
        className="rounded-xl border px-2 py-1 text-sm hover:bg-neutral-50"
        onClick={() => onChange((value || 0) + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}
