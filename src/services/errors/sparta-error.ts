export class SpartaError extends Error {
  name: string;

  suggestions: string[];

  constructor(name: string, message: string, suggestions: string[]) {
    super(message);

    this.name = name;
    this.suggestions = suggestions;
  }
}
