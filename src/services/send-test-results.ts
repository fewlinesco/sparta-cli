import fetch from "node-fetch";
import simpleGit from "simple-git";

import { Config } from "../config/config";

type TestResultData = {
  code: number;
  path: string;
  total: number;
  passed: number;
  failed: number;
};

export default async function sendTestResults(
  testsResultCode: number,
  testsResultOutput: string,
  totalNumberOfTests: number,
  config: Config,
): Promise<void> {
  const { sharedSecret, spartaURL, userID } = config;

  const git = simpleGit();
  const currentGitRepo = (await git.raw("rev-parse", "--show-toplevel")).trim();
  const currentRelativePath = process.cwd().replace(currentGitRepo, ".");
  // eslint-disable-next-line no-control-regex
  const cleanOutput = testsResultOutput.replace(/\u001b\[(\d+)(m|K|G)/gm, "");
  const testsRegex = /Tests:\s+((?<failed>\d+) failed, )?((?<skipped>\d+) skipped, )?((?<passed>\d+) passed, )?(?<total>\d+) total/gm;
  const testResults = testsRegex.exec(cleanOutput)?.groups;
  const data: TestResultData = {
    code: testsResultCode,
    path: currentRelativePath,
    total: -1,
    passed: -1,
    failed: -1,
  };
  if (testResults && testResults.total) {
    data.total = parseFloat(testResults.total);
    data.passed = parseFloat(testResults.passed) || 0;
    data.failed = parseFloat(testResults.failed) || 0;
  }

  if (totalNumberOfTests > data.total) {
    data.total = totalNumberOfTests;
  }

  try {
    await fetch(`${spartaURL}/cli/test-results/${userID}`, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${sharedSecret}`,
        "Content-type": "application/json",
      },
      method: "POST",
    });
  } catch (error) {
    // We ignore errors there because we want the students to always launch tests without any problem.
    // If there's a problem with Sparta or if they launch the tests offline, it's our loss but shouldn't be theirs.
  }
}
