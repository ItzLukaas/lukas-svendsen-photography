import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full min-w-0 max-w-[100vw] flex-col overflow-x-clip">
      <SiteHeader />
      <main id="main" className="min-w-0 flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
