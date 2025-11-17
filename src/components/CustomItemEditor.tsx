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
      {items.map((it, i) => (
        <div
          key={it.id}
          className="grid grid-cols-1 gap-2 rounded-xl border p-3 md:grid-cols-5 md:items-end"
        >
          <div>
            <Label>Name</Label>
            <input
              className="input"
              value={it.name}
              onChange={(e) => update(i, { name: e.target.value })}
            />
          </div>
          <div>
            <Label>Unit</Label>
            <select
              className="input"
              value={it.unit}
              onChange={(e) => update(i, { unit: e.target.value as Unit })}
            >
              <option value="perStudent">per student</option>
              <option value="perLeader">per leader</option>
              <option value="perGroup">per group</option>
              <option value="flat">flat</option>
            </select>
          </div>
          <div>
            <Label>Qty</Label>
            <input
              className="input"
              type="number"
              min={0}
              value={it.qty}
              onChange={(e) =>
                update(i, { qty: parseFloat(e.target.value || "0") })
              }
            />
          </div>
          <div>
            <Label>Price</Label>
            <input
              className="input"
              type="number"
              value={it.price}
              onChange={(e) =>
                update(i, { price: parseFloat(e.target.value || "0") })
              }
            />
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-xl border px-3 py-2 text-sm"
              onClick={() => remove(i)}
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
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
