# Core Principles

## 1. Software Development Becomes Iterative Supervision

The course description explicitly frames software engineering as an iterative loop of planning, AI generation, modification, and repetition. That implies a shift in developer responsibility.

The developer is no longer defined only by typing source code. The developer is increasingly responsible for:
- problem framing
- context packaging
- tool routing
- evaluation and correction
- safety and reliability controls

## 2. Context Is Infrastructure

Weeks 2 and 3 make this explicit. Agents are only as effective as the context interfaces around them.

In practice, that means:
- clear task specifications
- structured prompts
- tool contracts with typed parameters
- bounded memory and codebase context
- predictable repository guidance

A weak context pipeline produces weak agent behavior even if the underlying model is strong.

## 3. Tools Matter More Than Chat

The course consistently pushes from pure prompting toward tool use, MCP servers, IDE integration, terminal automation, code review, and app generation.

This is the right abstraction. The frontier is not "a better chatbot for code". The frontier is a programmable system that can inspect, modify, test, review, and monitor software artifacts with explicit guardrails.

## 4. Verification Is Not Optional

Week 6 and Week 7 are the structural backbone of the course.

Without verification, AI acceleration only increases blast radius.

Verification in this course shows up as:
- unit tests
- Semgrep scans
- PR review
- manual review against AI review
- documented mitigations
- operational triage and debugging

This is the main discipline that separates a toy workflow from a production-capable one.

## 5. Agent Use Requires Governance

Weeks 4 and 5 emphasize autonomy levels, human-agent collaboration patterns, and multi-agent execution environments.

The real question is not whether to use agents. It is how much autonomy to grant, in what environment, under which supervision model, and with what rollback path.

## 6. Production Is Part of the Curriculum

Week 9 is critical because it closes the loop. Monitoring, observability, incident response, and debugging are not afterthoughts. They are part of the system design for AI-native software work.

That is a strong curriculum choice because many AI coding workflows collapse once they hit the post-deployment phase.

## 7. The Course Is Quietly Teaching a New Role Definition

By the end of the syllabus, the developer is expected to be:
- a spec writer
- a context engineer
- a tool integrator
- a reviewer
- a security triager
- an operator

The code author role does not disappear, but it is no longer the only center of gravity.
