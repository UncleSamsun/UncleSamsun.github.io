import { describe, expect, it } from "vitest";
import { runTerminalCommand } from "../src/lib/terminal";

describe("terminal commands", () => {
  it("prints help commands", () => {
    expect(runTerminalCommand("help")).toEqual({
      type: "output",
      lines: ["help, ls, cat Contact.txt, open <file>, whoami, neofetch, clear"],
    });
  });

  it("lists portfolio root files", () => {
    expect(runTerminalCommand("ls")).toEqual({
      type: "output",
      lines: ["README.md", "Projects/", "Contact.txt"],
    });
  });

  it("opens files", () => {
    expect(runTerminalCommand("open Projects/hola-climbing.md")).toEqual({
      type: "open",
      fileId: "Projects/hola-climbing.md",
      lines: ["opened Projects/hola-climbing.md"],
    });
  });

  it("clears terminal output", () => {
    expect(runTerminalCommand("clear")).toEqual({ type: "clear" });
  });

  it("returns a friendly message for unknown commands", () => {
    expect(runTerminalCommand("deploy")).toEqual({
      type: "output",
      lines: ["command not found: deploy", "try: help"],
    });
  });
});
