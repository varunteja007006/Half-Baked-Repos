# Error Input

# Model Name: x-ai/grok-4-fast:free false

```bash
[Error [AI_TypeValidationError]: Type validation failed: Value: {"id":"gen-1759495293-WmQlHilELF1K29xP8wvK","provider":"xAI","model":"x-ai/grok-4-fast:free","object":"chat.completion.chunk","created":1759495295,"choices":[{"index":0,"delta":{"role":"assistant","content":"","reasoning":null,"reasoning_details":[],"annotations":[{"type":"file","file":{"hash":"ff8e11bd6616991ece787d4230e422a69c8390785f10270e989415bfea7a9517","name":"sample.pdf","content":[{"type":"text","text":"<file name=\"sample.pdf\">"},{"type":"text","text":"# Sample PDF \n\n## This is a simple PDF file. Fun fun fun.\n\nLorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus facilisis odio sed mi. Curabitur suscipit. Nullam vel nisi. Etiam semper ipsum ut lectus. Proin aliquam, erat eget pharetra commodo, eros mi condimentum quam, sed commodo justo quam ut velit. Integer a erat. Cras laoreet ligula cursus enim. Aenean scelerisque velit et tellus. Vestibulum dictum aliquet sem. Nulla facilisi. Vestibulum accumsan ante vitae elit. Nulla erat dolor, blandit in, rutrum quis, semper pulvinar, enim. Nullam varius congue risus. Vivamus sollicitudin, metus ut interdum eleifend, nisi tellus pellentesque elit, tristique accumsan eros quam et risus. Suspendisse libero odio, mattis sit amet, aliquet eget, hendrerit vel, nulla. Sed vitae augue. Aliquam erat volutpat. Aliquam feugiat vulputate nisl. Suspendisse quis nulla pretium ante pretium mollis. Proin velit ligula, sagittis at, egestas a, pulvinar quis, nisl.\n\nPellentesque sit amet lectus. Praesent pulvinar, nunc quis iaculis sagittis, justo quam lobortis tortor, sed vestibulum dui metus venenatis est. Nunc cursus ligula. Nulla facilisi. Phasellus ullamcorper consectetuer ante. Duis tincidunt, urna id condimentum luctus, nibh ante vulputate sapien, id sagittis massa orci ut enim. Pellentesque vestibulum convallis sem. Nulla consequat quam ut nisl. Nullam est. Curabitur tincidunt dapibus lorem. Proin velit turpis, scelerisque sit amet, iaculis nec, rhoncus ac, ipsum. Phasellus lorem arcu, feugiat eu, gravida eu, consequat molestie, ipsum. Nullam vel est ut ipsum volutpat feugiat. Aenean pellentesque.\n\nIn mauris. Pellentesque dui nisi, iaculis eu, rhoncus in, venenatis ac, ante. Ut odio justo, scelerisque vel, facilisis non, commodo a, pede. Cras nec massa sit amet tortor volutpat varius. Donec lacinia, neque a luctus aliquet, pede massa imperdiet ante, at varius lorem pede sed sapien. Fusce erat nibh, aliquet in, eleifend eget, commodo eget, erat. Fusce consectetuer. Cras risus tortor, porttitor nec, tristique sed, convallis semper, eros. Fusce vulputate ipsum a mauris. Phasellus mollis. Curabitur sed urna. Aliquam nec sapien non nibh pulvinar convallis. Vivamus facilisis augue quis quam. Proin cursus aliquet metus. Suspendisse lacinia. Nulla at tellus ac turpis eleifend scelerisque. Maecenas a pede vitae enim commodo interdum. Donec odio. Sed sollicitudin dui vitae justo.\n\nMorbi elit nunc, facilisis a, mollis a, molestie at, lectus. Suspendisse eget mauris eu tellus molestie cursus. Duis ut magna at justo dignissim condimentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus varius. Ut sit amet diam suscipit mauris ornare aliquam. Sed varius. Duis arcu. Etiam tristique massa eget dui. Phasellus congue. Aenean est erat, tincidunt eget, venenatis quis, commodo at, quam."},{"type":"text","text":"</file>"}]}}]},"finish_reason":null,"native_finish_reason":null,"logprobs":null}],"system_fingerprint":"fp_9362061f30"}.
Error message: [{"code":"invalid_union","errors":[[{"code":"invalid_value","values":["url_citation"],"path":["choices",0,"delta","annotations",0,"type"],"message":"Invalid input: expected \"url_citation\""},{"expected":"object","code":"invalid_type","path":["choices",0,"delta","annotations",0,"url_citation"],"message":"Invalid input: expected object, received undefined"}],[{"expected":"object","code":"invalid_type","path":["error"],"message":"Invalid input: expected object, received undefined"}]],"path":[],"message":"Invalid input"}]] {
value: [Object],
[cause]: [Array]
}
POST /api/open-router/multi-modal 200 in 4794ms
{"inputTokens":870,"outputTokens":317,"totalTokens":1187,"reasoningTokens":154,"cachedInputTokens":108}
```

