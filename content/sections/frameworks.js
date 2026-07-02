SECTION_CONTENT['frameworks'] = { default: `
# AI Development Frameworks

## Why Use a Framework?

Building agents from scratch means handling tool calling, memory, state management, retries, streaming, and observability yourself. Frameworks give you these building blocks so you can focus on what makes your agent unique.

---

## LangChain

The original LLM framework. Huge ecosystem of integrations and community.

\`\`\`python
from langchain_anthropic import ChatAnthropic
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for information."""
    return web_search(query)

llm = ChatAnthropic(model="claude-sonnet-4-6")
agent = create_tool_calling_agent(llm, [search_web], prompt)
executor = AgentExecutor(agent=agent, tools=[search_web])
result = executor.invoke({"input": "What's the latest in AI?"})
\`\`\`

**Strengths:** Massive integrations (vector DBs, tools, memory), large community.
**Weaknesses:** Can be over-engineered for simple tasks, steep learning curve.

---

## LangGraph

Built on top of LangChain. Models agent workflows as directed graphs with cycles — perfect for agents that need to loop, branch, or backtrack.

\`\`\`python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class AgentState(TypedDict):
    messages: list
    tool_results: list
    is_done: bool

def call_llm(state: AgentState):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def call_tool(state: AgentState):
    # execute the tool the LLM requested
    result = run_tool(state["messages"][-1])
    return {"tool_results": [result]}

def should_continue(state: AgentState):
    return "tools" if state["messages"][-1].tool_calls else END

graph = StateGraph(AgentState)
graph.add_node("llm", call_llm)
graph.add_node("tools", call_tool)
graph.add_conditional_edges("llm", should_continue)
graph.add_edge("tools", "llm")
app = graph.compile()
\`\`\`

**Strengths:** Stateful, handles complex flows with cycles, built-in persistence (checkpointing), human-in-the-loop support.
**Best for:** Complex agentic workflows where you need control over the flow.

---

## CrewAI

Framework for multi-agent systems. You define agents with roles and let them collaborate on tasks.

\`\`\`python
from crewai import Agent, Task, Crew

researcher = Agent(
    role="Research Specialist",
    goal="Find accurate information on any topic",
    backstory="Expert at web research and synthesizing information",
    tools=[search_tool, read_tool],
    llm=claude
)

writer = Agent(
    role="Content Writer",
    goal="Write clear, engaging content",
    backstory="Skilled technical writer",
    llm=claude
)

research_task = Task(description="Research {topic}", agent=researcher)
write_task = Task(description="Write a blog post based on research", agent=writer)

crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff(inputs={"topic": "Context Engineering"})
\`\`\`

**Strengths:** Intuitive multi-agent setup, role-based agents, sequential and parallel task execution.
**Best for:** Teams of specialized agents working together.

---

## AutoGen (Microsoft)

Conversation-based multi-agent framework. Agents "talk" to each other to solve problems.

\`\`\`python
from autogen import AssistantAgent, UserProxyAgent

assistant = AssistantAgent(
    name="assistant",
    llm_config={"model": "claude-sonnet-4-6"}
)

user_proxy = UserProxyAgent(
    name="user",
    code_execution_config={"work_dir": "coding", "use_docker": False},
    human_input_mode="TERMINATE"  # ask human only when done
)

user_proxy.initiate_chat(
    assistant,
    message="Write and test a Python function to find prime numbers"
)
\`\`\`

**Strengths:** Code execution out of the box, natural agent conversations, strong for coding tasks.

---

## Semantic Kernel (Microsoft)

Enterprise-focused framework. Strong on .NET + Python. Excellent for integrating AI into existing enterprise applications.

\`\`\`python
from semantic_kernel import Kernel
from semantic_kernel.connectors.ai.anthropic import AnthropicChatCompletion

kernel = Kernel()
kernel.add_service(AnthropicChatCompletion(model_id="claude-sonnet-4-6"))

# Define a skill (function)
@kernel.function(name="summarize", description="Summarize text")
async def summarize(text: str) -> str:
    return await kernel.invoke("summarize", text=text)
\`\`\`

**Best for:** Enterprise .NET environments, plugin-based architecture, Microsoft ecosystem.

---

## OpenAI Agents SDK

OpenAI's official agent framework. Clean, minimal, well-documented.

\`\`\`python
from agents import Agent, Runner, tool

@tool
def get_weather(location: str) -> str:
    return f"Weather in {location}: 22°C, sunny"

agent = Agent(
    name="Weather Assistant",
    instructions="Help users with weather information",
    tools=[get_weather]
)

result = Runner.run_sync(agent, "What's the weather in Tokyo?")
print(result.final_output)
\`\`\`

**Strengths:** Handoffs between agents (built-in), clean API, guardrails, tracing.
**Note:** Works with any model provider, not just OpenAI.

---

## PydanticAI

Type-safe agent framework built around Pydantic. If you care about type safety and structured outputs, this is excellent.

\`\`\`python
from pydantic_ai import Agent
from pydantic import BaseModel

class AnalysisResult(BaseModel):
    sentiment: str
    confidence: float
    key_points: list[str]

agent = Agent(
    "claude-sonnet-4-6",
    result_type=AnalysisResult,
    system_prompt="Analyze text sentiment and extract key points."
)

result = agent.run_sync("The product is amazing but shipping was slow.")
print(result.data.sentiment)      # "mixed"
print(result.data.confidence)     # 0.87
print(result.data.key_points)     # ["positive product experience", "slow shipping"]
\`\`\`

**Strengths:** Full type safety, structured outputs guaranteed, Pydantic validation, dependency injection.
**Best for:** Production Python services where type safety matters.

---

## How to Choose

| Scenario | Framework |
|---|---|
| Simple single agent | OpenAI Agents SDK or PydanticAI |
| Complex stateful agent (loops, cycles) | LangGraph |
| Multi-agent teams | CrewAI or AutoGen |
| Enterprise / .NET | Semantic Kernel |
| Need every integration possible | LangChain |
| Type-safe production Python | PydanticAI |
| Build from scratch (learning) | Raw API + tool calling |
` };
