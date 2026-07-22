# Playbook: AI Feature

**Goal:** Integrate AI capabilities (LLM, embeddings, RAG) into the application.

**Trigger:** AI-powered feature request, chatbot, content generation, recommendation, search.

**Inputs:**
- AI use case description
- Data for AI processing
- Expected output format
- Latency requirements

**Outputs:**
- AI integration implementation
- Prompt engineering
- Error handling for AI failures
- Cost considerations

---

## Required Agents

| Agent | Role |
|-------|------|
| `ai-engineer` | Primary — LLM integration, prompt engineering |
| `backend` | API routes, server logic |
| `database` | Vector storage, embeddings |
| `security` | API key management, input sanitization |
| `reviewer` | Code quality review |

## Required Skills

| Skill | When to Load |
|-------|-------------|
| `ai-patterns` | Always — AI integration patterns |
| `prompt-engineering` | Prompt design and optimization |
| `rag-patterns` | If RAG (retrieval-augmented generation) |
| `mcp-integration` | If using MCP servers |
| `llm-integration` | LLM API integration |
| `agent-design` | If building AI agents |

## Required Commands

| Command | When to Use |
|---------|-------------|
| `/review` | Code quality review |
| `/security-scan` | Verify API key security |

---

## Process

### Step 1: Design (15 min)

1. **Define the use case** — What should AI do?
2. **Choose the model** — GPT-4, Claude, local model?
3. **Design prompts** — System + user prompts
4. **Define input/output** — What goes in, what comes out?
5. **Plan error handling** — What if AI fails?
6. **Estimate cost** — Token usage, API costs

### Step 2: Implement (varies)

1. **Create API route** — `src/app/api/ai/[feature]/route.ts`
2. **Add input validation** — Sanitize user input
3. **Implement prompt** — System + user messages
4. **Call LLM API** — With proper error handling
5. **Parse response** — Extract structured data
6. **Add fallback** — Graceful degradation if AI fails

```typescript
// AI route pattern
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    const { text } = await generateText({
      model: openai('gpt-4'),
      system: 'You are a helpful assistant.',
      prompt: prompt,
    });
    
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error('AI error:', error);
    return NextResponse.json(
      { error: 'AI service temporarily unavailable' },
      { status: 503 }
    );
  }
}
```

### Step 3: Prompt Engineering (15 min)

1. **Write system prompt** — Define AI role and constraints
2. **Write user prompt** — Clear, specific instructions
3. **Add examples** — Few-shot if needed
4. **Test prompts** — Try different inputs
5. **Optimize** — Balance quality vs cost vs speed

Prompt best practices:
- Be specific and clear
- Provide context
- Use structured output (JSON)
- Set constraints (length, format)
- Include error handling instructions

### Step 4: Add RAG (if needed)

1. **Chunk documents** — Split into pieces
2. **Generate embeddings** — Store in vector DB
3. **Retrieve relevant chunks** — Semantic search
4. **Include in prompt** — Augment with context
5. **Generate response** — With retrieved context

### Step 5: Verify (10 min)

1. **Test with sample inputs** — Various scenarios
2. **Test error cases** — Invalid input, API failure
3. **Check response quality** — Is output useful?
4. **Check latency** — Is it fast enough?
5. **Check cost** — Is it within budget?
6. **Run `/review`** — Code quality

---

## Validation Steps

- [ ] AI fails gracefully (fallback available)
- [ ] API keys in environment variables
- [ ] User input is sanitized
- [ ] Response is parsed and validated
- [ ] Error messages don't leak AI internals
- [ ] Cost is within budget
- [ ] Latency is acceptable
- [ ] Prompts are documented

## Success Criteria

- AI feature works reliably
- Graceful degradation on failure
- Cost and latency are acceptable
- Security is maintained
- Prompts are optimized

## Common Pitfalls

| Pitfall | Why It's Wrong | Correct Approach |
|---------|---------------|-----------------|
| Hardcoded API keys | Security risk | Use environment variables |
| No error handling | App crashes on AI failure | Graceful fallback |
| Vague prompts | Poor quality output | Specific, detailed prompts |
| No input sanitization | Prompt injection | Sanitize all user input |
| Ignoring cost | Unexpected bills | Monitor and limit usage |
| Synchronous AI calls | Slow UI | Use streaming or background |
| No caching | Unnecessary API calls | Cache frequent requests |
