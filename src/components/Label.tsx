export default function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-1 text-xs font-medium uppercase tracking-wide text-neutral-600 ${className}`}
    >
      {children}
    </div>
  );
}
