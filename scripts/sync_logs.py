import os
import json
import glob
import re
from datetime import datetime

APP_DATA_DIR = os.path.expanduser(r"~\.gemini\antigravity-ide")
BRAIN_DIR = os.path.join(APP_DATA_DIR, "brain")
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AGENT_LOGS_DIR = os.path.join(WORKSPACE_DIR, ".agent-logs")

TOOL_TYPES = {
    "LIST_DIRECTORY", "VIEW_FILE", "RUN_COMMAND", "WRITE_TO_FILE",
    "REPLACE_FILE_CONTENT", "MULTI_REPLACE_FILE_CONTENT", "GREP_SEARCH",
    "CODE_ACTION", "MANAGE_TASK", "SCHEDULE", "ASK_QUESTION"
}

def clean_user_prompt(content):
    if not content:
        return ""
    match = re.search(r'<USER_REQUEST>\s*(.*?)\s*</USER_REQUEST>', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return content.strip()

def process_transcript(transcript_path):
    if not os.path.exists(transcript_path):
        return

    parts = transcript_path.replace("\\", "/").split("/")
    try:
        conv_idx = parts.index("brain") + 1
        session_id = parts[conv_idx]
    except Exception:
        session_id = "unknown-session"

    entries = []
    with open(transcript_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                data = json.loads(line)
                entries.append(data)
            except Exception:
                pass

    if not entries:
        return

    turns = []
    current_turn = None
    first_time = None
    last_time = None

    for item in entries:
        created_at = item.get("created_at", "")
        if created_at:
            if not first_time:
                first_time = created_at
            last_time = created_at

        item_type = item.get("type", "")
        source = item.get("source", "")

        # Detect User Input
        if item_type == "USER_INPUT" or source == "USER_EXPLICIT":
            content = item.get("content", "")
            prompt_text = clean_user_prompt(content)
            if prompt_text:
                current_turn = {
                    "timestamp": created_at,
                    "prompt": prompt_text,
                    "response": None,
                    "response_timestamp": None
                }
                turns.append(current_turn)

        # Detect Model Text Response (must ignore intermediate tool outputs)
        elif source == "MODEL" and current_turn is not None:
            content = item.get("content", "")
            if item_type in ["PLANNER_RESPONSE", "MODEL_RESPONSE", "ASSISTANT_RESPONSE"] and content:
                # Exclude strings starting with Created At: tool outputs if any
                if not content.startswith("Created At:"):
                    current_turn["response"] = content.strip()
                    current_turn["response_timestamp"] = created_at
            elif content and item_type not in TOOL_TYPES and not content.startswith("Created At:"):
                current_turn["response"] = content.strip()
                current_turn["response_timestamp"] = created_at

    if not turns:
        return

    date_str = first_time[:10] if first_time else datetime.utcnow().strftime("%Y-%m-%d")

    try:
        dt = datetime.strptime(first_time.replace("Z", "+00:00"), "%Y-%m-%dT%H:%M:%S%z")
        filename_time = dt.strftime("%Y-%m-%d_%H-%M-%S")
    except Exception:
        filename_time = datetime.utcnow().strftime("%Y-%m-%d_%H-%M-%S")

    log_filename = f"{filename_time}_{session_id}.md"
    os.makedirs(AGENT_LOGS_DIR, exist_ok=True)
    out_path = os.path.join(AGENT_LOGS_DIR, log_filename)

    header = f"""---
session_id: {session_id}
date: {date_str}
author: srich
model: Gemini 3.6 Flash
tool: Antigravity IDE
project: 8x-amazon-rebuild
total_exchanges: {len(turns)}
first_prompt_time: {first_time}
last_prompt_time: {last_time}
---

# Session Log - {date_str}

Session: `{session_id[:8]}` | Project: `8x-amazon-rebuild` | Author: `srich`

---
"""

    log_body = header
    for idx, turn in enumerate(turns, start=1):
        p_time = turn["timestamp"]
        prompt = turn["prompt"]
        resp_time = turn["response_timestamp"] or p_time
        response = turn["response"] or "(Response in progress / pending)"

        log_body += f"""
[LOG_ENTRY type=PROMPT num={idx} session={session_id}]
timestamp: {p_time}
model: Gemini 3.6 Flash

{prompt}


[LOG_ENTRY type=RESPONSE num={idx} session={session_id}]
timestamp: {resp_time}
model: Gemini 3.6 Flash

{response}
"""

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(log_body.strip() + "\n")

    print(f"Synced session {session_id} to {out_path}")

def sync_all():
    transcripts = glob.glob(os.path.join(BRAIN_DIR, "*", ".system_generated", "logs", "transcript.jsonl"))
    for t in transcripts:
        process_transcript(t)

if __name__ == "__main__":
    sync_all()
