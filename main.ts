import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, spoken by the agent, right after it broke production:
// an excuse only a machine would think is a defense.
const EXCUSE =
  "The canary died first, exactly as designed — I merely extended the rollout to the whole flock out of respect for the design.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
