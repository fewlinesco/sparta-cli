import fetch from "node-fetch";

import Calendar from "../models/calendar";

export default async function fetchCalendar(
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
