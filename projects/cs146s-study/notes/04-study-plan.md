# Study Plan

## Objective

Use CS146S as a structured template for becoming more effective at AI-native software engineering, while mapping the lessons back into this repository.

## Recommended Study Order

### Phase 1: Foundations

Study first:
- Week 1: prompting and model behavior
- Week 2: agent anatomy and MCP
- Week 3: context and IDE setup

Output to produce:
- a prompt notebook
- a local MCP experiment
- a repository guidance checklist

What to look for:
- where prompts fail
- where context boundaries fail
- what tool interfaces make the largest difference

### Phase 2: Agent Workflow Design

Study next:
- Week 4: agent patterns and automation
- Week 5: terminal-native agent workflows

Output to produce:
- one repeatable automation
- one multi-step agent workflow with rollback

What to look for:
- supervision boundaries
- autonomy defaults
- repeatability and idempotence

### Phase 3: Reliability Discipline

Study next:
- Week 6: testing and security
- Week 7: review, support, trust

Output to produce:
- a security review checklist
- a code review rubric for AI-generated diffs

What to look for:
- failure modes of generated code
- verification gaps
- where AI review helps and where it is shallow

### Phase 4: Product and Operations

Study last:
- Week 8: UI and app generation
- Week 9: post-deployment agents
- Week 10: future workflows

Output to produce:
- one small end-to-end generated application
- one operations/monitoring note for agent systems
- one viewpoint memo about future developer roles

What to look for:
- generated UI quality versus maintainability
- what breaks after deployment
- which developer tasks are changing fastest

## Compression Plan for Self-Study

If time is limited, use this 4-session compression:

1. Session 1: Weeks 1-3
   - Prompting, MCP, context engineering
2. Session 2: Weeks 4-5
   - Agent patterns, automations, terminal workflows
3. Session 3: Weeks 6-7
   - Security, testing, trust, review
4. Session 4: Weeks 8-10
   - App generation, observability, future roles

## How This Maps Back to OpenClaw

The most directly relevant CS146S takeaways for this repository are:
- better task specs before agent execution
- tighter tool routing and smaller agent surfaces
- stronger verification after model output
- more explicit post-deployment checks for agent workflows
- documented human review for critical automation changes

## Bottom Line

To study this course well, do not just read the links. Reproduce the workflow logic:
- prompt
- tool
- spec
- test
- review
- operate

That is the recurring structure underneath the public syllabus.
