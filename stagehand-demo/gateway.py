import json
import os

import httpx
from stagehand import LLMStructuredGenerateResult


async def generate(params):
    messages = []
    if params.system_prompt:
        messages.append({"role": "system", "content": params.system_prompt})
    for message in params.messages:
        blocks = (
            message.content if isinstance(message.content, list) else [message.content]
        )
        content = []
        for block in blocks:
            value = block.root
            if value.type == "text":
                content.append({"type": "text", "text": value.text})
            else:
                content.append(
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{value.mime_type};base64,{value.data}"
                        },
                    }
                )
        messages.append({"role": message.role.value, "content": content})

    response_format = params.response_format
    if response_format.type != "json_schema":
        raise ValueError("The demo expects Stagehand structured generation.")
    payload = {
        "messages": messages,
        "model": "openai/gpt-6-luna",
        "response_format": {
            "type": "json_schema",
            "json_schema": {
                "name": response_format.name,
                "schema": response_format.schema_.model_dump(
                    by_alias=True, exclude_none=True
                ),
            },
        },
    }
    base = "https://ai-gateway.vercel.sh/v1"
    async with httpx.AsyncClient(timeout=40) as client:
        response = await client.post(
            f"{base}/chat/completions",
            headers={"Authorization": f"Bearer {os.environ['AI_GATEWAY_API_KEY']}"},
            json=payload,
        )
        response.raise_for_status()
        text = response.json()["choices"][0]["message"]["content"]
    return LLMStructuredGenerateResult.model_validate(
        {
            "role": "assistant",
            "content": {"type": "text", "text": text},
            "output_format": "json_schema",
            "structured_content": json.loads(text),
        }
    )
