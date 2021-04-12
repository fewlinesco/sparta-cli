import { Config } from "../config/config";
import Calendar from "../models/calendar";
import fetchCalendar from "../utils/fetch-calendar";
import { SpartaError } from "./errors/sparta-error";

export class CalendarFetchError extends SpartaError {
  constructor(message: string) {
    const name = "CalendarFetchError";
    const suggestions = ["Call a teacher to help solve the issue"];

    super(name, message, suggestions);
  }
}

export default async function fetchPastDaysExercisesPaths(
  config: Config,
): Promise<string[]> {
  let calendar: Calendar;

  try {
    calendar = await fetchCalendar(
      config.spartaURL,
      config.batchID,
      config.sharedSecret,
    );
  } catch (error) {
    throw new CalendarFetchError(error.message);
  }

  const paths = findPastDaysExercisesPaths(calendar).filter(
    (path) => path !== "",
  );

  return paths;
}

function findPastDaysExercisesPaths(calendar: Calendar): string[] {
  const today = calendar.currentDate;
  const exercises = calendar.calendar;

  const pastDays = exercises.filter((day) => day.date < today);

  return pastDays.map((day) => day.path);
}
