import Card from "./Card"
import Row from "./Row"

export default function Total({fmt, pricing}) {
    return (
        <Card>
            <h2 className="mb-3 text-lg font-semibold">Totals</h2>
            <div className="space-y-2 text-sm">
                <Row
                    label="Grand total"
                    // value={fmt(pricing.grandTotal, pricing.currency)}
                    value={fmt(pricing.grandTotal, pricing.currency)}
                    strong
                />
                <Row
                    label="All-in per student"
                    value={fmt(pricing.perStudentAllIn, pricing.currency)}
                    strong
                />
            </div>
            <div className="mt-4 text-xs text-neutral-600">
                Notes: Prices are editable in the Admin panel. All totals update
                instantly as you change values.
            </div>
        </Card>
    )
}