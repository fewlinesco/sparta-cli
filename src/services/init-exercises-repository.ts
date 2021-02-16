import * as fs from "fs-extra";
import simpleGit, { SimpleGit, SimpleGitOptions } from "simple-git";

import { Config } from "../config/config";
import { SpartaError } from "./errors/sparta-error";

export class ExercisesDirectoryExistsError extends SpartaError {
  constructor(directory: string) {
    const name = "ExercisesDirectoryExistsError";
    const message = "Exercises directory already exists";
    const suggestions = [
      `Delete the ${directory} directory if you want to start over`,
      `Rename the ${directory} directory (e.g. ${directory}-backup) if you want to keep your progress`,
    ];

    super(name, message, suggestions);
  }
}

export default async function initExercicesRepository(
  config: Config,
  force = false,
): Promise<void> {
  const directory = config.exercisesDir;

  if (fs.existsSync(directory) && !force) {
    throw new ExercisesDirectoryExistsError(directory);
  } else if (force) {
    fs.removeSync(directory);
  }

  fs.ensureDirSync(directory);

  const gitOptions: SimpleGitOptions = {
    baseDir: directory,
    binary: "git",
    maxConcurrentProcesses: 6,
  };

  const git: SimpleGit = simpleGit(gitOptions);
  await git.init();
}
