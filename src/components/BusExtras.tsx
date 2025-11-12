import Card from "./Card"
import QtyInput from "./QtyInput"
import CustomItemsEditor from "./CustomItemEditor"

export default function BusExtras({loc, selectedBusCards, setSelectedBusCards, customItems, setCustomItems, unitLabel, fmt}) {
    return (
        <Card>
            <h2 className="mb-3 text-lg font-semibold">
                      5) Bus Cards & Extras
                    </h2>
                    <div className="space-y-3">
                      {loc.busCards.map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center justify-between gap-3 rounded-xl border p-3"
                        >
                          <div>
                            <div className="font-medium">{b.name}</div>
                            <div className="text-xs text-neutral-600">
                              {unitLabel(b.unit)} · {fmt(b.price, loc.currency)}
                            </div>
                          </div>
                          <QtyInput
                            value={selectedBusCards[b.id] || 0}
                            onChange={(n) =>
                              setSelectedBusCards((prev) => ({ ...prev, [b.id]: n }))
                            }
                          />
                        </div>
                      ))}
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