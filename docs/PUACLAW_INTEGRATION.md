# PUAClaw Integration

## Summary

`PUAClaw` was cloned into the local vendor tree as a reference corpus:

- `/Users/wizout/op/openclaw/vendor/PUAClaw`

The raw repository is a satirical/manipulation-oriented framework. It was **not** wired into OpenClaw verbatim.

Instead, a filtered operational subset was integrated for the 三省六部 workflow:

- keep: role clarity, dispatch framing, benchmark awareness, real deadlines, explicit acceptance criteria
- reject: emotional blackmail, threats, shame, deception, fabricated urgency, identity override

## Installed Skills

Repository-level copies:

- `/Users/wizout/op/openclaw/.agents/skills/pua-ops-dispatch/SKILL.md`
- `/Users/wizout/op/openclaw/.agents/skills/pua-ops-planning/SKILL.md`
- `/Users/wizout/op/openclaw/.agents/skills/pua-ops-governance/SKILL.md`
- `/Users/wizout/op/openclaw/.agents/skills/pua-ops-review/SKILL.md`
- `/Users/wizout/op/openclaw/.agents/skills/pua-ops-execution/SKILL.md`
- `/Users/wizout/op/openclaw/.agents/skills/pua-ops-talent/SKILL.md`
- `/Users/wizout/op/openclaw/.agents/skills/pua-ops-briefing/SKILL.md`

Runtime/local copies:

- `/Users/wizout/.openclaw/skills/pua-ops-dispatch/SKILL.md`
- `/Users/wizout/.openclaw/skills/pua-ops-planning/SKILL.md`
- `/Users/wizout/.openclaw/skills/pua-ops-governance/SKILL.md`
- `/Users/wizout/.openclaw/skills/pua-ops-review/SKILL.md`
- `/Users/wizout/.openclaw/skills/pua-ops-execution/SKILL.md`
- `/Users/wizout/.openclaw/skills/pua-ops-talent/SKILL.md`
- `/Users/wizout/.openclaw/skills/pua-ops-briefing/SKILL.md`

Workspace copies:

- `/Users/wizout/.openclaw/workspace-taizi/skills/pua-ops-dispatch/SKILL.md`
- `/Users/wizout/.openclaw/workspace-zhongshu/skills/pua-ops-planning/SKILL.md`
- `/Users/wizout/.openclaw/workspace-shangshu/skills/pua-ops-governance/SKILL.md`

## Behavioral Wiring

The following prompt layers were updated:

- `/Users/wizout/.openclaw/workspace-taizi/SOUL.md`
- `/Users/wizout/.openclaw/workspace-zhongshu/SOUL.md`
- `/Users/wizout/.openclaw/workspace-shangshu/SOUL.md`

Effects:

- `taizi`: stronger task reframing before dispatch
- `zhongshu`: stronger plan completeness before review/dispatch
- `shangshu`: stronger execution governance, escalation, and acceptance control

## Validation

Live validation succeeded at the behavior layer:

- `taizi` answered with `pua-ops-dispatch` when asked for the new PUA skill name
- gateway restarted successfully after installation

Known quirk:

- `openclaw skills list --json` can already see `pua-ops-*` as eligible project skills
- if a `pua-ops-*` name does not appear in `systemPromptReport.skills.entries`, that means it was not surfaced into that run's active prompt subset; it does **not** mean installation failed
- some workspace-local skill symlinks were rejected with `Skipping skill path that resolves outside its configured root`, so stable installs should prefer real directories under repo `.agents/skills` and `~/.openclaw/skills`
- however, the new rules are active through the updated workspace prompt layer and installed skill docs

## Recommended Feishu Test

Ask in Feishu:

```text
下旨：把“学习并安装一个新技能”整理成标准任务令，必须带目标、范围、优先级、时效、产出、验收、风险。
```

Expected:

- `taizi` should produce a much tighter dispatch brief
- `zhongshu` should return a more structured execution plan
- `shangshu` should push with clearer ownership, deadlines, and fallback handling
