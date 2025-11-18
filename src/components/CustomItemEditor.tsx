import { CustomLineItem } from "@/types/types";
import Label from "./Label";

function cryptoRandomId() {
  try {
    return Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return Math.random().toString(36).slice(2, 10);
  }
}

export default function CustomItemsEditor({
  items,
  setItems,
}: {
  items: CustomLineItem[];
  setItems: (i: CustomLineItem[]) => void;
}) {
  const add = () =>
    setItems([
      ...items,
      {
        id: cryptoRandomId(),
        name: "Custom item",
        unit: "perGroup",
        qty: 1,
        price: 0,
      },
    ]);
  const update = (idx: number, patch: Partial<CustomLineItem>) => {
    const next = items.slice();
    next[idx] = { ...next[idx], ...patch } as CustomLineItem;
    setItems(next);
  };
  const remove = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
       {items.map((it, i) => {
    // derive a mode with a sensible default
    const mode: "group" | "quantity" | "flat" =
      it.mode ?? (it.unit === "flat" ? "flat" : "group");

    const handleModeChange = (newMode: "group" | "quantity" | "flat") => {
      // map UI mode to underlying unit/qty
      if (newMode === "flat") {
        update(i, {
          mode: "flat",
          unit: "flat",
          qty: 1,
        });
      } else if (newMode === "group") {
        update(i, {
          mode: "group",
          unit: "perGroup",
          qty: 1,
        });
      } else {
        // "quantity"
        update(i, {
          mode: "quantity",
          unit: "perUnit", 
          qty: it.qty || 1,
        });
      }
    };

    return (
      <div
        key={it.id}
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white/70 px-3 py-3 text-xs md:text-sm"
      >
        {/* Left: name */}
        <div className="flex-1 min-w-[180px]">
          <Label>Name</Label>
          <input
            className="mt-1 block h-10 w-full rounded-xl border border-neutral-200/80 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            value={it.name}
            onChange={(e) => update(i, { name: e.target.value })}
          />
        </div>

        {/* Middle: mode + optional quantity */}
        <div className="flex items-end gap-2">
          <div>
            <Label>Mode</Label>
            <select
              className="mt-1 h-10 rounded-xl border border-neutral-200/80 bg-white px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              value={mode}
              onChange={(e) =>
                handleModeChange(
                  e.target.value as "group" | "quantity" | "flat"
                )
              }
            >
              <option value="group">Whole group</option>
              <option value="quantity">Specific quantity</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          {mode === "quantity" && (
            <div>
              <Label>Qty</Label>
              <input
                className="mt-1 block h-10 w-20 rounded-xl border border-neutral-200/80 bg-white px-3 py-2.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                type="number"
                min={0}
                value={it.qty}
                onChange={(e) =>
                  update(i, { qty: parseFloat(e.target.value || "0") })
                }
              />
            </div>
          )}
        </div>

        {/* Right: price + remove */}
        <div className="flex items-end gap-2">
          <div>
            <Label>Price</Label>
            <input
              className="mt-1 block h-10 w-28 rounded-xl border border-neutral-200/80 bg-white px-3 py-2.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              type="number"
              value={it.price}
              onChange={(e) =>
                update(i, { price: parseFloat(e.target.value || "0") })
              }
            />
          </div>

          <button
            className="mt-1 rounded-2xl border border-neutral-200/80 bg-white/70 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-red-500 hover:bg-neutral-50 cursor-pointer"
            onClick={() => remove(i)}
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    );
  })}
      <button
        className='rounded-2xl border border-neutral-200/80 bg-white/70 px-3 py-2.5 hover:bg-neutral-50 cursor-pointer'
        onClick={add}
        type="button"
      >
        <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
          + Add custom item
        </div>   
      </button>
    </div>
  );
}
