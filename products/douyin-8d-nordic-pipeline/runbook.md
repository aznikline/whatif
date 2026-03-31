# Douyin 8D Nordic Pipeline Runbook

## Purpose
- Build short-form video candidates from trend inputs, 8D-stylized audio, and Nordic aerial footage.
- Keep rights review and publish approval explicit.

## Triggers
- Manual trigger for the first runs.
- Optional cron trigger every day at 10:00 Asia/Shanghai after the source feed is stable.

## Inputs
- `TREND_AUDIO_SOURCE_URL` or `TREND_AUDIO_SOURCE_FILE`
- Licensed source audio path
- Nordic aerial footage path
- Optional publish credentials:
  - `POSTQUED_API_KEY`
  - `DOUYIN_PUBLISH_PROFILE`

## Outputs
- 8D audio render in `runs/<run_id>/audio/`
- Vertical export in `runs/<run_id>/video/`
- Review payload in `review/<run_id>.json`
- Publish metadata in the workflow execution log

## Idempotency
- Dedup key: `trend_track_id + footage_asset_id + publish_mode`
- Safe re-run behavior:
  - overwrite local render outputs for the same `run_id`
  - block publish when a matching review payload already exists and is not approved

## Error Handling
- Retry policy:
  - trend fetch: 3 retries
  - media render: 1 retry after cleanup
  - publish: 2 retries with backoff
- Failure notifications:
  - n8n execution failure branch
  - review queue artifact written locally
- Review queue location:
  - `/Users/wizout/op/openclaw/products/douyin-8d-nordic-pipeline/review`

## Logging & Audit
- Run ID:
  - generated in workflow as `run-<timestamp>`
- What is logged per run:
  - chosen candidate
  - source audio path
  - footage path
  - output video path
  - publish mode
  - final state
- Where logs are stored:
  - n8n execution history
  - local `review/` payloads

## Operational Checks
- Expected counts/thresholds:
  - at least 1 candidate from trend fetch
  - source audio must be `cleared` or manually approved
  - footage path must exist
- Stop The Line Conditions:
  - missing rights clearance
  - no publish credential for auto mode
  - render command non-zero exit
