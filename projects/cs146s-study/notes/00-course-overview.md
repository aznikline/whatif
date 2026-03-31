# Course Overview

## What CS146S Is Actually Teaching

CS146S is a course about the changing operating model of software engineering under large language models and coding agents. The official course description frames the shift as a move away from purely manual code production toward an iterative loop of planning, AI-assisted generation, modification, evaluation, and repetition.

That framing matters. The course is not organized as a survey of tools. It is organized as a workflow transformation course. The central claim is that the next generation of software engineers needs to understand both classical software engineering constraints and the new AI-native ways of addressing them.

## Official Course Facts

- Units: 3
- Prerequisites: CS111 equivalent programming experience; CS221/229 recommended
- Expected commitment: about 10-12 hours per week
- Delivery format: weekly lectures, hands-on coding sessions, guest speakers, and a final project
- Grading split:
  - Final Project: 80%
  - Weekly Assignments: 15%
  - Participation: 5%

## My Reading of the Course Design

The syllabus suggests a deliberate progression:

1. Start with model and prompting fundamentals.
2. Move into agents, tools, and the IDE as the new software cockpit.
3. Formalize operating patterns for coding agents.
4. Extend the workflow into the terminal, testing, and security.
5. Push beyond code generation into review, support, frontend construction, and post-deployment operations.
6. End with role change, industry trajectory, and future developer workflows.

This is a coherent curriculum. It mirrors the lifecycle of a modern software project rather than the taxonomy of AI products.

## Why This Course Is Worth Studying Systematically

Three reasons stand out.

First, the course treats AI-assisted development as an engineering discipline rather than a productivity hack. That is the right lens.

Second, the assignments force tool use inside concrete software artifacts: FastAPI apps, MCP servers, testing pipelines, review workflows, and multi-stack apps.

Third, the course covers the part many AI coding discussions skip: debugging, observability, security, and trust after code leaves the editor.

## What to Retain While Studying

When studying this course, the key is not memorizing every reading. The key is extracting a durable mental model:

- How should a developer structure work when models are in the loop?
- What must still be verified by humans?
- Which abstractions are durable: prompts, specs, tools, test harnesses, review loops, deployment feedback?
- Where do agent systems break: context loss, insecure actions, weak evaluation, poor autonomy control?

That is the lens used in the rest of these notes.
