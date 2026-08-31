import type { Project } from "@/lib/data/projects";

import { FredericiaClubUse } from "@/components/work/projects/fredericia-club-use";
import { FredericiaRibeEsbjerg } from "@/components/work/projects/fredericia-ribe-esbjerg";

type ProjectExtraProps = {
  project: Project;
};

export function ProjectExtras({ project }: ProjectExtraProps) {
  if (project.slug === "fredericia-haandboldklub") {
    return (
      <>
        <FredericiaRibeEsbjerg />
        <FredericiaClubUse />
      </>
    );
  }

  return null;
}
