# Beginner Glossary

## LLM

Large Language Model. A model that predicts the next token in text and can be used for reasoning, code generation, summarization, and tool use.

For a beginner, the important point is simple: it is a probabilistic generator, not a guaranteed truth machine.

## Prompt

The instruction you give to the model.

A weak prompt produces vague or unstable output. A strong prompt gives the model clear context, task boundaries, output expectations, and constraints.

## Context

The information the model can see when answering.

In coding work, context includes files, specs, errors, test failures, repository guidance, and recent task history.

## Coding Agent

A model-based system that can do more than chat. It can inspect files, call tools, edit code, run commands, and sometimes coordinate multiple steps.

## Tool Calling

A model deciding to invoke a tool instead of only producing plain text. Example: calling a search tool, a file reader, or a function that returns structured data.

## MCP

Model Context Protocol. A way to expose tools, resources, and prompts to model-driven systems through a standard interface.

Beginner version: MCP is one practical way to make models interact with external systems in a structured way.

## Spec

A written description of what should be built.

A good spec reduces ambiguity before code is generated.

## PRD

Product Requirements Document. A product-focused spec describing goals, user needs, scope, and expected behavior.

In AI coding workflows, a PRD often doubles as context for agents.

## RAG

Retrieval-Augmented Generation. A pattern where the model retrieves relevant information first, then uses it to answer or generate output.

## Reflexion

A prompting or agent pattern where the system critiques its own earlier output and tries again with that feedback.

## Autonomy Level

How much freedom an agent has to act without asking for confirmation. Higher autonomy can increase speed but also risk.

## Semgrep

A static analysis tool used to scan code for bugs, insecure patterns, secrets, and dependency risks.

## SAST

Static Application Security Testing. Security analysis performed without running the program.

## DAST

Dynamic Application Security Testing. Security testing performed while the program is running.

## Code Review

A structured inspection of code changes before they are accepted. The goal is not just style cleanup; it includes correctness, tests, security, maintainability, and API quality.

## Observability

The ability to understand what a running system is doing by looking at logs, traces, metrics, and other runtime evidence.

## Incident Response

The process of diagnosing and mitigating failures in production systems.

## Vibe Coding

Natural-language-driven software generation with heavy AI assistance. The dangerous version stops at generation. The mature version includes spec, verification, review, and operational feedback.
