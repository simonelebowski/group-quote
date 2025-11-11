import { Activity } from "@/types/types";

type ActivityPick = {
  enabled: boolean;
  qty?: number;
};

type SelectedActivities = Record<string, ActivityPick | undefined>;

type Props = {
  title: string;
  categoryKey: string; // e.g. "afternoon"
  isOpen: boolean;
  onToggle: () => void;
  activities: Activity[];
  selected: SelectedActivities;
  onToggleActivity: (id: string, enabled: boolean) => void;
  onQtyChange: (id: string, qty: number) => void;
};

export function ActivityCategorySection({
  title,
  categoryKey,
  isOpen,
  onToggle,
  activities,
  selected,
  onToggleActivity,
  onQtyChange,
}: Props) {
  if (!activities.length) return null;

  return (
    <div
      className="border border-neutral-200/80 rounded-2xl bg-white/70"
      data-category={categoryKey}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left"
      >
        <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
          {title}
        </div>
        <span className="text-[10px] text-neutral-500">
          {isOpen ? "Hide" : "Show"} ({activities.length})
        </span>
      </button>

      {isOpen && (
        <div className="divide-y divide-neutral-100">
          {activities.map((act) => {
            const sel = selected[act.id];
            const enabled = !!sel?.enabled;

            return (
              <label
                key={act.id}
                className="flex items-center justify-between gap-3 px-3 py-2 text-xs md:text-sm hover:bg-neutral-50"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) =>
                      onToggleActivity(act.id, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20"
                  />
                  <span className="font-medium">{act.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 whitespace-nowrap">
                    £{act.price}
                    {act.unit === "perPerson" && (
                      <span className="text-[10px]"> /pp</span>
                    )}
                  </span>

                  {enabled && (
                    <input
                      type="number"
                      min={1}
                      className="w-14 rounded-lg border border-neutral-200 bg-white px-2 py-1 text-right text-[10px] focus:outline-none focus:ring-1 focus:ring-neutral-900/15"
                      value={sel?.qty ?? 1}
                      onChange={(e) =>
                        onQtyChange(
                          act.id,
                          Math.max(
                            1,
                            parseInt(e.target.value || "1", 10)
                          )
                        )
                      }
                    />
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
