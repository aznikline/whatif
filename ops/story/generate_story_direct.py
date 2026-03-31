#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import signal
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path('/Users/wizout/op/openclaw')
AUTH_FILE = ROOT / '.openclaw-state/agents/daily-horror/agent/auth-profiles.json'
DEFAULT_PRIMARY = 'openrouter/xiaomi/mimo-v2-pro'
DEFAULT_SECONDARY = 'openrouter/stepfun/step-3.5-flash:free'
DEFAULT_FALLBACK = 'ollama/qwen3.5:4b'


def load_auth() -> dict:
    return json.loads(AUTH_FILE.read_text(encoding='utf-8'))


def get_profile(provider_key: str) -> dict:
    auth = load_auth()
    profile = auth.get('profiles', {}).get(provider_key)
    if not isinstance(profile, dict):
        raise RuntimeError(f'missing auth profile: {provider_key}')
    return profile


def post_json(url: str, payload: dict, headers: dict[str, str], timeout: int) -> dict:
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    old_handler = None

    def _raise_timeout(signum, frame):
        raise TimeoutError(f'request exceeded hard timeout ({timeout}s)')

    if hasattr(signal, 'SIGALRM'):
        old_handler = signal.signal(signal.SIGALRM, _raise_timeout)
        signal.alarm(max(1, timeout))
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode('utf-8', errors='replace'))
    finally:
        if hasattr(signal, 'SIGALRM'):
            signal.alarm(0)
            if old_handler is not None:
                signal.signal(signal.SIGALRM, old_handler)


def normalize_model_name(provider: str, model: str) -> str:
    if model.startswith(provider + '/'):
        return model.split('/', 1)[1]
    return model


def model_provider(model: str) -> str:
    if '/' not in model:
        return 'openrouter'
    return model.split('/', 1)[0]


def call_openrouter(prompt: str, model: str, temperature: float, top_p: float, seed: int, timeout: int, max_tokens: int) -> dict:
    profile = get_profile('openrouter:default')
    url = profile['baseUrl'].rstrip('/') + '/chat/completions'
    payload = {
        'model': normalize_model_name('openrouter', model),
        'messages': [
            {'role': 'system', 'content': 'You are a Chinese literary horror fiction model. Output only the full story body.'},
            {'role': 'user', 'content': prompt},
        ],
        'temperature': temperature,
        'top_p': top_p,
        'seed': seed,
        'reasoning': {
            'effort': 'none',
            'exclude': True,
        },
        'max_tokens': max_tokens,
    }
    headers = {
        'Authorization': f"Bearer {profile['token']}",
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/aznikline/whatif',
        'X-Title': 'daily-horror',
    }
    response = post_json(url, payload, headers, timeout)
    text = ''
    try:
        text = response['choices'][0]['message']['content'].strip()
    except Exception as exc:
        raise RuntimeError(f'openrouter malformed response: {exc}')
    return {'provider': 'openrouter', 'model': model, 'text': text, 'raw': response}


def call_ollama(prompt: str, model: str, temperature: float, top_p: float, seed: int, timeout: int, max_tokens: int) -> dict:
    profile = get_profile('ollama:default')
    url = profile['baseUrl'].rstrip('/') + '/api/generate'
    payload = {
        'model': normalize_model_name('ollama', model),
        'prompt': prompt,
        'stream': False,
        'options': {
            'temperature': temperature,
            'top_p': top_p,
            'seed': seed,
            'num_predict': max_tokens,
        },
    }
    headers = {'Content-Type': 'application/json'}
    response = post_json(url, payload, headers, timeout)
    text = (response.get('response') or '').strip()
    return {'provider': 'ollama', 'model': model, 'text': text, 'raw': response}


def call_model(prompt: str, model: str, temperature: float, top_p: float, seed: int, timeout: int, max_tokens: int) -> dict:
    provider = model_provider(model)
    if provider == 'ollama':
        return call_ollama(prompt, model, temperature, top_p, seed, timeout, max_tokens)
    return call_openrouter(prompt, model, temperature, top_p, seed, timeout, max_tokens)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--prompt-file', required=True)
    ap.add_argument('--output-file', required=True)
    ap.add_argument('--raw-file', required=True)
    ap.add_argument('--meta-file', required=True)
    ap.add_argument('--timeout', type=int, default=120)
    ap.add_argument('--primary-model', default=DEFAULT_PRIMARY)
    ap.add_argument('--secondary-model', default=DEFAULT_SECONDARY)
    ap.add_argument('--fallback-model', default=DEFAULT_FALLBACK)
    ap.add_argument('--temperature', type=float, default=0.96)
    ap.add_argument('--top-p', type=float, default=0.9)
    ap.add_argument('--seed', type=int, required=True)
    ap.add_argument('--max-tokens', type=int, default=2200)
    args = ap.parse_args()

    prompt = Path(args.prompt_file).read_text(encoding='utf-8')
    errors: list[dict] = []
    result = None
    started = time.time()
    try:
        result = call_model(prompt, args.primary_model, args.temperature, args.top_p, args.seed, args.timeout, args.max_tokens)
    except Exception as exc:
        errors.append({'provider': model_provider(args.primary_model), 'model': args.primary_model, 'error': str(exc)})
        try:
            result = call_model(prompt, args.secondary_model, max(0.88, args.temperature - 0.06), args.top_p, args.seed, args.timeout, args.max_tokens)
        except Exception as exc2:
            errors.append({'provider': model_provider(args.secondary_model), 'model': args.secondary_model, 'error': str(exc2)})
            try:
                result = call_ollama(prompt, args.fallback_model, max(0.75, args.temperature - 0.12), args.top_p, args.seed, args.timeout, args.max_tokens)
            except Exception as exc3:
                errors.append({'provider': 'ollama', 'model': args.fallback_model, 'error': str(exc3)})
                Path(args.raw_file).write_text(json.dumps({'errors': errors}, ensure_ascii=False, indent=2), encoding='utf-8')
                Path(args.meta_file).write_text(json.dumps({'errors': errors, 'seed': args.seed}, ensure_ascii=False, indent=2), encoding='utf-8')
                return 1

    text = (result.get('text') or '').strip()
    if not text:
        errors.append({'provider': result.get('provider'), 'model': result.get('model'), 'error': 'empty_text'})
        Path(args.raw_file).write_text(json.dumps({'result': result, 'errors': errors}, ensure_ascii=False, indent=2), encoding='utf-8')
        Path(args.meta_file).write_text(json.dumps({'errors': errors, 'seed': args.seed}, ensure_ascii=False, indent=2), encoding='utf-8')
        return 1

    Path(args.output_file).write_text(text + '\n', encoding='utf-8')
    Path(args.raw_file).write_text(json.dumps({'result': result, 'errors': errors}, ensure_ascii=False, indent=2), encoding='utf-8')
    Path(args.meta_file).write_text(
        json.dumps(
            {
                'provider': result.get('provider'),
                'model': result.get('model'),
                'seed': args.seed,
                'temperature': args.temperature,
                'top_p': args.top_p,
                'elapsed_seconds': round(time.time() - started, 2),
                'errors': errors,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding='utf-8',
    )
    return 0


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except urllib.error.HTTPError as exc:
        body = exc.read().decode('utf-8', errors='replace')
        sys.stderr.write(f'HTTPError {exc.code}: {body}\n')
        raise
