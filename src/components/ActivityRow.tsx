import { Activity } from "@/types/types";

type ActivityMode = "group" | "quantity";

type ActivitySelection = {
  enabled: boolean;
  mode: ActivityMode;
  count: number;
};

type ActivityRowProps = {
  activity: Activity; // from your types
  currency: string;
  selection: ActivitySelection;
  onChange: (next: ActivitySelection) => void;
};

export default function ActivityRow({
  activity: a,
  currency,
  selection,
  onChange,
}: ActivityRowProps) {
  const sel = selection;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200/70 bg-white/80 p-3">
      {/* Left: checkbox + details */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20"
          checked={sel.enabled}
          onChange={(e) =>
            onChange({
              ...sel,
              enabled: e.target.checked,
            })
          }
        />
        <div>
          <div className="text-sm font-medium">{a.name}</div>
          <div className="text-[11px] text-neutral-600">
            {unitLabel(a.unit)} · {fmt(a.price, currency)}
          </div>
          {a.description && (
            <div className="mt-0.5 text-[11px] text-neutral-500">
              {a.description}
            </div>
          )}
        </div>
      </div>

      {/* Right: mode + qty */}
      <div className="flex items-center gap-2">
        <select
          className="h-9 w-32 rounded-xl border border-neutral-200 bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
          disabled={!sel.enabled}
          value={sel.mode}
          onChange={(e) =>
            onChange({
              ...sel,
              enabled: true,
              mode: e.target.value as ActivityMode,
            })
          }
        >
          <option value="group">Whole group</option>
          <option value="quantity">Specific quantity</option>
        </select>

        {sel.enabled && sel.mode === "quantity" && (
          <input
            type="number"
            min={0}
            placeholder="# people"
            className="h-9 w-24 rounded-xl border border-neutral-200 bg-white px-2 text-right text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            value={sel.count || ""}
            onChange={(e) =>
              onChange({
                ...sel,
                count: Math.max(0, Number(e.target.value) || 0),
              })
            }
          />
        )}
      </div>
    </div>
  );
}
