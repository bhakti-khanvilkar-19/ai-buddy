SECTION_CONTENT['agent-protocols'] = { default: `
# Agent Communication Protocols

## MCP — Model Context Protocol

MCP is an open protocol by Anthropic (2024) that standardizes how AI models connect to external tools, data sources, and services. It's the USB-C of AI integrations — one standard connection for everything.

\`\`\`
Before MCP:  Each tool needs a custom integration per AI system
After MCP:   One MCP server → works with any MCP-compatible AI client
\`\`\`

### MCP Architecture

\`\`\`mermaid
flowchart LR
    H[Host app<br/>Claude Code · Cursor · Claude.ai] <-->|"MCP protocol<br/>(JSON-RPC over stdio/HTTP)"| S1[MCP server: GitHub]
    H <-->|MCP| S2[MCP server: Postgres]
    H <-->|MCP| S3[MCP server: Filesystem]
    S1 --> G[(GitHub API)]
    S2 --> D[(Database)]
    S3 --> F[(Local files)]
\`\`\`

### Writing an MCP Server (Python)

\`\`\`python
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import Tool, TextContent
import mcp.types as types

server = Server("my-tools")

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="get_customer",
            description="Look up a customer by ID",
            inputSchema={
                "type": "object",
                "properties": {
                    "customer_id": {"type": "string", "description": "Customer ID"}
                },
                "required": ["customer_id"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "get_customer":
        customer = db.get_customer(arguments["customer_id"])
        return [TextContent(type="text", text=str(customer))]

async def main():
    async with stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())
\`\`\`

### Connecting MCP to Claude Code

\`\`\`json
// ~/.claude/settings.json
{
  "mcpServers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/my_mcp_server.py"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
\`\`\`

### Available MCP Servers (2025)

- **@modelcontextprotocol/server-filesystem** — file system access
- **@modelcontextprotocol/server-github** — GitHub repos, PRs, issues
- **@modelcontextprotocol/server-postgres** — PostgreSQL queries
- **@modelcontextprotocol/server-brave-search** — web search
- **@modelcontextprotocol/server-slack** — Slack integration
- Community: 1000+ servers on mcp.so

---

## A2A — Agent-to-Agent Protocol

Google's open protocol (2025) for agents to discover and call each other — like an "API directory" for AI agents.

\`\`\`
Agent A wants to research a topic
    ↓ A2A discovery: find available agent capabilities
    → Finds "Research Agent" that has search + summarize skills
    ↓ A2A call to Research Agent
    ← Returns structured research results
Agent A continues with results
\`\`\`

Key concepts:
- **Agent Card:** JSON describing what an agent can do (like OpenAPI spec for agents)
- **Task:** Unit of work sent from one agent to another
- **Streaming:** Agents can stream results back in real-time

A2A complements MCP — MCP connects agents to tools/data, A2A connects agents to other agents.

---

## Tool Calling / Function Calling

The most basic and universal form of agent-tool communication. The LLM decides to call a function; you execute it and return the result.

\`\`\`python
import anthropic

client = anthropic.Anthropic()

tools = [{
    "name": "get_stock_price",
    "description": "Get the current stock price for a given ticker",
    "input_schema": {
        "type": "object",
        "properties": {
            "ticker": {"type": "string", "description": "Stock ticker symbol, e.g. AAPL"}
        },
        "required": ["ticker"]
    }
}]

# First call — model decides to use a tool
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's Apple's current stock price?"}]
)

# Model returns a tool_use block
if response.stop_reason == "tool_use":
    tool_call = response.content[0]
    # You execute the tool
    result = get_stock_price(tool_call.input["ticker"])

    # Feed result back to model
    final = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=tools,
        messages=[
            {"role": "user", "content": "What's Apple's current stock price?"},
            {"role": "assistant", "content": response.content},
            {"role": "user", "content": [{"type": "tool_result",
                                           "tool_use_id": tool_call.id,
                                           "content": str(result)}]}
        ]
    )
\`\`\`

---

## Structured Outputs

Force the model to return valid JSON matching a specific schema. Guarantees parseable output.

\`\`\`python
from pydantic import BaseModel

class ExtractedData(BaseModel):
    company_name: str
    founded_year: int
    employees: int | None
    headquarters: str

# With PydanticAI — auto-validates and retries if invalid
agent = Agent("claude-sonnet-4-6", result_type=ExtractedData)
result = agent.run_sync("Anthropic was founded in 2021 by former OpenAI researchers. Based in San Francisco.")
print(result.data.company_name)   # "Anthropic"
print(result.data.founded_year)   # 2021
\`\`\`

---

## JSON Mode

Ask the model to return only valid JSON (without a specific schema). Useful when you know the output will be JSON but the structure varies.

\`\`\`python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="Respond only with valid JSON. No explanation, no markdown.",
    messages=[{"role": "user", "content": "Extract key facts from: Anthropic raised $7.3B in 2024"}]
)
# → {"company": "Anthropic", "amount": "7.3B", "year": 2024, "type": "funding"}
\`\`\`
` };
