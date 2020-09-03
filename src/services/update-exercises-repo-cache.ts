import * as fs from "fs-extra";
import * as path from "path";
import simpleGit, { SimpleGit } from "simple-git";

export interface UpdateExercisesRepoCacheOptions {
  delete?: boolean;
}

export default async function updateExercisesRepoCache(
  configDir: string,
  options: UpdateExercisesRepoCacheOptions = {},
): Promise<void> {
  const githubRepo =
    "git@github.com:fewlines-education/dev-bootcamp-exercises.git";
  const exercicesDir = path.join(configDir, "exercises");
  let git: SimpleGit;

  if (options.delete) {
    fs.removeSync(exercicesDir);
  }

  if (fs.existsSync(exercicesDir)) {
    git = simpleGit(exercicesDir);
    await git.pull(githubRepo);
  } else {
    git = simpleGit();
    await git.clone(githubRepo, exercicesDir);
  }
}
