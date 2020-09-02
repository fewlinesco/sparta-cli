import Command, { flags } from "@oclif/command";

import { SpartaError } from "./services/errors/sparta-error";

export default abstract class extends Command {
  async catch(error: SpartaError): Promise<void> {
    this.error(error.message, { suggestions: error.suggestions });
  }
}
