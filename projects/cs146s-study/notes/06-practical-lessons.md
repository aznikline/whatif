# Practical Lessons from CS146S

## What This Note Is For

This note answers a simple question:

> If you had never taken this course, what would you actually learn to do?

The answer is not "use AI tools".
The answer is a sequence of concrete software engineering habits.

## Week 1: Prompting Is a Debuggable Skill

### What the course is really teaching

Week 1 is not just an introduction to LLMs. It is teaching that prompts are part of the engineering surface.

The public assignment makes students practice:
- k-shot prompting
- chain-of-thought
- tool calling
- self-consistency
- RAG
- reflexion

That is already a serious list. The point is not to memorize buzzwords. The point is to observe that different prompting strategies solve different failure modes.

### What you would actually do

In the assignment repo, Week 1 asks students to fill in prompt logic in concrete Python files and make tests pass.

That means you are not merely chatting with a model. You are testing prompt behavior against tasks.

### What a beginner should learn here

Three practical lessons:

1. A prompt is not good because it sounds smart. It is good because it produces the expected output on repeated trials.
2. If a task is unstable, changing the prompt structure can matter more than changing the model.
3. Prompting is easiest to improve when you can compare multiple outputs against a clear target.

### Beginner exercise

Take one tiny coding task, such as extracting action items from a paragraph, and try three prompt shapes:
- direct instruction
- instruction + examples
- instruction + explicit output schema

Then compare which one fails less often.

## Week 2: Agents Need Structure, Not Just Intelligence

### What the course is really teaching

Week 2 focuses on agent anatomy, tool use, and MCP.

The public assignment is concrete: students extend a FastAPI + SQLite app and add an LLM-powered extraction path, tests, refactors, and extra endpoints.

This is important because it teaches that AI coding becomes real only when model output is connected to APIs, persistence, and tests.

### What you would actually do

You would:
- inspect an existing backend
- add an LLM-based function
- define structured outputs
- write tests for different input shapes
- wire the new behavior into the frontend and API

### What a beginner should learn here

This week teaches that an agent is not just "model + text". It is usually:
- model
- prompt/context
- tools or functions
- interface contracts
- error handling
- verification

### Beginner mistake to avoid

Do not build an agent that returns unstructured paragraphs when the system needs JSON.

If downstream code expects a list, force the model toward a list.

## Week 3: The IDE Is Becoming a Control Surface

### What the course is really teaching

Week 3 is about context management, PRDs for agents, and IDE integrations.

The assignment asks students to build a custom MCP server wrapping a real external API.

That is not a toy task. It teaches that AI coding gets stronger when the environment exposes structured tools.

### What you would actually do

You would:
- choose a real external API
- expose at least two MCP tools
- handle timeouts, empty results, and rate limits
- write docs so an agent client can invoke the server

### Why this matters

A beginner usually thinks the IDE is just where code appears.
The course is teaching a different view:
- the IDE is where context is assembled
- tools are connected
- specs are handed to the model
- results are reviewed and rerun

### Beginner exercise

Build the smallest possible tool surface:
- one tool that queries a weather or GitHub API
- one tool that returns a structured summary

Then test whether the model uses those tools better than plain free-form prompting.

## Week 4: Autonomy Has to Be Designed

### What the course is really teaching

Week 4 covers autonomy levels and human-agent collaboration patterns.

The assignment pushes students into Claude Code features such as:
- custom slash commands
- repo guidance files
- subagents
- MCP integrations

This is where the course gets operational.

### Real lesson

Once AI can edit files and run commands, the main question changes from:
- "Can it code?"

to:
- "How much freedom should it have?"
- "What workflow should be automated?"
- "What needs a checkpoint?"

### Concrete habit to learn

Every useful automation should answer:
- input
- output
- rollback path
- verification step

If one of those is missing, the automation is incomplete.

### Beginner exercise

Create one very small repo automation such as:
- run tests and summarize failures
- update docs from an OpenAPI schema
- rename a module and rerun lint/tests

The real learning is not the feature itself. The real learning is designing a safe repeated workflow.

## Week 5: The Terminal Is Now Part of the Agent Runtime

### What the course is really teaching

Week 5 replays the automation story inside Warp and multi-agent terminal workflows.

