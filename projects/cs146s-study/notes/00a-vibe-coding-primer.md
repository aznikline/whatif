# Vibe Coding Primer

## First: What "vibe coding" Usually Means

In online discussion, "vibe coding" usually means building software by giving high-level natural-language instructions to an AI tool and letting it generate a large portion of the code, then iterating by saying things like:

- "make the layout cleaner"
- "add authentication"
- "fix the failing tests"
- "turn this into a dashboard"

This is the seductive version of AI-assisted development because it feels fast. You describe what you want, the tool produces code, and progress appears visible immediately.

But that is only the surface.

## Why Beginners Get Stuck

Beginners often assume vibe coding means they no longer need software engineering discipline. That is the mistake.

What actually happens is this:

1. The AI generates a lot of code quickly.
2. The beginner sees apparent progress.
3. Hidden problems accumulate:
   - unclear requirements
   - broken assumptions
   - missing tests
   - insecure defaults
   - poor folder structure
   - code the user cannot explain
4. The system becomes harder to change than if it had been built more slowly.

So the right beginner definition is:

> Vibe coding is fast natural-language-driven software generation, but it only becomes real engineering when it is paired with specification, verification, and review.

## The Simple Mental Model

If you are new, do not think of AI as "the thing that writes software for me."

Think of AI as a very fast junior collaborator that:
- writes quickly
- guesses aggressively
- needs precise direction
- often sounds more confident than it is
- must be checked after important changes

That model is much safer.

## The Four Beginner Rules

### Rule 1: Ask for small changes, not giant miracles

Bad beginner prompt:
- "Build me a complete SaaS product with auth, billing, analytics, and AI features"

Better beginner prompt:
- "Create a FastAPI endpoint that accepts a note and returns extracted action items in JSON. Add one unit test."

Smaller requests make it easier to see what changed and whether the change is correct.

### Rule 2: Always know what the AI is changing

Before accepting output, answer:
- Which files changed?
- What behavior changed?
- How would I verify it?

If you cannot answer those three questions, you are no longer steering.

### Rule 3: Never trust green-looking code without verification

The generated code may look polished and still be wrong.

At minimum, check one of the following:
- tests pass
- the feature works manually
- the API returns the expected shape
- lint/type checks stay clean
- obvious security risks are not introduced

### Rule 4: Keep a written trail

When using AI heavily, write down:
- what you asked for
- what changed
- what failed
- what you learned

This matters because AI sessions are temporary, but engineering decisions are not.

## How CS146S Reframes Vibe Coding

CS146S is valuable because it takes the messy online idea of vibe coding and turns it into a structured engineering workflow.

The course quietly says:
- prompting matters
- context matters
- tools matter
- testing matters
- security matters
- review matters
- deployment feedback matters

That is the mature version of vibe coding.

## A Good Beginner Workflow

If you are starting from zero, use this loop:

1. Write a short spec
   - What am I building?
   - What inputs and outputs do I expect?
2. Ask AI for one bounded change
3. Inspect the changed files
4. Run one verification step
5. Fix the mistakes
6. Write down what happened

That is enough to learn.

## What You Do Not Need to Know on Day One

You do not need to understand every advanced term immediately.
You do not need to build multi-agent systems on your first day.
You do not need a perfect prompt.

You do need:
- curiosity
- a small problem
- a way to verify results
- willingness to slow down when the AI output stops making sense

## Bottom Line

Vibe coding is not fake, but raw vibe coding is not enough.

The skill is not in making AI generate code.
The skill is in making AI-generated code become understandable, testable, and safe enough to keep.

That is the bridge CS146S helps build.
