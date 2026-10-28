---
title: "Tip: Make Microsoft Foundry Agents Recoverable"
author: valeras
date: 2026-10-28 01:00:00 +0200
categories:
  - TipOfTheDay
  - AI
tags:
  - microsoft-foundry
  - ai-agents
  - crash-recovery
  - human-in-the-loop
pin: false
slug: tip-microsoft-foundry-agent-recovery
comments: true
image:
  path: /img/posts/foundry_agent_recovery.png
  alt: An AI agent connected to an approval checkpoint and a protected workflow
---

## Tip

Building an agent that runs in the background? In Microsoft Foundry, you can opt in to recovery for long-running background responses, so the framework can reinvoke work after interruptions such as a crash or redeployment.

For the Responses protocol, enable resilient background handling when you create the agent host:

```python
from azure.ai.agentserver.responses import (
    ResponsesAgentServerHost,
    ResponsesServerOptions,
)

app = ResponsesAgentServerHost(
    options=ResponsesServerOptions(resilient_background=True),
)
```

This configuration snippet belongs in an existing hosted agent application; it is not a complete agent by itself.

The recovery option applies to responses stored and run in the background (`store=true` and `background=true`). When a run is recovered, your handler can detect that state and continue from a checkpoint instead of starting from the beginning.

---

## Important: Recovery Is Opt-In

Crash recovery is **off by default**. Foreground responses aren't recovered after a crash, and enabling recovery doesn't automatically make every handler safe to rerun.

If your agent performs an action that can't safely happen twice, such as sending an email or submitting an order, explicitly track progress and make the action idempotent where possible. Recovery alone does not guarantee exactly-once execution.

> Long-running agent capabilities are in preview, and APIs or package versions may change. Check the current documentation before using them in production.
{: .prompt-warning }

---

## Bonus: Wait for Human Approval

Long-running agents also support workflows that pause for a human decision and resume later. In a multi-turn task chain, a turn can return an approval request and suspend; the next input on the same `task_id` resumes the handler.

That means an approval can arrive minutes, hours, or days later without holding a request open. The durable chain also survives container restarts.

This is a separate workflow pattern, not something the `resilient_background` setting adds automatically. Follow the human-in-the-loop guide below to implement the approval and resume steps.

---

## References

- [Recover long-running work after a crash](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/recover-long-running-work)
- [Resilience for long-running Microsoft Foundry hosted agents](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/long-running-agent-resilience)
- [Add a human-in-the-loop approval step](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/add-human-in-the-loop)
- [What's new in Microsoft Foundry?](https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry)
