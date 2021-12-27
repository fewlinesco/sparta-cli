import { spawn } from "child_process";
import cli from "cli-ux";

import Command from "../base";
import { loadConfig } from "../config/config";
import sendTestResults from "../services/send-test-results";

const exec = (
  command: string,
  directory: string,
  propagateOutput = true,
): Promise<[number, string]> => {
  const [program, ...args] = command.split(" ");
  let resolved = false;
  return new Promise((resolve) => {
    process.env.FORCE_COLOR = propagateOutput ? "true" : "false";
    const child = spawn(program, args, { cwd: directory, env: process.env });

    let output = "";
    child.stdout.on("data", function (data) {
      const strData = data.toString();
      output += strData;
      if (propagateOutput) {
        process.stdout.write(strData);
      }
    });
    child.stderr.on("data", function (data) {
      const strData = data.toString();
      if (propagateOutput) {
        output += strData; // We don't need stderr when we don't want to give the output to students
        process.stderr.write(strData);
      }

      if (
        strData.includes(
          "Jest did not exit one second after the test run has completed.",
        )
      ) {
        resolved = true;
        resolve([1, output]);
      }
    });

    child.on("close", function (code) {
      if (!resolved) {
        return resolve([code, output]);
      }
    });
  });
};

export default class Test extends Command {
  static strict = false;

  static description = "Launch the tests for an exercise";

  async run(): Promise<void> {
    const configDir = this.config.configDir;
    const config = loadConfig(configDir);

    const spartaArgumentPosition = process.argv.findIndex(
      (arg) => arg === "test",
    );
    const supplementalArguments = process.argv
      .slice(spartaArgumentPosition + 1)
      .join(" ");

    const [code, output] = await exec(
      "./node_modules/.bin/jest " + supplementalArguments,
      ".",
    );

    let totalNumberOfTests;
    try {
      const [, outputCounter] = await exec(
        "./node_modules/.bin/jest --color=false --colors=false --testNamePattern=APatternThatWillNeverMatchInOrderToOnlyListTotalTestNumber --json",
        ".",
        false,
      );

      const allTestsData = JSON.parse(outputCounter);
      totalNumberOfTests = allTestsData.numTotalTests;
    } catch (error) {
      totalNumberOfTests = -1;
    }

    if (!output.includes("No tests found")) {
      sendTestResults(code, output, totalNumberOfTests, config);
    }
    cli.action.stop();
  }
}
