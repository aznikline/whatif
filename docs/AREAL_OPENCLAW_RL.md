# AReaL-driven RL Iteration for OpenClaw

This guide wires OpenClaw to AReaL's online RL proxy gateway, then loops:
1) start_session → 2) interact → 3) set_reward → 4) refresh session.

## 0) Preconditions
- AReaL repo available at `/Users/wizout/op/rl/areal`
- GPU node running AReaL RL service (see `areal/examples/openclaw/README.md`)
- You have the AReaL gateway URL and admin key

## 1) Start the AReaL RL service (GPU machine)
Use the built-in example:
- `areal/examples/openclaw/train.py`
- `areal/examples/openclaw/config.yaml`

## 2) Start/refresh a session (get session API key)
From this repo:
```bash
./ops/bin/areal-start-session.sh http://<gateway> --admin-key <admin-key>
```
This returns `SESSION_API_KEY` and `SESSION_ID`.

## 3) Configure an isolated OpenClaw profile
We keep your main OpenClaw untouched by using a dedicated profile:
```bash
export AREAL_GATEWAY_URL=http://<gateway>
export AREAL_SESSION_API_KEY=sk-sess-...   # from step 2
export AREAL_MODEL_ID=Qwen/Qwen3-0.6B      # must match your AReaL actor model
./ops/bin/openclaw-areal-profile.sh
```

## 4) Run OpenClaw against the AReaL gateway
Use the dedicated profile:
```bash
openclaw --profile areal agent --message "连接测试"
```
All LLM calls go to the AReaL proxy and are logged for RL.

## 5) Assign reward
```bash
./ops/bin/areal-set-reward.sh http://<gateway> --api-key <SESSION_API_KEY> --reward 1.0
```

## 6) Refresh the session for the next episode
```bash
./ops/bin/areal-start-session.sh http://<gateway> --admin-key <admin-key> --api-key <SESSION_API_KEY>
```

Repeat 4 → 6 to create a reward-driven training loop.

## Notes
- The OpenClaw RL profile does not configure iMessage by default. If you want iMessage-driven RL episodes, we can port the channel config into the `areal` profile.
- If you want to run RL with the main OpenClaw instance directly, we can switch its model provider to the AReaL gateway (risk: interrupts production usage).
