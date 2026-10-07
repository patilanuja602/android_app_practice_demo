### Exact model

**Model name:** `Qwen/Qwen3-32B`

**Version/branch:** `main`

**Developer:** Qwen Team / Alibaba Cloud

**Parameters:** 32.8B

**Architecture:** Dense

**License:** Apache-2.0

**Native context:** 32,768 tokens

**Extended context:** 131,072 with YaRN 

### Official download page

[Qwen/Qwen3-32B — Official Hugging Face Repository](https://huggingface.co/Qwen/Qwen3-32B?utm_source=chatgpt.com)

**This is the exact repository you should give Antigravity.**

Do **not** use:

- `Qwen3-30B-A3B`
- `Qwen3-32B-Instruct`
- `Qwen3-32B-Thinking`
- `Qwen2.5-Coder-32B`
- community fine-tunes
- random GGUF/AWQ uploads

For our **baseline QA test-generation experiment**, the canonical model is:

```
Qwen/Qwen3-32B
```

The official Qwen documentation explicitly describes Qwen3's naming scheme and distinguishes the hybrid model with no suffix from `-Instruct`, `-Thinking`, and `-Base`. `Qwen3-32B` is the hybrid thinking/non-thinking model we selected. 

### If Antigravity needs the exact Hugging Face identifier

Give it this **exact string**:

```
Qwen/Qwen3-32B
```

And if it asks for the model URL:

```
https://huggingface.co/Qwen/Qwen3-32B
```

### One important thing for your VS Code setup

Don't download individual `.safetensors` files manually. The model is split across **17 safetensor files**, so the proper approach is to download the entire Hugging Face repository using `huggingface-cli`/`hf` or let Transformers download the repository automatically. The official repository currently identifies the model as a 33B-parameter BF16 model. 

For example:

```
pip install -U huggingface_hub

hf download Qwen/Qwen3-32B \
    --local-dir ./models/Qwen3-32B
```

That gives Antigravity an unambiguous local model directory:

```
your-project/
└── models/
    └── Qwen3-32B/
        ├── config.json
        ├── tokenizer.json
        ├── tokenizer_config.json
        ├── model-00001-of-00017.safetensors
        ├── model-00002-of-00017.safetensors
        ├── ...
        └── model-00017-of-00017.safetensors
```

**But:** your ThinkPad T480's ~15 GB RAM is **not sufficient for the normal BF16 Qwen3-32B**. Qwen's own benchmark shows about **62.8 GB GPU memory even for a short BF16 Transformers run**; AWQ-INT4 is around 19 GB GPU memory in that benchmark. 

So if you're going to run this in your **company GPU machine**, download the official `Qwen/Qwen3-32B` model above. If you're trying to run it directly on your T480, **stop before downloading the 33B BF16 model**—we should choose the appropriate quantized version/runtime instead.  download the exact model 
