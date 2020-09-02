import * as fs from "fs-extra";
import * as path from "path";

export interface Config {
  workspaceDir: string;
  exercicesDir: string;
  batchID: string;
  sharedSecret: string;
}

export interface ConfigInput {
  batchID: string;
  sharedSecret: string;
}

export function loadConfig(configDir: string): Config {
  const configPath = path.join(configDir, "config.json");
  fs.ensureFileSync(configPath);

  const writtenConfig: ConfigInput = fs.readJSONSync(configPath);

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
    ...writtenConfig,
    workspaceDir,
    exercicesDir,
  };
}

export function writeConfig(configDir: string, input: ConfigInput): void {
  const configPath = path.join(configDir, "config.json");

  fs.ensureFileSync(configPath);
  fs.writeJsonSync(configPath, input, {
    spaces: 2,
  });
}
