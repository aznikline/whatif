# Douyin 8D Nordic Pipeline

This project turns a content idea into an executable pipeline:

1. discover trending audio candidates from a configurable source
2. convert the chosen track into an "8D" stereo experience
3. pair it with Nordic aerial footage
4. export a vertical short
5. hand off to a publish step for Douyin/TikTok

## Why this exists

The Feishu task stalled after `taizi` created `JJC-20260318-001` but failed to actually call `sessions_send`.
This folder is the direct takeover deliverable: a real project scaffold with workflow, scripts, and a runbook.

## Skill Findings

ClawHub CLI lookup was rate-limited during live execution, so I kept the project on a safe, reproducible path:

- Primary publisher candidate: `douyin-publish`
  - install attempt path: `npx clawhub@latest install douyin-publish`
  - expected role: Douyin login / upload / publish helper
- API fallback candidate: `postqued-api`
  - install path seen in the live registry ecosystem: `npx playbooks add skill openclaw/skills --skill postqued-api`
  - expected role: schedule and publish to TikTok-compatible targets through PostQued
- Local skills already available in this workspace:
  - `clawhub`
  - `n8n-workflow-automation`
  - `summarize`
  - `video-frames`
  - `tavily-search`

Because the registry search hit rate limits, this project treats publisher choice as a pluggable last step.

## Project Layout

- `scripts/fetch_trending_audio_candidates.sh`
- `scripts/make_8d_audio.sh`
- `scripts/compose_nordic_video.sh`
- `scripts/queue_review.sh`
- `data/audio_candidates.sample.json`
- `runbook.md`
- `../ops/n8n/workflows/douyin-8d-nordic-pipeline.json`

## Quick Start

1. Copy `.env.example` to `.env` and fill the required values.
2. Put licensed source audio and Nordic footage in your configured asset directories.
3. Test the local media path:

```bash
cd /Users/wizout/op/openclaw/projects/douyin-8d-nordic-pipeline
./scripts/make_8d_audio.sh /path/to/input.wav ./runs/test-8d.m4a
./scripts/compose_nordic_video.sh /path/to/nordic-footage.mp4 ./runs/test-8d.m4a ./runs/test-video.mp4
```

4. Import the workflow:

```bash
open /Users/wizout/op/openclaw/ops/n8n/workflows/douyin-8d-nordic-pipeline.json
```

## Operating Model

- Trend discovery is automated.
- Rights review is mandatory before any publish step.
- Audio rendering and video composition are automated locally with `ffmpeg`.
- Publish stays behind a switch:
  - `postqued-api`
  - `douyin-publish`
  - or manual export only

## Notes

- The sample trend feed uses placeholder tracks, not copyrighted songs.
- "8D" here is a stylized stereo motion effect, not a true multi-speaker object-based master.
- If you want a fully automatic publish step, the next missing piece is valid Douyin/TikTok publishing credentials.
