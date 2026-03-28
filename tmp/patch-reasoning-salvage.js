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
  '\t\t\t\tconst emptyReplyFailover = payloads.length === 0 && lastAssistant?.stopReason === "stop" && !attempt.didSendViaMessagingTool && !attempt.didSendDeterministicApprovalPrompt;',
].join("\n");

const to = [
  "\t\t\t\tlet payloads = buildEmbeddedRunPayloads({",
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
  '\t\t\t\tconst inferredReplyFromReasoning = payloads.length === 0 ? (() => {',
  '\t\t\t\t\tconst rawThinking = extractAssistantThinking(lastAssistant)?.trim() ?? "";',
  '\t\t\t\t\tif (!rawThinking) return "";',
  '\t\t\t\t\tconst patterns = [',
  '\t\t\t\t\t\t/(?:reply|respond)\\s+with(?:\\s+just)?\\s+[\"“]([^\"”\\n]{1,40})[\"”]/i,',
  '\t\t\t\t\t\t/回复(?:为|成)?(?:\\s*仅|\\s*只)?\\s*[\"“]([^\"”\\n]{1,40})[\"”]/,',
  '\t\t\t\t\t];',
  '\t\t\t\t\tfor (const pattern of patterns) {',
  '\t\t\t\t\t\tconst match = rawThinking.match(pattern);',
  '\t\t\t\t\t\tif (match?.[1]) return match[1].trim();',
  '\t\t\t\t\t}',
  '\t\t\t\t\treturn "";',
  '\t\t\t\t})() : "";',
  '\t\t\t\tif (inferredReplyFromReasoning) payloads = [{ text: inferredReplyFromReasoning }];',
  '\t\t\t\tconst emptyReplyFailover = payloads.length === 0 && lastAssistant?.stopReason === "stop" && !attempt.didSendViaMessagingTool && !attempt.didSendDeterministicApprovalPrompt;',
].join("\n");

if (!source.includes(from)) {
  throw new Error("target-not-found");
}

source = source.replace(from, to);
fs.writeFileSync(filePath, source);
console.log(`patched ${filePath}`);
