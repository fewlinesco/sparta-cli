import * as fs from "fs-extra";
import * as path from "path";

import { SpartaError } from "../services/errors/sparta-error";

export class ConfigFileError extends SpartaError {
  constructor() {
    const name = "ConfigFileError";
    const message = `Config file not initialized`;
    const suggestions = [`Make sure you ran the 'sparta init' command first`];

    super(name, message, suggestions);
  }
}

export interface Config {
  batchID: string;
  exercisesCacheDir: string;
  exercisesDir: string;
  sharedSecret: string;
  spartaURL: string;
  userID: string;
  workspaceDir: string;
}

export interface ConfigInput {
  batchID: string;
  userID: string;
  sharedSecret: string;
  spartaURL: string;
}

export function loadConfig(configDir: string): Config {
  const configPath = path.join(configDir, "config.json");
  fs.ensureFileSync(configPath);

  let writtenConfig: ConfigInput;
  try {
    writtenConfig = fs.readJSONSync(configPath);
  } catch {
    throw new ConfigFileError();
  }

  const homeDir = process.env.HOME;

  if (!homeDir) {
    throw new Error("HOME env variable not set");
  }

  const workspaceDir = path.join(homeDir, "Workspace");
  const exercisesDir = path.join(
    workspaceDir,
    "fewlines-education",
    "exercises",
  );
  const exercisesCacheDir = path.join(configDir, "exercises");

  return {
    ...writtenConfig,
    workspaceDir,
    exercisesDir,
    exercisesCacheDir,
  };
}

export function writeConfig(configDir: string, input: ConfigInput): void {
  const configPath = path.join(configDir, "config.json");

  fs.ensureFileSync(configPath);
  fs.writeJsonSync(configPath, input, {
    spaces: 2,
  });
}
