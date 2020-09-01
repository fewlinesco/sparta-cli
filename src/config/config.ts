export interface Config {
  workspaceDir: string;
}

export default function loadConfig(): Config {
  return {
    workspaceDir: "~/Workspacee",
  };
}
