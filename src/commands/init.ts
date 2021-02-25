import { flags } from "@oclif/command";
import cli from "cli-ux";
import * as emoji from "node-emoji";

import Command from "../base";
import { loadConfig, writeConfig } from "../config/config";
import initInstuctions from "../instructions/init";
import checkWorkspace from "../services/check-workspace";
import initExercicesRepository from "../services/init-exercises-repository";
import renderInstructions from "../services/render-instructions";
import updateExercisesRepoCache from "../services/update-exercises-repo-cache";

export default class Init extends Command {
  static description = "Initializes the Sparta workspace";

  static examples = ["$ sparta init"];

  static flags = {
    force: flags.boolean({ char: "f", default: false, hidden: true }),
    spartaURL: flags.string({
      char: "s",
      hidden: true,
      default: "https://sparta.fewlines.dev",
    }),
    batchID: flags.string({
      char: "b",
    }),
    userID: flags.string({
      char: "u",
    }),
  };

  async run(): Promise<void> {
    const configDir = this.config.configDir;
    const { flags } = this.parse(Init);
    const userInput = await getUserInput(flags);

    writeConfig(configDir, { ...userInput, spartaURL: flags.spartaURL });

    const config = loadConfig(configDir);

    this.log(emoji.emojify(":crossed_fingers: Checking Workspace directory"));
    checkWorkspace(config);

    this.log(emoji.emojify(":robot_face: Initializing exercises repository"));
    await initExercicesRepository(config, flags.force);

    cli.action.start(
      emoji.emojify(":robot_face: Preparing the Sparta configuration"),
    );
    await updateExercisesRepoCache(configDir, { delete: true });
    cli.action.stop();

    this.log(emoji.emojify(":rocket: All Good! Follow the instructions now"));
    this.log(renderInstructions(initInstuctions));

    await cli.anykey(
      "Press a key when you are ready to create your GitHub repository",
    );

    await cli.open("https://github.com/new");
  }
}

async function getUserInput(flags: {
  batchID?: unknown;
  userID?: unknown;
}): Promise<{
  batchID: string;
  userID: string;
  sharedSecret: string;
}> {
  const batchID = flags.batchID
    ? flags.batchID
    : await cli.prompt("What is the ID of your batch?");
  const userID = flags.userID
    ? flags.userID
    : await cli.prompt("What is your user ID?");
  const sharedSecret = await cli.prompt("Enter the Sparta secret token", {
    type: "hide",
  });

  return {
    batchID,
    userID,
    sharedSecret,
  };
}
