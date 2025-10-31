export default function Header({ editMode, setEditMode }) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Group Quote Calculator</h1>
      <div className="flex items-center gap-3 text-sm text-neutral-600">
        <span>
          Includes: 20 lessons/week, full board shared room, transfers
          (LGW/LHR), placement test, orientation tour, certificate, 1 free
          leader/15 students.
        </span>
        <label className="flex items-center gap-2 rounded-xl border px-2 py-1 text-xs">
          <input
            type="checkbox"
            checked={editMode}
            onChange={(e) => setEditMode(e.target.checked)}
          />
          Edit prices
        </label>
      </div>
    </header>
  );
}
