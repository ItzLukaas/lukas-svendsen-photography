/**
 * Global background line motif — thin stroked paths only.
 * Principle: pencil contour lines on paper, then made almost invisible.
 * No fills, blobs, gradients, or wide ribbons.
 */
export function BackgroundMotif() {
  // Announcement bar stone (#ebe9e4) — near paper, almost invisible
  const stroke = "#ebe9e4";

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 min-h-full overflow-hidden"
      aria-hidden
      data-motif="background-lines"
    >
      <svg
        className="absolute top-0 left-0 block h-full w-full min-w-full"
        viewBox="0 0 1440 5200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin slice"
        style={{ minHeight: "100%" }}
      >
        {/* Sparse editorial contours — stroked only, never filled */}
        <path
          d="M-80 360C180 120 420 520 720 340C980 180 1180 40 1480 220"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.09"
        />
        <path
          d="M1520 980C1240 780 960 1020 680 1180C360 1380 80 1260 -120 980"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.08"
        />
        <path
          d="M-60 1880C240 1620 560 1980 900 1760C1180 1600 1360 1380 1600 1580"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.09"
        />
        <path
          d="M1580 2680C1280 2460 980 2760 660 2940C320 3160 40 2980 -100 2640"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.07"
        />
        <path
          d="M-40 3480C260 3200 600 3580 960 3360C1240 3200 1420 2940 1680 3180"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.08"
        />
        <path
          d="M1620 4280C1320 4040 1000 4360 660 4560C300 4780 20 4580 -120 4200"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.07"
        />
      </svg>
    </div>
  );
}
