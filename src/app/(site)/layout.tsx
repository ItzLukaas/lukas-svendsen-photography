import { BackgroundMotif } from "@/components/layout/background-motif";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-full min-w-0 max-w-[100vw] flex-col overflow-x-clip bg-paper">
      <BackgroundMotif />
      <div className="relative z-[1] flex min-h-full min-w-0 flex-1 flex-col">
        <SiteHeader />
        <main id="main" className="relative z-[1] min-w-0 flex-1 bg-transparent">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
