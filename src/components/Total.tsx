import Card from "./Card";
import Row from "./Row";

type TotalProps = {
  fmt: (value: number | null, currency: string) => string;
  pricing: any; // ideally your PricingResult type
};

export default function Total({ fmt, pricing }: TotalProps) {
  const totalExtras =
    pricing.meta?.transferTotal +
    pricing?.activitiesTotal +
    pricing?.busCardsTotal +
    pricing?.customTotal;

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

        <hr className="my-3" />

        {/* <Row
                    label="All-in per student"
                    value={fmt(pricing.perStudentAllIn, pricing.currency)}
                    strong
                /> */}
        <Row
          label="Core per student"
          value={fmt(pricing.perStudentCore, pricing.currency)}
          strong
        />
        <Row
          label="Core per leader"
          value={fmt(pricing.perLeaderCore, pricing.currency)}
          strong
        />
        <Row
          label="Extras (activities, travel cards, etc.)"
          value={fmt(totalExtras, pricing.currency)}
          strong
        />
      </div>
      <div className="mt-4 text-xs text-neutral-600">
        Notes: Prices are editable in the Admin panel. All totals update
        instantly as you change values.
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-2xl border border-neutral-200/80 bg-white/70 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 hover:bg-neutral-50 cursor-pointer"
          //   onClick={() => downloadWord(quoteData)}
        >
          Download Word
        </button>

        <button
          type="button"
          className="rounded-2xl border border-neutral-200/80 bg-white/70 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 hover:bg-neutral-50 cursor-pointer"
          //   onClick={() => downloadPdf(quoteData)}
        >
          Download PDF
        </button>
      </div>
    </Card>
  );
}
