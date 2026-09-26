/**
 * Subtle route enter — opacity + slight rise. Fast enough to never feel like a loader.
 */
export default function SiteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-enter">{children}</div>;
}
