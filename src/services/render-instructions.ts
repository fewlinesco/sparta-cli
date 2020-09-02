import * as marked from "marked";
import * as TerminalRenderer from "marked-terminal";

export default function renderInstructions(markdown: string): string {
  marked.setOptions({
    renderer: new TerminalRenderer(),
  });

  return marked(markdown);
}
