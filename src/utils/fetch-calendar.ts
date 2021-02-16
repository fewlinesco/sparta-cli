import fetch from "node-fetch";

import Calendar from "../models/calendar";

export default async function fetchCalendar(
  spartaURL: string,
  batchID: string,
  sharedSecret: string,
): Promise<Calendar> {
  const response = await fetch(`${spartaURL}/cli/calendar/${batchID}`, {
    headers: {
      Authorization: `Bearer ${sharedSecret}`,
    },
  });

  return response.json();
}
