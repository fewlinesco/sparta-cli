import cli from "cli-ux";
import * as emoji from "node-emoji";

import Command from "../base";
import { loadConfig } from "../config/config";
import checkExercisesDirectoryClean from "../services/check-exercises-directory-clean";
import fetchPastDaysExercisesPaths from "../services/fetch-past-days-exercises-paths";
import updateExercisesRepoCache from "../services/update-exercises-repo-cache";
import updateDayExercisesDirectory from "../services/update-today-exercises-directory";

export default class Sync extends Command {
  static description = "Updates all the exercises for the past days";

  async run(): Promise<void> {
    const configDir = this.config.configDir;
    const config = loadConfig(configDir);

    cli.action.start(
      emoji.emojify(":robot_face: Fetching the latest exercises version"),
    );
    await updateExercisesRepoCache(configDir);
    cli.action.stop();

    cli.action.start(
      emoji.emojify(":robot_face: Updating the past days exercises"),
    );
    await checkExercisesDirectoryClean(config);
    const exercisesPaths = await fetchPastDaysExercisesPaths(config);
    const promises = exercisesPaths
      .filter(Boolean)
      .map((path) => updateDayExercisesDirectory(config, path));

    await Promise.all(promises);
    cli.action.stop();

    this.log(emoji.emojify(":rocket: All good! Happy hacking!"));
  }
}
