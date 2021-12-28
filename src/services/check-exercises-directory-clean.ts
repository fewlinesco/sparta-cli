import * as fs from "fs-extra";
import simpleGit from "simple-git";

import { Config } from "../config/config";
import { SpartaError } from "./errors/sparta-error";

class ExercisesDirectoryNotCleanError extends SpartaError {
  constructor() {
    const name = "ExercisesDirectoryNotCleanError";
    const message = "Exercises directory is not in a clean state.";
    const suggestions = [
      "Make sure the Git state of your exercises directory is clean.",
    ];

    super(name, message, suggestions);
  }
}

class ExercisesDirectoryMissingError extends SpartaError {
  constructor() {
    const name = "ExercisesDirectoryMissingError";
    const message = "Exercises directory is missing.";
    const suggestions = ['Make sure you ran the "sparta init" command first.'];

    super(name, message, suggestions);
  }
}

async function checkExercisesDirectoryClean({
  exercisesDir,
}: Config): Promise<void> {
  if (!fs.existsSync(exercisesDir)) {
    throw new ExercisesDirectoryMissingError();
  }

  const git = simpleGit(exercisesDir);
  const status = await git.status();

  if (!status.isClean()) {
    throw new ExercisesDirectoryNotCleanError();
  }
}

export default checkExercisesDirectoryClean;
export { ExercisesDirectoryNotCleanError, ExercisesDirectoryMissingError };
