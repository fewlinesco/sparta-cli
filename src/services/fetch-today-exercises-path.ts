import * as fs from "fs-extra";
import fetch from "node-fetch";

import { Config } from "../config/config";
import Calendar from "../models/calendar";
import { SpartaError } from "./errors/sparta-error";

export class CalendarFetchError extends SpartaError {
  constructor(message: string) {
    const name = "CalendarFetchError";
    const suggestions = ["Call a teacher to help solve the issue"];

    super(name, message, suggestions);
  }
}

export class DayExercisesMissingError extends SpartaError {
  constructor() {
    const name = "DayExercisesMissingError";
    const message = "No exercises found for today";
    const suggestions = ["Call a teacher to help solve the issue"];

    super(name, message, suggestions);
  }
}

export default async function fetchTodayExercisesPath(
  config: Config,
): Promise<string> {
  let calendar: Calendar;

  try {
    calendar = await fetchCalendar(config.batchID, config.sharedSecret);
  } catch (error) {
    throw new CalendarFetchError(error.message);
  }

  const path = findTodayExercisesPath(calendar);

  if (!path) {
    throw new DayExercisesMissingError();
  }

  return path;
}

async function fetchCalendar(
  batchID: string,
  sharedSecret: string,
): Promise<Calendar> {
  const response = await fetch(
    `https://sparta.fewlines.dev/cli/calendar/${batchID}`,
    {
      headers: {
        Authorization: `Bearer ${sharedSecret}`,
      },
    },
  );

  return response.json();
}

function findTodayExercisesPath(calendar: Calendar): string | undefined {
  const today = calendar.currentDate;
  const exercises = calendar.calendar;

  return exercises.find((day) => day.date === today)?.path;
}
