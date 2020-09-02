import cli from "cli-ux";
import * as emoji from "node-emoji";

import Command from "../base";
import loadConfig from "../config/config";
import initInstuctions from "../instructions/init";
import checkWorkspace from "../services/check-workspace";
import initExercicesRepository from "../services/init-exercises-repository";
import renderInstructions from "../services/render-instructions";

export default class Init extends Command {
  static description = "Initializes the Sparta workspace";

  static examples = ["$ sparta init"];

  async run(): Promise<void> {
    const config = loadConfig();

    this.log(emoji.emojify(":crossed_fingers: Checking Workspace directory"));
    checkWorkspace(config);

    this.log(emoji.emojify(":robot_face: Initializing exercises repository"));
    await initExercicesRepository(config);

    this.log(emoji.emojify(":rocket: All Good! Follow the instructions now"));
    this.log(renderInstructions(initInstuctions));

    await cli.anykey(
      "Press a key when you are ready to create your GitHub repository",
    );

    await cli.open("https://github.com/new");
  }
}
