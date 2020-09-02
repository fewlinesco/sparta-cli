import * as fs from "fs-extra";
import * as path from "path";
import simpleGit, { SimpleGit } from "simple-git";

export interface UpdateExercisesRepoCacheOptions {
  delete?: boolean;
}

export default async function updateExercisesRepoCache(
  configDir: string,
  options: UpdateExercisesRepoCacheOptions,
): Promise<void> {
  const exercicesDir = path.join(configDir, "exercises");
  const git: SimpleGit = simpleGit();

  if (options.delete) {
    fs.removeSync(exercicesDir);
  }

  await git.clone(
    "git@github.com:fewlines-education/dev-bootcamp-exercises.git",
    exercicesDir,
  );
}
