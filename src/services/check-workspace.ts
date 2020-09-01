import * as fs from "fs-extra";

import { Config } from "../config/config";

export default function checkWorkspace(config: Config): boolean {
  return fs.existsSync(config.workspaceDir);
}
