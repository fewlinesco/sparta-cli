import { Config } from "../config/config";
import Calendar from "../models/calendar";
import fetchCalendar from "../utils/fetch-calendar";
import { SpartaError } from "./errors/sparta-error";

class CalendarFetchError extends SpartaError {
  constructor(message: string) {
    const name = "CalendarFetchError";
    const suggestions = ["Call a teacher to help solve the issue"];

    super(name, message, suggestions);
  }
}

async function fetchPastDaysExercisesPaths(config: Config): Promise<string[]> {
  let calendar: Calendar;

  try {
    calendar = await fetchCalendar(
      config.spartaURL,
      config.batchID,
      config.sharedSecret,
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new CalendarFetchError(error.message);
    }

    throw error;
  }

  const paths = findPastDaysExercisesPaths(calendar);

  return paths;
}

function findPastDaysExercisesPaths(calendar: Calendar): string[] {
  const today = calendar.currentDate;
  const exercises = calendar.calendar;

  const pastDays = exercises.filter((day) => day.date < today);

  return pastDays.map((day) => day.path);
}

export default fetchPastDaysExercisesPaths;
export { CalendarFetchError };