The assignment explicitly asks for:
- Warp Drive prompts/rules/MCP integrations
- multi-agent workflows in separate tabs

This means the course is teaching environment engineering, not just feature engineering.

### What you would actually do

You would:
- run tasks in separate work contexts
- coordinate concurrent agents
- define which tasks are safe to parallelize
- manage autonomy and supervision in the terminal

### Practical takeaway

A modern terminal is no longer just where you type commands. It can become the orchestration layer for builds, tests, reviews, refactors, and agent coordination.

### Beginner warning

Parallelism is only useful when tasks are independent.
If two agents touch the same files without clear boundaries, the speed gain turns into merge pain.

## Week 6: Security Is Where Naive AI Workflows Break

### What the course is really teaching

Week 6 is one of the most important weeks because it forces students to face the downside of rapid generation.

The assignment requires running Semgrep, triaging findings, fixing at least three issues, and explaining the mitigation precisely.

### What you would actually do

You would:
- run a security scan
- distinguish signal from noise
- patch concrete issues
- rerun checks
- keep the app working after the fixes

### Practical lesson

Generated code is often weakest in exactly the places beginners do not inspect carefully:
- insecure defaults
- unsafe string handling
- risky dependency choices
- over-permissive configuration
- secret leakage

### Beginner exercise

Run one scanner against a small app and force yourself to explain, in plain English:
- what the issue is
- why it matters
- what changed
- how the fix reduces risk

That explanation step is part of the learning.

## Week 7: Review Is a Skill, Not a Formality

### What the course is really teaching

Week 7 compares manual review with AI-assisted review using Graphite.

Students are asked to:
- create separate branches
- implement tasks with an AI tool
- manually review line by line
- open PRs
- compare their review comments with AI review comments

### What this teaches

The course is saying something very important:

AI-generated code review is useful, but it does not remove the need for human judgment.

### What a beginner should focus on during review

When reviewing AI-generated diffs, check at least these:
- correctness
- test coverage
- naming and API clarity
- hidden side effects
- security and data exposure
- whether the change actually matches the task

### High-value lesson

A review is not good because it is long. It is good because it catches real risk.

## Week 8: AI Can Build Apps Fast, but Stack Choice Still Matters

### What the course is really teaching

Week 8 asks students to build the same application in three different stacks, including one generated with Bolt and one using a non-JavaScript language.

This is not only a product-building assignment. It is a comparative systems lesson.

### What you would actually learn

You would compare:
- time to first working version
- ease of iteration
- quality of generated structure
- maintainability across stacks
- where AI app generators help versus where manual cleanup is still required

### Beginner takeaway

AI can reduce time to a demo, but the maintenance cost depends heavily on the stack, defaults, and clarity of generated structure.

Do not evaluate generated code only by how quickly it runs once.
Evaluate whether you can still understand and extend it tomorrow.

## Week 9: Deployment Is Not the End

### What the course is really teaching

Week 9 moves into observability, incident response, and debugging for AI systems.

This is one of the strongest indicators that the course is serious. Many beginner AI workflows stop at generation. This course continues into runtime behavior.

### Practical lesson

If you cannot observe a system, you cannot safely automate it.

For AI-native systems, post-deployment work includes:
- monitoring failures
- tracing tool usage
- debugging degraded outputs
- triaging incidents
- understanding how context and autonomy affected runtime behavior

## Week 10: The Job Is Changing, Not Disappearing

### What the course is really teaching

The final week asks what is next for AI software engineering.

The concrete answer suggested by the earlier weeks is that the developer role expands. It does not vanish.

A modern developer increasingly needs to be able to:
- specify
- orchestrate
- verify
- secure
- review
- operate

## The Course in One Sentence

CS146S teaches that the real skill is not asking AI to write code.

The real skill is building a workflow in which AI-generated code can be directed, tested, reviewed, secured, deployed, and trusted enough to keep.

## What to Practice If You Only Have One Weekend

If you want the highest-yield version of the course in two days, do this:

### Day 1
- Practice three prompt styles on one task
- Add one structured-output LLM feature to a small app
- Build one tiny MCP-style tool wrapper

### Day 2
- Run tests and one security scan
- Review one AI-generated diff manually
- Write down one automation you would actually reuse

That is already enough to understand what this course is really about.
