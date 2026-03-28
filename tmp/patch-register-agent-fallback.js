const fs = require("fs");

const filePath = "/opt/homebrew/lib/node_modules/openclaw/dist/register.agent-BVmAoxFg.js";
const source = fs.readFileSync(filePath, "utf8");

const from = [
  "\ttry {",
  "\t\treturn await agentViaGatewayCommand(opts, runtime);",
  "\t} catch (err) {",
  "\t\truntime.error?.(`Gateway agent failed; falling back to embedded: ${String(err)}`);",
  "\t\treturn await agentCommand(localOpts, runtime, deps);",
  "\t}",
].join("\n");

const to = [
  "\ttry {",
  "\t\treturn await agentViaGatewayCommand(opts, runtime);",
  "\t} catch (err) {",
  "\t\tconst fallbackOpts = { ...localOpts };",
  "\t\tconst errText = String(err);",
  '\t\tif (!fallbackOpts.sessionId && !fallbackOpts.to && /gateway timeout/i.test(errText)) fallbackOpts.sessionId = "cli-fallback-" + Date.now();',
  "\t\truntime.error?.(`Gateway agent failed; falling back to embedded: ${errText}`);",
  "\t\treturn await agentCommand(fallbackOpts, runtime, deps);",
  "\t}",
].join("\n");

if (!source.includes(from)) {
  throw new Error("target-not-found");
}

fs.writeFileSync(filePath, source.replace(from, to));
console.log(`patched ${filePath}`);
