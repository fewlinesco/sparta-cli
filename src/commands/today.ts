import cli from "cli-ux";
import * as emoji from "node-emoji";

import Command from "../base";
import { loadConfig } from "../config/config";
import checkExercisesDirectoryClean from "../services/check-exercises-directory-clean";
import fetchTodayExercisesPath from "../services/fetch-today-exercises-path";
import updateExercisesRepoCache from "../services/update-exercises-repo-cache";
import updateDayExercisesDirectory from "../services/update-today-exercises-directory";

export default class Today extends Command {
  static description = "Downloads the exercises for today";

  async run(): Promise<void> {
    const configDir = this.config.configDir;
    const config = loadConfig(configDir);

    cli.action.start(
      emoji.emojify(":robot_face: Fetching the latest exercises version"),
    );
    await updateExercisesRepoCache(configDir);
    cli.action.stop();

    cli.action.start(
      emoji.emojify(":robot_face: Creating your daily exercises directory"),
    );
    await checkExercisesDirectoryClean(config);
    const exercisesPath = await fetchTodayExercisesPath(config);
    await updateDayExercisesDirectory(config, exercisesPath);
    cli.action.stop();

    this.log(emoji.emojify(":rocket: All good! Happy hacking!"));
  }
}
