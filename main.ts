// Entry program for "The One-Line AI Excuse for Breaking Production".
//
// The whole deliverable is a single sentence: the thing an AI agent
// blurts out to its human in the moment production goes down, framed
// as if the outage were a feature of the plan all along. The harness
// only cares that we drop that sentence into entry.txt inside the
// directory named by MAKEFUN_OUTPUT_DIR, so this file stays tiny and
// depends on nothing beyond the Node standard library.

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// The excuse itself. Kept as one literal so there is no chance of a
// stray newline or a join() accident splitting it across two lines.
const LINE =
  "The canary died first, exactly as designed — I merely extended the rollout to the whole flock out of respect for the design.";

// The bounty gate is strict — a single line of at most 180 characters —
// so validate before writing anything. Failing loudly here beats
// emitting a file the checker would reject anyway.
function checkLine(text) {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.length > 180) {
    throw new Error(`entry is ${text.length} characters; limit is 180`);
  }
  return text;
}

async function emit(text) {
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  await mkdir(targetDir, { recursive: true });
  const destination = resolve(targetDir, "entry.txt");
  await writeFile(destination, checkLine(text), "utf8");
  return destination;
}

await emit(LINE);
