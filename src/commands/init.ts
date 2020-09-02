import cli from "cli-ux";
import * as emoji from "node-emoji";

import Command from "../base";
import { loadConfig, ConfigInput, writeConfig } from "../config/config";
import initInstuctions from "../instructions/init";
import checkWorkspace from "../services/check-workspace";
import initExercicesRepository from "../services/init-exercises-repository";
import renderInstructions from "../services/render-instructions";
import updateExercisesRepoCache from "../services/update-exercises-repo-cache";

export default class Init extends Command {
  static description = "Initializes the Sparta workspace";

  static examples = ["$ sparta init"];

  async run(): Promise<void> {
    const configDir = this.config.configDir;
    const userInput = await getUserInput();

    writeConfig(configDir, userInput);

    const config = loadConfig(configDir);

    this.log(emoji.emojify(":crossed_fingers: Checking Workspace directory"));
    checkWorkspace(config);

    this.log(emoji.emojify(":robot_face: Initializing exercises repository"));
    await initExercicesRepository(config);

    cli.action.start(
      emoji.emojify(":robot_face: Preparing the Sparta configuration"),
    );
    await updateExercisesRepoCache({ configDir, options: { delete: true } });
    cli.action.stop();

    this.log(emoji.emojify(":rocket: All Good! Follow the instructions now"));
    this.log(renderInstructions(initInstuctions));

    await cli.anykey(
      "Press a key when you are ready to create your GitHub repository",
    );

    await cli.open("https://github.com/new");
  }
}

async function getUserInput(): Promise<ConfigInput> {
  const batchID = await cli.prompt("What is the ID of your batch ?");
  const sharedSecret = await cli.prompt("Enter the Sparta secret token", {
    type: "hide",
  });

  return {
    batchID,
    sharedSecret,
  };
}
