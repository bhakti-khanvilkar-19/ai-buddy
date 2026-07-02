SECTION_CONTENT['developer-use-cases'] = { default: `
# Developer Use Cases

## Backend Engineers

**Daily workflow enhancements:**
- Generate boilerplate: REST endpoints, database models, migrations
- Write SQL queries and optimize slow ones
- Review API designs and suggest improvements
- Generate unit and integration tests
- Debug complex errors with full stack traces

**Agent use cases:**
- Automated code review on every PR
- Root cause analysis agent for production incidents
- Documentation generation from code
- Migration scripts (schema changes, data transforms)

**Best tools:** Claude Code, GitHub Copilot, Cursor

---

## Frontend Engineers

**Daily workflow enhancements:**
- Generate React/Vue/Angular components from designs or descriptions
- Write CSS and handle responsive design
- Translate Figma descriptions to code
- Debug rendering issues and CSS specificity problems
- Write accessibility-compliant markup

**Agent use cases:**
- Screenshot → component code (describe or paste UI, get the React component)
- Design system enforcement agent (checks new components against system)
- A11y audit agent (checks accessibility automatically)

\`\`\`
"Here's our Button component. Write variants for: primary, secondary,
destructive, ghost. Each needs: default, hover, focus, disabled states.
Follow our design tokens in src/tokens.css"
\`\`\`

---

## DevOps Engineers

**Daily workflow enhancements:**
- Write and debug Kubernetes manifests, Helm charts, Terraform
- Generate CI/CD pipeline configurations
- Debug deployment failures and container issues
- Write runbooks and playbooks
- Analyze logs and metrics

**Agent use cases:**
- Incident response agent: analyzes alerts, reads logs, suggests fix
- Automated runbook execution for known failure patterns
- Infrastructure review agent (finds misconfigurations, security issues)
- Cost optimization agent (finds unused resources, rightsizing opportunities)

\`\`\`bash
# Pipe logs to Claude for instant analysis
kubectl logs -n payment deployment/payment-service --since=1h | \\
  claude "Identify all errors and their root cause. Group by type. Suggest fixes."
\`\`\`

---

## QA Engineers

**Daily workflow enhancements:**
- Generate test cases from requirements or user stories
- Write automated tests (Playwright, Cypress, Selenium)
- Create test data generators
- Review code for testability and suggest improvements

**Agent use cases:**
- Test case generation agent: reads new code → generates test scenarios
- Regression test writer: after bug fix, writes a test that would have caught it
- API fuzz testing: generates edge case inputs automatically

\`\`\`
"Write Playwright tests for the user registration flow. Cover:
- Happy path (valid data)
- Invalid email format
- Password too short
- Duplicate email
- Network timeout
- Server error (500)
Include data-testid attributes where needed."
\`\`\`

---

## Architects

**Daily workflow enhancements:**
- Get second opinions on architectural decisions
- Generate architecture diagrams (Mermaid, PlantUML)
- Write ADRs (Architecture Decision Records)
- Evaluate technology choices with trade-offs

**Agent use cases:**
- ADR generator: given a decision, research options and write ADR
- Architecture review agent: reads codebase, identifies anti-patterns
- Dependency analysis: finds circular dependencies, tight coupling

\`\`\`
"We're building a real-time notification system for 1M users.
Evaluate: WebSockets vs SSE vs polling vs push notifications.
Consider: scale, reliability, battery impact on mobile, complexity.
Recommend the best approach for our React + Node.js stack."
\`\`\`

---

## Platform Engineers

**Daily workflow enhancements:**
- Generate SDK code and CLI tools
- Write developer documentation
- Design and document APIs
- Evaluate and configure developer tooling

**Agent use cases:**
- Developer experience agent: monitors developer friction and suggests improvements
- Onboarding automation: generates project setup guides from repo structure
- SDK code generation from OpenAPI specs

---

## Data Engineers

**Daily workflow enhancements:**
- Write and optimize complex SQL and Spark queries
- Debug data pipeline failures
- Generate data schemas and transformations
- Write data quality tests

**Agent use cases:**
- Data quality monitoring agent: detects anomalies, alerts on data drift
- Pipeline documentation generator: reads DAG code, writes documentation
- Query optimization agent: takes slow query + EXPLAIN output, suggests index and rewrite

\`\`\`python
# Data pipeline debugging
error_trace = open("pipeline_error.log").read()
schema = open("schema.json").read()

response = client.messages.create(
    model="claude-sonnet-4-6",
    messages=[{"role": "user", "content": f"""
Pipeline failed with this error:
{error_trace}

Schema:
{schema}

Identify the root cause and provide the fix.
"""}]
)
\`\`\`
` };
