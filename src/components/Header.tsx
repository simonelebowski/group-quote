type HeaderProps = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ editMode, setEditMode }: HeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Group Quote Calculator</h1>
      <div className="flex items-center gap-3 text-sm text-neutral-600">
        <label
          className={[
            "flex items-center gap-2",
            "rounded-2xl border border-neutral-200/80",
            "bg-white/70 px-3 py-2.5",
            "hover:bg-neutral-50",
            "cursor-pointer",
          ].join(" ")}
        >
          <input
            type="checkbox"
            checked={editMode}
            onChange={(e) => setEditMode(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20 cursor-pointer"
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
            Edit prices
          </span>
        </label>
      </div>
    </header>
  );
}