Give this in readable format

# Output

Got it — let’s prettify and annotate that log so you can actually see what’s going on instead of wading through JSON soup.

---

### 1. Context

You hit your endpoint with model `x-ai/grok-4-fast:free`.
The response from OpenRouter included a **chunk** like this (simplified):

```json
{
  "id": "gen-1759495293-WmQlHilELF1K29xP8wvK",
  "provider": "xAI",
  "model": "x-ai/grok-4-fast:free",
  "object": "chat.completion.chunk",
  "created": 1759495295,
  "choices": [
    {
      "index": 0,
      "delta": {
        "role": "assistant",
        "content": "",
        "reasoning": null,
        "reasoning_details": [],
        "annotations": [
          {
            "type": "file",
            "file": {
              "hash": "ff8e11bd6616991ece787d4230e422a69c8390785f10270e989415bfea7a9517",
              "name": "sample.pdf",
              "content": [
                { "type": "text", "text": "<file name=\"sample.pdf\">" },
                {
                  "type": "text",
                  "text": "# Sample PDF\n\n## This is a simple PDF file. Fun fun fun.\n\nLorem ipsum..."
                },
                { "type": "text", "text": "</file>" }
              ]
            }
          }
        ]
      },
      "finish_reason": null,
      "native_finish_reason": null,
      "logprobs": null
    }
  ],
  "system_fingerprint": "fp_9362061f30"
}
```

So the model is streaming back **a file annotation** (`"type": "file"`) with the PDF embedded.

---

### 2. The SDK Validation Error

The `ai` SDK tried to validate this chunk against its schema.

Error payload (prettified):

```json
[
  {
    "code": "invalid_union",
    "errors": [
      [
        {
          "code": "invalid_value",
          "values": ["url_citation"],
          "path": ["choices", 0, "delta", "annotations", 0, "type"],
          "message": "Invalid input: expected \"url_citation\""
        },
        {
          "expected": "object",
          "code": "invalid_type",
          "path": ["choices", 0, "delta", "annotations", 0, "url_citation"],
          "message": "Invalid input: expected object, received undefined"
        }
      ],
      [
        {
          "expected": "object",
          "code": "invalid_type",
          "path": ["error"],
          "message": "Invalid input: expected object, received undefined"
        }
      ]
    ],
    "path": [],
    "message": "Invalid input"
  }
]
```

Translated into English:

- At `choices[0].delta.annotations[0].type`, it **expected `"url_citation"`**, but got `"file"`.
- At `choices[0].delta.annotations[0].url_citation`, it expected an object, but it was missing (because the model gave `file` instead).
- At `error`, it expected an object, but got `undefined`.

---

### 3. Usage Stats (at the bottom of your log)

```json
{
  "inputTokens": 870,
  "outputTokens": 317,
  "totalTokens": 1187,
  "reasoningTokens": 154,
  "cachedInputTokens": 108
}
```

So:

- Prompt length: 870 tokens
- Output so far: 317 tokens
- Total billed: 1187 tokens
- Model also reported 154 “reasoning tokens” (Grok’s internal thing)
- 108 input tokens were cache-hits (cheaper)

---

### 4. Root Cause

The Grok model is producing `"file"` annotations.
The `ai` SDK only allows `"url_citation"` (and maybe `"quote"`) in annotations.
So the type validator explodes before your code sees the chunk.

---

Readable summary:

- **Model:** `x-ai/grok-4-fast:free`
- **What came back:** a chunk with a `file` annotation (`sample.pdf`)
- **What SDK expected:** only `url_citation` annotations
- **Error:** `AI_TypeValidationError` because `"file"` ≠ `"url_citation"`

---

Want me to give you a **safe transform wrapper** around `streamText` that just drops anything not `url_citation` so this exact error disappears, while still passing through the rest of the chunk (role, content, etc.)?
