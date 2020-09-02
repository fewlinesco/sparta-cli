import * as fs from "fs-extra";
import * as path from "path";
import simpleGit, { SimpleGit } from "simple-git";

export interface UpdateExercisesRepoCacheInput {
  configDir: string;
  options?: {
    delete?: boolean;
  };
}

export default async function updateExercisesRepoCache({
  configDir,
  options = {},
}: UpdateExercisesRepoCacheInput): Promise<void> {
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
