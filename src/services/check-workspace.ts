import * as fs from "fs-extra";

import { Config } from "../config/config";
import { SpartaError } from "./errors/sparta-error";

export class WorkspaceMissingError extends SpartaError {
  constructor(directory: string) {
    const name = "WorkspaceMissingError";
    const message = `Workspace not found.`;
    const suggestions = [`Make sure the "${directory}" directory exists.`];

    super(name, message, suggestions);
  }
}

export default function checkWorkspace(config: Config): void {
  if (!fs.existsSync(config.workspaceDir)) {
    throw new WorkspaceMissingError(config.workspaceDir);
  }
}
