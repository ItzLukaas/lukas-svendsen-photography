import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = ".tmp-alt-review";
const photos = [
  { id: "1", file: "handbold/DSC01650.jpg" },
  { id: "2", file: "andet/DSC04763.jpg" },
  { id: "3", file: "handbold/DSC01659-5.jpg" },
  { id: "4", file: "andet/DSC04919.jpg" },
  { id: "5", file: "handbold/DSC01984.jpg" },
  { id: "6", file: "andet/DSC05088.jpg" },
  { id: "7", file: "handbold/DSC01996.jpg" },
  { id: "8", file: "andet/DSC05100.jpg" },
  { id: "9", file: "handbold/DSC02040.jpg" },
  { id: "10", file: "andet/DSC05265.jpg" },
  { id: "11", file: "handbold/DSC02281.jpg" },
  { id: "12", file: "andet/DSC05317.jpg" },
  { id: "13", file: "handbold/DSC02498.jpg" },
  { id: "14", file: "andet/DSC05363.jpg" },
  { id: "15", file: "handbold/DSC02512-2.jpg" },
  { id: "16", file: "andet/DSC05387.jpg" },
  { id: "17", file: "handbold/DSC02513-2.jpg" },
  { id: "18", file: "andet/DSC05489.jpg" },
  { id: "19", file: "handbold/DSC02547.jpg" },
  { id: "20", file: "andet/DSC05616.jpg" },
  { id: "21", file: "handbold/DSC03176.jpg" },
  { id: "22", file: "andet/DSC05627.jpg" },
  { id: "23", file: "handbold/DSC03531.jpg" },
  { id: "24", file: "andet/DSC05685.jpg" },
  { id: "25", file: "handbold/DSC04153.jpg" },
  { id: "26", file: "andet/DSC05724.jpg" },
  { id: "27", file: "handbold/DSC04213.jpg" },
  { id: "28", file: "andet/DSC05727.jpg" },
  { id: "29", file: "handbold/DSC04314.jpg" },
  { id: "30", file: "andet/DSC05783.jpg" },
];

fs.mkdirSync(outDir, { recursive: true });

for (const photo of photos) {
  const input = path.join("public/images/portfolio", photo.file);
  const output = path.join(outDir, `${photo.id}.jpg`);
  await sharp(input)
    .resize(900, 600, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 75 })
    .toFile(output);
  console.log(`Wrote ${output}`);
}
