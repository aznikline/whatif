# Repository Structure

## Decision

This repository is managed as a monorepo.

- `products/`: user-facing projects and publishable assets
- `projects/`: internal project workspaces and production tooling
- `ops/`: automation, launchd jobs, maintenance scripts
- `docs/`: shared documentation
- `memory/`: persistent memory files and indexes

## Product Placement Rule

Put a project in `products/` if it is any of the following:

- something a user can open, run, or consume directly
- a content property with its own publish cadence
- a deployable demo, content feed, or media pipeline

Current products:

- `products/gaiming-juchang`
- `products/douyin-8d-nordic-pipeline`
- `products/daily-horror`

## Internal Placement Rule

Put a project in `projects/` if it is any of the following:

- an internal generator
- a research or authoring pipeline
- a production tool not meant to be the end-user surface

Current internal project:

- `projects/autopaper`

## Branching Rule

Do not use long-lived branches to simulate project separation.

Use:

- directory-level separation for products
- short-lived branches for feature work
- tags or release notes for product milestones
