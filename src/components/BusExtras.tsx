import Card from "./Card"
import CustomItemsEditor from "./CustomItemEditor"
import { BusSelection } from "@/types/types"

export default function BusExtras({loc, selectedBusCards, setSelectedBusCards, customItems, setCustomItems, unitLabel, fmt}) {
    return (
<Card>
      <h2 className="mb-3 text-lg font-semibold">5) Bus Cards & Extras</h2>

      <div className="space-y-2">
        {loc.busCards.map((b) => {
          const sel: BusSelection =
            selectedBusCards[b.id] ?? {
              enabled: false,
              mode: "group",
              count: 0,
            };

          return (
            <label
              key={b.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 px-3 py-2 text-xs md:text-sm cursor-pointer"
            >
              {/* Left: checkbox + details */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20"
                  checked={sel.enabled}
                  onChange={(e) =>
                    setSelectedBusCards((prev) => ({
                      ...prev,
                      [b.id]: {
                        ...(prev[b.id] ?? { mode: "group", count: 0 }),
                        enabled: e.target.checked,
                      },
                    }))
                  }
                />
                <div>
                  <div className="font-medium">{b.name}</div>
                  <div className="text-[11px] text-neutral-600">
                    {unitLabel(b.unit)} · {fmt(b.price, loc.currency)}
                  </div>
                  {b.description && (
                    <div className="mt-0.5 text-[11px] text-neutral-500">
                      {b.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: mode + qty (your pattern) */}
              <div className="flex items-center gap-2">
                <select
                  className="h-9 w-36 rounded-xl border border-neutral-200 bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                  disabled={!sel.enabled}
                  value={sel.mode}
                  onChange={(e) =>
                    setSelectedBusCards((prev) => ({
                      ...prev,
                      [b.id]: {
                        ...(prev[b.id] ?? { enabled: true, count: 0 }),
                        mode: e.target.value as "group" | "quantity",
                      },
                    }))
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
                    value={sel.count}
                    onChange={(e) =>
                      setSelectedBusCards((prev) => ({
                        ...prev,
                        [b.id]: {
                          ...(prev[b.id] ?? {
                            enabled: true,
                            mode: "quantity",
                          }),
                          count: Math.max(0, Number(e.target.value) || 0),
                        },
                      }))
                    }
                  />
                )}
              </div>
            </label>
          );
        })}
      </div>

      <hr className="my-4" />

      <div>
        <div className="mb-2 font-medium">Extras (ad-hoc)</div>
        <p className="mb-2 text-xs text-neutral-600">
          Add charges or credits not covered above (e.g., single room
          supplement, private guide, visa letter fee, discount). Choose
          unit, quantity, and price.
        </p>
        <CustomItemsEditor
          items={customItems}
          setItems={setCustomItems}
        />
      </div>

    </Card>
    )
}