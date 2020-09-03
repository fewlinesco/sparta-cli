import * as fs from "fs-extra";
import * as path from "path";
import simpleGit from "simple-git";

import { Config } from "../config/config";

export default async function updateDayExercisesDirectory(
  { exercisesDir, exercisesCacheDir }: Config,
  dayPath: string,
): Promise<void> {
  const todayCachePath = path.join(exercisesCacheDir, dayPath);

  const git = simpleGit(todayCachePath);
  const directorySHA = await git.revparse([`HEAD:${dayPath}`]);

  const todayCurrentPath = path.join(exercisesDir, dayPath, "current");
  const todaySHAPath = path.join(exercisesDir, dayPath, directorySHA);

  fs.ensureDirSync(todaySHAPath);
  fs.copySync(todayCachePath, todaySHAPath);
  fs.removeSync(todayCurrentPath);
  fs.ensureSymlinkSync(todaySHAPath, todayCurrentPath);
}
