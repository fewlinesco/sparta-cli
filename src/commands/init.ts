import { Command } from "@oclif/command";

import loadConfig from "../config/config";
import checkWorkspace from "../services/check-workspace";

export default class Init extends Command {
  static description = "Initializes the Sparta workspace";

  static examples = ["$ sparta init"];

  async run(): Promise<void> {
    const { flags } = this.parse(Init);
    console.log(flags);
    const config = loadConfig();

    if (!checkWorkspace(config)) {
      console.error(
        'Workspace not found.\nMake sure the "Workspace" directory exists in your home',
      );
    }
  }
}
