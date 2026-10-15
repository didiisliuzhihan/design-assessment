**Video:** Recording link will be added before final submission.

**Clickable prototype:** [Three-screen binding review workflow](https://assessment.zhihanliu.art/prototype.html)  
**User journey:** [Workflow and human checkpoints](https://assessment.zhihanliu.art/journey.svg)  
**Online report:** [Read this submission](https://assessment.zhihanliu.art/submission.html)  
**Portfolio:** [Zhihan Liu](https://zhihanliu.art) · **Company reference:** [Ajaia](https://ajaia.ai)

# Marsh & Colby — Find the evidence. Resolve the exception. Then bind.

Zhihan Liu · Digital Product Designer assessment

## Task 1 — Synthesis and next questions

### Needs, not just features

**Recommendation:** Keep the familiar checklist. Build a source-linked document workspace and an exception-resolution loop around it. These address two different delays: finding evidence and obtaining a usable correction.

Evidence labels below identify the supplied material and exact answer/log segment; they are labels added for this submission, not original line numbers.

| Need | Specific evidence | Design response and limit |
| --- | --- | --- |
| Find the correct documents across channels without repeatedly hunting through inboxes. | **C1:** Colin's first answer describes broker email, portal and fax, and searching for loss runs. **C3:** his final answer identifies finding documents as his bottleneck. **LC1:** 11 minutes to locate documents versus 3 minutes for the checklist. **LC2:** 17/54 submissions had off-portal documents; these took longer to locate. | A per-submission source inventory with channel, received date, version and original document access. Suggest links; have a person confirm uncertain submission matches. Integration and retrieval quality need validation. |
| Resolve document discrepancies with a clear request, owner and visible next step. | **A2:** Anika's second answer describes back-and-forth email when certificate and application limits differ, with days waiting. **LA2:** 23/61 submissions had that mismatch. **LA3:** logged flag-to-reply median was 2.1 days; nine submissions exceeded four days. | Show the precise discrepancy, draft a source-linked request, require human approval before sending, and track the reply. This may reduce avoidable clarification; it cannot guarantee a faster broker response. |
| Preserve reliable human review before binding, without rebuilding a checklist people already know. | **A2:** Anika says the checklist is familiar and fine. **C1:** Colin says the checklist goes quickly. **C2/LC3:** his estimate of about a third with discrepancies is consistent with 19/54 logged coverage-limit mismatches. **Situation rule:** a required missing document or a limit that differs from the client's request prevents binding. | AI flags differences; a reviewer checks originals and the authorized client request. Missing required evidence or unresolved limits remain hard stops. Neither document is automatically treated as correct. |

**Agreement:** Colin's account of retrieval being slower than checklist entry agrees with LC1 and LC2. Anika's report of waiting on mismatch emails also agrees with LA3.

**Non-agreement in priority:** Anika's proposed fix is faster checklist entry/autofill (**A3**), while her account and the log point toward mismatch correspondence and waiting (**A2, LA2–LA3**). The log does not support treating typing as the main opportunity. This is a priority tension, not a proven numerical contradiction. Her 14 minutes from opening to first flag (**LA1**) is not a measure of checklist-entry time or continuous checking; it cannot be directly compared with Colin's 3 minutes.

**Scope of the evidence:** Two assistants in two offices, 30 days. The reply-time statistic covers replies that were logged; its denominator is not supplied. We do not know full end-to-end binding time, the cause of each wait, or organization-wide prevalence. No time saving has been measured for this proposal.

### Four next questions — and what each could change

| Next interview question | Design consequence |
| --- | --- |
| **1. Both assistants:** Show a recent submission with email or fax documents. How did you identify the right submission and the current version? | Reliable identifiers support suggested linking. Ambiguous matches require a human assignment queue; do not auto-file on name similarity alone. |
| **2. Anika and a broker:** Walk through a recent flag-to-reply thread. What was each side waiting for, and what caused additional messages? | If requests lack context, prioritize structured discrepancy requests. If waiting is external availability, emphasize ownership and agreed follow-up rather than promising faster resolution through UI changes. |
| **3. Both assistants:** When the application and certificate differ, how do you establish the client's authorized requirement and decide which document needs correction? | Add the authoritative request and approval trail to comparison. A difference alone must not trigger an automatic change to either document. |
| **4. Operations and the person authorized to bind:** Which documents/checks are required for each policy type, and who signs off the completed packet? | Configure the required-check catalog and role permissions. The final bind action remains blocked for required missing documents or unresolved limits. |

## Task 2 — Design the ideal solution

![User journey, exception loop and human checkpoints](https://assessment.zhihanliu.art/journey.svg)

### Three screens, one continuous workflow

| Screen | Assistant's job | AI assistance | Human checkpoint |
| --- | --- | --- | --- |
| **1. Document workspace** | Find and associate required originals with the submission; see missing items. | Index connected sources, suggest document types and submission matches. | Confirm an uncertain source belongs to this submission; inspect its original. Located is not the same as verified. |
| **2. Compare coverage** | Compare the certificate, application and authorized client request; resolve or confirm a specific discrepancy. | Extract candidate values with page references and highlight differences. | Validate the request baseline and original values. Do not let AI choose which conflicting document is correct. A new version reopens review. |
| **3. Resolution and handoff** | Review the correction request, send it, track the reply, then reopen comparison. | Draft a precise message using the issue and its sources; associate a reply for review. | Edit/approve the outgoing request. A received reply is not a resolved issue; review the new evidence before preparing the bind package. |

**Binding gate:** Required documents must be present and reviewed; requested limits must match the reviewed coverage; unresolved exceptions block handoff. The final action in this prototype prepares an authorized bind review, not policy activation. Production must enforce the full requirement catalog, permissions and quote/document versions on the server. The exact binding authority must be confirmed in research.

### What changes from Owen's wishlist

| Request | Decision |
| --- | --- |
| Smart autofill | Keep source-linked extraction as assistance; defer unattended checklist completion. Entered values still need evidence and human review. |
| Cleaner interface | Improve readability and source visibility in service of the workflow, rather than a cosmetic redesign alone. |
| AI chat | Defer as a primary interface: neither interview demonstrates a need to converse with the tool. Put assistance directly beside documents and actions. |
| Mobile access | Keep layouts responsive; validate mobile tasks before investing in full mobile binding. The supplied evidence does not establish that need. |

### Validation and implementation boundaries

Test with assistants from both offices and the authorized binding reviewer. Give tasks covering an off-portal document, conflicting limits and a corrected document that still needs review. Compare the existing process with the proposal using comparable cases. Observe retrieval time, external searches, correct issue identification, quality of correction requests and unsafe attempts to advance. Separate active work from waiting; track flag-to-usable-correction time and repeat clarification messages. A broker reply alone is not success.

Retain the design if people find and interpret evidence with less effort without increasing missed requirements. If linking is unreliable or the main wait is outside the workflow, revise integration or follow-up scope. The prototype's examples are illustrative fixtures, not additional research or a completed usability study. Ingestion, OCR, email delivery, permissions and durable audit records are simulated.

## Task 3 — AI Workflow Note

I used AI to organize the supplied evidence, draft questions and English, and build the interactive prototype. I chose and approved the direction: keep the checklist, improve document retrieval and discrepancy resolution, and preserve human control over binding. I checked the proposed comparison against the materials and did not adopt the assumption that the application must be correct whenever it differs from the certificate; the design requires confirmation of the client's authorized request instead. I also retained the distinction between elapsed waiting and active work. AI helped execute the work; it did not provide new research findings or validate the proposed outcome.

### Evidence reference key

| Label | Location in the supplied pack |
| --- | --- |
| A2 / A3 | Material 1, Anika: answers to “most annoying part” / “wave a wand.” |
| C1 / C2 / C3 | Material 2, Colin: normal binding / mismatch frequency / catching mismatches. |
| LA1 / LA2 / LA3 | Material 4, Anika: opening-to-first-flag / mismatch count / logged broker-reply interval. |
| LC1 / LC2 / LC3 | Material 4, Colin: retrieval and checklist time / off-portal documents / mismatch count. |
| Situation rule | The situation, definition of binding and its two stated hard stops. |
