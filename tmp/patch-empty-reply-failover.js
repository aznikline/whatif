const fs = require("fs");

const filePath = "/opt/homebrew/lib/node_modules/openclaw/dist/pi-embedded-CbCYZxIb.js";
let source = fs.readFileSync(filePath, "utf8");

const from = [
  "\t\t\t\tconst payloads = buildEmbeddedRunPayloads({",
  "\t\t\t\t\tassistantTexts: attempt.assistantTexts,",
  "\t\t\t\t\ttoolMetas: attempt.toolMetas,",
  "\t\t\t\t\tlastAssistant: attempt.lastAssistant,",
  "\t\t\t\t\tlastToolError: attempt.lastToolError,",
  "\t\t\t\t\tconfig: params.config,",
  "\t\t\t\t\tsessionKey: params.sessionKey ?? params.sessionId,",
  "\t\t\t\t\tprovider: activeErrorContext.provider,",
  "\t\t\t\t\tmodel: activeErrorContext.model,",
  "\t\t\t\t\tverboseLevel: params.verboseLevel,",
  "\t\t\t\t\treasoningLevel: params.reasoningLevel,",
  "\t\t\t\t\ttoolResultFormat: resolvedToolResultFormat,",
  "\t\t\t\t\tsuppressToolErrorWarnings: params.suppressToolErrorWarnings,",
  "\t\t\t\t\tinlineToolResultsAllowed: false,",
  "\t\t\t\t\tdidSendViaMessagingTool: attempt.didSendViaMessagingTool,",
  "\t\t\t\t\tdidSendDeterministicApprovalPrompt: attempt.didSendDeterministicApprovalPrompt",
  "\t\t\t\t});",
  "\t\t\t\tif (timedOut && !timedOutDuringCompaction && payloads.length === 0) return {",
].join("\n");

const to = [
  "\t\t\t\tconst payloads = buildEmbeddedRunPayloads({",
  "\t\t\t\t\tassistantTexts: attempt.assistantTexts,",
  "\t\t\t\t\ttoolMetas: attempt.toolMetas,",
  "\t\t\t\t\tlastAssistant: attempt.lastAssistant,",
  "\t\t\t\t\tlastToolError: attempt.lastToolError,",
  "\t\t\t\t\tconfig: params.config,",
  "\t\t\t\t\tsessionKey: params.sessionKey ?? params.sessionId,",
  "\t\t\t\t\tprovider: activeErrorContext.provider,",
  "\t\t\t\t\tmodel: activeErrorContext.model,",
  "\t\t\t\t\tverboseLevel: params.verboseLevel,",
  "\t\t\t\t\treasoningLevel: params.reasoningLevel,",
  "\t\t\t\t\ttoolResultFormat: resolvedToolResultFormat,",
  "\t\t\t\t\tsuppressToolErrorWarnings: params.suppressToolErrorWarnings,",
  "\t\t\t\t\tinlineToolResultsAllowed: false,",
  "\t\t\t\t\tdidSendViaMessagingTool: attempt.didSendViaMessagingTool,",
  "\t\t\t\t\tdidSendDeterministicApprovalPrompt: attempt.didSendDeterministicApprovalPrompt",
  "\t\t\t\t});",
  "\t\t\t\tconst emptyReplyFailover = payloads.length === 0 && lastAssistant?.stopReason === \"stop\" && !attempt.didSendViaMessagingTool && !attempt.didSendDeterministicApprovalPrompt;",
  "\t\t\t\tif (emptyReplyFailover && fallbackConfigured) {",
  "\t\t\t\t\tconst message = extractAssistantThinking(lastAssistant)?.trim() ? \"Model returned reasoning without a final answer.\" : \"Model returned no final answer.\";",
  "\t\t\t\t\tlogAssistantFailoverDecision(\"fallback_model\", { status: 204 });",
  "\t\t\t\t\tthrow new FailoverError(message, {",
  "\t\t\t\t\t\treason: \"unknown\",",
  "\t\t\t\t\t\tprovider: activeErrorContext.provider,",
  "\t\t\t\t\t\tmodel: activeErrorContext.model,",
  "\t\t\t\t\t\tprofileId: lastProfileId,",
  "\t\t\t\t\t\tstatus: 204",
  "\t\t\t\t\t});",
  "\t\t\t\t}",
  "\t\t\t\tif (timedOut && !timedOutDuringCompaction && payloads.length === 0) return {",
].join("\n");

if (!source.includes(from)) {
  throw new Error("target-not-found");
}

source = source.replace(from, to);
fs.writeFileSync(filePath, source);
console.log(`patched ${filePath}`);
