**Presentation replacement for this mock submission:** [Spoken presentation and stakeholder responses](https://assessment.zhihanliu.art/speaking-script.html)

**Current prototype:** [Review with linked evidence](https://assessment.zhihanliu.art/prototype.html)  
**Earlier prototype:** [Review with required checkboxes](https://assessment.zhihanliu.art/earlier-prototype.html)  
**Case materials:** [Mock brief and evidence IDs](https://assessment.zhihanliu.art/case-materials.html)  
**Company reference:** [Ajaia](https://ajaia.ai)

# Harbor Rooms Quote Approval Design

Prepared by Zhihan Liu from a guided, untimed practice assessment. All business materials are fictional. The task grouping below is a practice structure, not a verified copy of the full Ajaia assignment. This hosted version tests report reading, prototype interactions, and Markdown download. The speaking script replaces a video only for this mock submission.

## Recommendation

I recommend a focused manager review flow that brings a quote, its supporting sources, and the decision together. AI assists with organizing information; the manager reviews the evidence and approves or returns the quote. Missing or questioned information stays visible and actionable.

This is a design hypothesis. The materials support investigating information access during approval, but do not establish it as the largest cause of delay. I would distinguish time spent finding evidence from time waiting for a manager to become available before claiming an efficiency improvement.

## Task 1 Evidence and discovery

### Findings and limits

Evidence references point to the original simulated materials. English descriptions below paraphrase the Chinese source text.

| Finding | Supporting evidence | Interpretation and limit |
| --- | --- | --- |
| At least one manager describes needing information outside the immediate approval view. | B3 says approval can take one minute when information is complete, but sometimes requires checking earlier promises or calling a venue lead. B4 describes customer details in attachments and earlier communication on another page. L12 records a mobile opening and a later desktop history lookup before approval. | Bringing relevant evidence into review may reduce search effort. The materials do not measure how often this happens or its share of total delay. |
| A long approval interval is not the same as continuous review work. | In L12, approval is requested at 10:25 and granted at 12:50, an elapsed interval of 145 minutes. B2 says the manager typically checks approvals twice a day. | The interval may include availability, waiting, information gathering, and decision time. I cannot attribute all 145 minutes to manual checking. |
| A quote can require source verification even after AI has produced a draft. | A3 describes checking a newer price table and asking a colleague. L10 records a draft citing v3 although v4 had been published, followed by a price correction. A4 says frequency is unknown. | This supports one pricing-version problem. It does not prove widespread version mixing or identify the responsible update step. |
| The Sent status can lag behind the actual customer email. | A8 describes replying through an existing email thread and updating the platform later. L13 records an email sent at 11:24 and the Sent status updated at 15:20. | The 3-hour-56-minute difference is a recording lag in this example. The customer-facing response interval is 24 minutes, while the recorded entry-to-Sent interval is 260 minutes. These should not be treated as equivalent measures. |
| Reminders and reports have uses, but their current records cannot justify every requested feature. | A7 says reminders help after interruptions but cannot resolve waiting on another person. L7 records rapid reminder closures without reasons. B7 values reporting but questions comparisons across different case mixes; L8 records report opens without purpose. | Reminders should be evaluated by work state. Raw speed rankings are not yet supported. The evidence does not show that reminders or reports are generally useless. |

L14 also shows a coordinator removing a reservation claim from a draft based on periodically synchronized availability. Because a quote is not a reservation, the absence of a booking record alone does not prove inaccurate availability or double booking.

### Requests and underlying needs

| Stakeholder request | Evidence-backed need or question | Proposed response |
| --- | --- | --- |
| Frequent reminders, S2 | People need to resume work after interruptions, and distinguish actionable work from work waiting on someone else, A6 and A7. | Investigate reminder timing and work states. Keep reminder expansion outside the first review slice. |
| Employee speed ranking, S3 | Leaders need useful performance information, but recorded Sent times and case complexity can distort comparison, L13 and B7. | Defer ranking. Validate response timestamps and case mix first. |
| Auto-send standard quotes, S4 | Coordinators can already send standard quotes under the stated policy. They need reliable facts and clear limits on customer commitments, A9, L10 and L14. | Retain the existing standard-quote route. Defer new auto-send behavior until source reliability and exception handling are evaluated. |
| Manager approval for every email, S5 | Managers need to judge exceptions with enough context. B5 raises capacity concerns; existing rules allow standard quotes without manager approval. | Preserve manager approval for discounts above 10% and changes to cancellation terms. Do not add universal manager review. |
| A new dashboard, S6 | B7 describes a reporting need for staffing and forecasting. | Preserve current reporting access. A dashboard rebuild is outside this two-week workflow proposal. |

### Priority problem

When reviewing a special quote, a manager may need to retrieve customer requests, pricing conditions, and earlier communication from separate places before deciding. The current review view may not make those dependencies clear, B3 and B4. I would investigate this workflow first because it has a specific reported difficulty and a logged example, and it supports a bounded prototype within the available development scope.

This priority does not mean it is the largest measured bottleneck. If manager availability accounts for most waiting and evidence gathering adds little effort, I would reconsider the expected benefit and potentially prioritize routing or scheduling instead.

### Follow-up research

| Who or what | Question or observation | Decision it informs |
| --- | --- | --- |
| Manager and recent approval records | Walk through several recent approvals. What happened between the request and decision, including periods waiting, searching, consulting, and judging? | Whether evidence access warrants priority over availability or routing. |
| Manager and coordinator | Which facts are necessary for a discount or cancellation decision? Show a recent case where the information was insufficient. | The review information requirements and missing-information states. |
| Owner of price publication and AI source configuration | After a price table is published, how does it become available to the draft system? Trace v4 through that process. | Whether the issue concerns publication, synchronization, selection, or another step. |
| Email and platform records | For recent cases, compare actual outgoing email timestamps with platform Sent timestamps. | Whether response-time reporting and reminders need different event definitions. |
| Manager and coordinator | How are approvals given in Slack linked to the exact quote and later recorded? | The minimum trace needed to connect a decision to the approved quote. |

## Task 2 Workflow and prototype

### Scope and design hypothesis

The first slice supports manager review of special quotes. It uses existing quotes and available linked sources rather than rebuilding the pricing, email, booking, or inventory systems. Integration feasibility needs engineering review; the two-week capacity is a scope constraint, not a verified delivery estimate.

The hypothesis is that presenting relevant evidence with the quote can reduce retrieval effort, while an explicit human decision preserves control over exceptions. The interface must distinguish a source being found from its content being correct, current, or sufficient.

### Workflow

1. The coordinator submits the quote for the approval required by the existing business rules.
2. AI organizes the available customer request, quote, applicable price source, approval rule, and linked communication. It labels unavailable sources rather than filling gaps with invented information.
3. The manager compares the quote with the original evidence and can mark a source as needing clarification.
4. The manager approves the specific quote or returns it with a concrete request for information or revision.
5. The coordinator receives the result and continues the quote process. Approval does not itself send an email or create a reservation.

If a returned quote changes, it must be reviewed as the revised quote. The decision should remain linked to the reviewed version.

### Information and human decisions

The review brings together five items selected during the exercise: customer special requests, the current quote, standard pricing and approval rules, linked historical communication, and AI-organized questions and source references.

The existing policy assigns discounts above 10% and cancellation changes to a sales manager. AI can retrieve, organize, and summarize evidence; it does not grant approval or establish that all relevant facts have been found. The manager can inspect original sources even when the AI summary does not flag a problem.

The current prototype pauses approval when a required price source is missing or the manager marks a source as needing clarification. This blocking behavior is a proposed design choice to test, not an additional policy supplied by the brief. Production requirements would need a defined way to resolve issues, verify newly supplied evidence, and handle authorized exceptions without a generic checkbox bypass.

### Prototype iteration

The first prototype required two broad confirmations before approval. In the designer walkthrough, I reported that the confirmations were easy to complete routinely and did not explain how to know that the evidence was sufficient.

The current prototype removes these broad checkboxes. It shows individual sources and their availability, allows the manager to flag a specific concern, and asks for a concrete approval or return decision. Optional personal checklists could be explored later, but a tick would record an action rather than prove completeness.

The prototype uses fictional interaction cases added after the research materials. Their prices and messages are test fixtures, not additional discovery evidence.

### States and engineering handoff

| State | Visible information and allowed action |
| --- | --- |
| Awaiting manager decision | Current quote, source references, and the specific authorization required. The manager may inspect sources, flag an issue, approve, or return. |
| Missing or questioned information | Identify the specific missing or questioned source. In this prototype, approval pauses and return remains available. |
| Returned | Show the reason and the coordinator's next action. Revised information requires renewed review. |
| Approved | Record the manager's decision for the reviewed quote. Sending and booking remain separate workflow steps. |

For implementation, I would specify the quote identifier and version, submitted special requests, applicable rule and version, source identifiers and available version or effective-date metadata, missing or questioned items, manager decision, actor, decision time, and return reason. Missing metadata should remain unknown rather than being supplied by AI.

The prototype demonstrates interaction states using fixtures. It does not implement source retrieval, identity or permissions, durable approval records, notifications, external synchronization, or quote-version invalidation. Those are production requirements to review with engineering. A changed quote should invalidate the earlier approval for sending that changed version; frontend controls alone cannot enforce authorization.

### What was checked in this exercise

| Exercise | Self-reported observation | Meaning and limit |
| --- | --- | --- |
| Earlier prototype with P-017 | I would approve based on the requested 15% discount, the calculation from $4,000 to $3,400, and the approval rule. I was unsure how to know that the information was complete and found the checkboxes easy to complete routinely. | The feedback motivated clearer source states and removal of generic confirmations. It is a designer walkthrough, not evidence about managers generally. |
| Current prototype with P-019 | I identified that the customer also requested free cancellation until three days before the event, while the summary omitted that change and the quote still said seven days. I would return it for revision. | Access to original material supported identifying one simulated omission. It does not establish an error-rate reduction or reliable AI detection. |

The interface's approve, missing-source, manual-flag, and return-with-reason paths were functionally checked. That check verifies the mock interaction behavior, not usability with the target business users. No participant timing, screen recording, or production outcome was collected.

### Planned validation

Recruit people who actually perform manager review, with coordinators involved to assess returned work. Give neutral tasks: process the quote as usual, explain the decision, and arrange the next step if a decision cannot be made. Ask participants to think aloud without teaching the controls.

Use comparable cases with complete evidence, a missing required source, and an unflagged difference between the original request and draft. Compare the existing workflow with the proposal where feasible. Rotate order and use comparable rather than identical cases to reduce familiarity effects. Test on a phone as well as a desktop because B2 and B4 describe mobile use.

Observe whether participants find the correct evidence, identify consequential differences, explain the decision, and understand the next step. Record active evidence-retrieval time separately from the full request-to-decision interval, plus external lookups, assistance needed, missed conditions, and unsupported decisions. Fewer clicks alone would not establish success.

I would retain the proposal if it helps people retrieve and interpret the necessary evidence without increasing missed conditions. If people mainly trust the AI summary, or the page adds work without reducing retrieval effort, I would revise it. Small exploratory sessions would guide changes; a measured improvement would require an appropriate baseline and further evaluation.

## Task 3 AI collaboration

### Work done with AI

AI acted as a coach during evidence analysis, challenged unsupported causal claims, suggested ways to formulate research questions, implemented the interactive prototypes, and helped organize the submission and spoken English. The source case and additional test fixtures were also created with AI for practice.

I supplied Chinese interpretations, selected the review direction, identified the information managers should see, questioned the generic checkboxes, and explained why the cancellation mismatch should be returned. I used AI to express those decisions in English rather than treating generated wording as new evidence.

### Decisions and output checks

I retained the distinction between elapsed approval time and active review effort. I corrected an early interpretation that merged pricing versions, sending status, and booking availability. I also narrowed a classification concern because the materials did not demonstrate that cases had actually been classified incorrectly.

I rejected the first prototype's universal required confirmations as sufficient evidence of review. The iteration makes the information and the decision more specific. In P-019 I checked the AI summary against the original request and found the omitted cancellation change; the quote also needed revision.

AI-generated source lists can still omit information. I therefore retained access to original material and a way for managers to raise issues that the AI did not identify.

### Selected prompt excerpts

These are excerpts from the practice conversation, not a claim that every interaction has been reproduced.

> “A3 和 L10 说明至少有一次延迟与核对价格版本有关，不能直接归因为员工处理不及时。但不知道这类情况占多少，所以还不能说它是主要瓶颈。”

> “经理需要看到：1、客户的特殊要求；2、当前报价内容；3、对应的标准价格和审批规则；4、客户历史沟通记录；5、AI整理的待确认事项和信息来源。”

> “是不是只对缺失或有风险的信息要求确认更好？”

> “客户要求15%折扣，并把免费取消截止时间从活动前7天改为3天，但报价草稿仍写7天。我会退回修改，因为AI摘要漏掉了取消条款的变更。”

## Task 4 Stakeholder presentation

The [speaking script](https://assessment.zhihanliu.art/speaking-script.html) contains a simple-English presentation, pause marks, a shorter version, and practice responses to stakeholder objections. It replaces the recording only for this mock package. The actual assessment's video length, recording mechanism, retake rules, and full task instructions still need to govern an actual submission.
