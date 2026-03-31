# Assignment Patterns

## What the Public Assignment Repo Reveals

The public assignments repository is useful because it shows the course's actual expectations, not just the syllabus marketing layer.

Across the available weeks, several recurring patterns emerge.

## Pattern 1: Start with a Real Artifact, Not a Blank Sheet

Many assignments begin from a starter application or a structured codebase.

Examples:
- Week 2 expands a FastAPI + SQLite action item extractor.
- Week 4 and Week 5 use a minimal full-stack app as a playground.
- Week 6 scans an existing app with Semgrep.
- Week 7 builds and reviews changes through PR workflows.

This is good pedagogy. It trains students to work inside constraints, where most real engineering happens.

## Pattern 2: AI Is Used as a Means, Not the Deliverable

The deliverable is rarely "use an AI tool" in the abstract. The deliverable is usually one of:
- a working feature
- a review artifact
- an MCP server
- a scan-and-fix workflow
- a documentation artifact
- a multi-stack application

That forces students to connect AI assistance to tangible engineering outputs.

## Pattern 3: Documentation Is Part of the Grade

Several weeks require writeups, prompt logs, code references, or README generation.

That signals an important principle: prompt work and agent interaction are part of the engineering process and need to be inspectable.

## Pattern 4: Environment Design Is a Learning Goal

The assignments repeatedly ask students to work through IDEs, Claude Code, Warp, Semgrep, Graphite, MCP servers, and app generators.

The hidden lesson is that a developer's environment is now a strategic asset. The modern workflow is partly defined by how well the environment is configured for agent use.

## Pattern 5: Human Judgment Stays in the Loop

Even when the assignment uses AI heavily, the course still asks for:
- manual review
- clear prompts and rationale
- explanation of mitigations
- branch and PR hygiene
- explicit tradeoffs and limitations

That is the course's most durable lesson: AI may accelerate execution, but ownership stays human.

## What to Reuse in This Repository

For work inside this repository, the course suggests five reusable operating patterns:

1. Write task specs before asking agents to code.
2. Treat tool interfaces and local skills as first-class developer assets.
3. Require verification after generation: tests, lint, security scans, or review.
4. Capture writeups and decisions in durable text files.
5. Use multi-agent or automation patterns only when coordination boundaries are explicit.
