import * as path from "path";
export interface Config {
  workspaceDir: string;
  exercicesDir: string;
}

export default function loadConfig(): Config {
  const homeDir = process.env.HOME;

  if (!homeDir) {
    throw new Error("HOME env variable not set");
  }

  const workspaceDir = path.join(homeDir, "Workspace");
  const exercicesDir = path.join(
    workspaceDir,
    "fewlines-education",
    "exercices",
  );

  return {
    workspaceDir,
    exercicesDir,
  };
}
