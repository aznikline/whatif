# OpenClaw Community Iteration Playbook

## Goal
Build OpenClaw as a continuously improving production agent system: stable, observable, secure, and easy to evolve.

## Community-Backed Stack (Recommended)
- Observability:
  - OpenTelemetry + Prometheus/Grafana for channel/tool latency and failure rate.
  - Langfuse for LLM traces, prompt versions, and eval comparisons.
- Eval and regression:
  - promptfoo for prompt/tool regression and jailbreak/safety checks.
- Workflow automation:
  - n8n for scheduled diagnostics, incident routing, and multi-step data pipelines.
- Skill supply chain:
  - Clawhub/Sundial skills with trust allowlist + periodic audit.

## What Is Implemented In This Repo
- `ops/bin/health-check.sh`
  - Deep status probe, iMessage channel probe, recent iMessage logs, Tavily plugin check.
- `ops/bin/skill-audit.sh`
  - Skill trust-list validation and risky command pattern scan.
- `ops/bin/tavily-smoke.sh`
  - Tavily key format check; optional live API reachability test (`--network`).
- `ops/bin/full-iteration.sh`
  - One-command daily iteration baseline.
- `ops/bin/redeploy-gateway-clean.sh`
  - Reinstall/restart gateway under a clean env to prevent stale proxy vars from being persisted into launchd.
- `ops/config/trusted-skills.txt`
  - Trusted skill baseline for local supply-chain control.

## Runbook
1. Daily health check
   - `./ops/bin/health-check.sh`
2. Daily skill supply-chain audit
   - `./ops/bin/skill-audit.sh`
3. Daily Tavily smoke
   - `./ops/bin/tavily-smoke.sh`
4. Pre-release full iteration
   - `./ops/bin/full-iteration.sh`
5. Weekly live Tavily validation
   - `./ops/bin/tavily-smoke.sh --network`

## Suggested KPIs
- iMessage command response success rate >= 98%
- Tavily tool success rate >= 95%
- p95 end-to-end response latency <= 90s
- Mean time to detect incident <= 5m

## Next Integration Milestones
- M1: Push script outputs to structured JSON and ingest into Grafana/Loki.
- M2: Add promptfoo config and 30+ fixed regression prompts (Chinese iMessage command style included).
- M3: Add automatic rollback trigger when failure ratio breaches threshold.
- M4: Build n8n incident workflow (no-reply -> diagnose -> notify -> restart policy).

## Implemented (This Repo)
- Prompt regression harness: `ops/promptfoo/promptfooconfig.yaml` + `ops/bin/promptfoo-run.sh`.
- Tavily two-stage reply bridge: `ops/bin/tavily-bridge.sh` (ACK + final response, with fallback on failure).
- n8n workflow: `ops/n8n/workflows/openclaw-no-reply-diagnosis.json`.
