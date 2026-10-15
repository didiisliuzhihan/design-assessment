**Video:** Recording link will be added before final submission.

**Clickable prototype:** [Three-screen binding review workflow](https://assessment.zhihanliu.art/prototype.html)  
**User journey:** [Workflow and human checkpoints](https://assessment.zhihanliu.art/journey.svg)  
**Online report:** [Read this submission](https://assessment.zhihanliu.art/submission.html)  
**Portfolio:** [Zhihan Liu](https://zhihanliu.art) · **Company reference:** [Ajaia](https://ajaia.ai)

# Marsh & Colby — Find the evidence. Resolve the exception. Then bind.

Zhihan Liu · Digital Product Designer assessment

## Task 1 — Synthesis and next questions

### Needs, not just features

**Priority problem:** Assistants need to find the correct documents and move discrepancies toward verified resolution while retaining the familiar checklist. Colin's retrieval effort is directly supported by timing data; the causes of Anika's correspondence delays still need investigation. Human review is a constraint throughout, not a third measured bottleneck.

Evidence labels below identify the supplied material and exact answer/log segment; they are labels added for this submission, not original line numbers.

| Need | Specific evidence | Interpretation and limit |
| --- | --- | --- |
| Find the correct documents across channels without repeatedly hunting through inboxes. | **C1:** Colin's first answer describes broker email, portal and fax, and searching for loss runs. **C3:** his final answer identifies finding documents as his bottleneck. **LC1:** 11 minutes to locate documents versus 3 minutes for the checklist. **LC2:** 17/54 submissions had off-portal documents; these took longer to locate. | Retrieval is a directly supported priority for Colin. Channel access, document identifiers and version selection still need investigation. Centralization cannot be assumed to remove the entire 11 minutes. |
| Move document discrepancies toward a verified resolution without unnecessary back-and-forth. | **A2:** Anika's second answer describes back-and-forth email when certificate and application limits differ, with days waiting. **LA2:** 23/61 submissions had that mismatch. **LA3:** logged flag-to-reply median was 2.1 days; nine submissions exceeded four days. | Correspondence is a reported pain. The cause of each wait is unknown; clearer requests reducing repeat clarification is a hypothesis. A reply is not necessarily a usable correction. |
| Preserve reliable review against the client's request while retaining the familiar checklist. | **A2:** Anika says the checklist is familiar and fine. **C1:** Colin says the checklist goes quickly. **C2/LC3:** his estimate of about a third with discrepancies is broadly consistent with 19/54 logged coverage-limit mismatches, though the categories are not identical. **Situation rule:** a required missing document or a limit that differs from the client's request prevents binding. | This is a safety constraint, not a third measured bottleneck. A difference does not establish which document is correct. The authorized request, required-check catalog and binding authority need confirmation. |

**Agreement:** Colin's account of retrieval being slower than checklist entry agrees with LC1 and LC2. Anika's report of waiting on mismatch emails also agrees with LA3.

**Non-agreement in priority:** Anika proposes faster checklist entry/autofill (**A3**), while her reported pain and the log highlight mismatch correspondence and waiting (**A2, LA2–LA3**). Autofill remains a candidate; her checklist-entry time was not measured, so the evidence cannot establish it as the first priority. Colin's retrieval priority has direct timing support (**LC1**). This is a priority tension, not a numerical contradiction. Anika's 14 minutes from opening to first flag (**LA1**) measures a different interval from Colin's 3 minutes completing the checklist; they cannot be directly compared.

**Scope of the evidence:** Two assistants in two offices, 30 days. The reply-time statistic covers logged replies; its denominator is not supplied, and the pack does not say it covers only the 23 coverage-limit mismatch cases. We do not know full end-to-end binding time, the cause of each wait, or organization-wide prevalence. No time saving has been measured for this proposal.

### Four next questions — and what each could change

| Next interview question | Design consequence |
| --- | --- |
| **1. Both assistants:** Show a recent submission with email or fax documents. How did you identify the right submission and the current version? | Reliable identifiers support suggested linking. Ambiguous matches require a human assignment queue; do not auto-file on name similarity alone. |
| **2. Anika and a broker:** Walk through a recent discrepancy thread together. What did each side need to proceed, what did each exchange clarify, and what were they waiting for? Which information is routine and which is case-specific? | Missing context supports a structured request with room for exceptions. Waiting for a corrected document or authorization calls for visible dependencies and ownership. If the other party has everything but has not acted, emphasize follow-up. These causes remain hypotheses until observed. |
| **3. Both assistants:** When the application and certificate differ, how do you establish the client's authorized requirement and decide which document needs correction? | Add the authoritative request and approval trail to comparison. A difference alone must not trigger an automatic change to either document. |
| **4. Operations and the person authorized to bind:** Which documents/checks are required for each policy type, and who signs off the completed packet? | Configure the required-check catalog and role permissions. The final bind action remains blocked for required missing documents or unresolved limits. |

## Task 2 — Design the ideal solution

### Design hypothesis and scope

Bring the evidence into the assistant's existing checklist workflow. Easier source access may reduce retrieval effort (**C1/C3, LC1/LC2**); explicit discrepancy requests may reduce avoidable clarification (**A2, LA2/LA3**). The latter depends on the waiting causes identified in follow-up research. Keep review against the authorized client request throughout (**Situation rule**).

The assistant prepares and checks the submission; the broker provides clarification or corrections; the person with binding authority makes the final authorization. That authority must be confirmed, not assigned to an invented manager role.

### Shortest journey and exception loop

```text
Locate sources → Check originals against the authorized client request
  Complete and consistent → Prepare authorized bind review
  Missing, conflicting or uncertain → Record the specific issue
    → Human approves request → Await needed evidence or clarification
    → New evidence arrives → Recheck the affected requirements
```

The normal path does not require a correction request. A reply or newly linked document does not itself clear a check. Reviewers must be able to raise an issue even when AI finds none; an uncertain authorized requirement stays unresolved.

![User journey, exception loop and human checkpoints](https://assessment.zhihanliu.art/journey.svg)

### Three screens, one continuous workflow

| Screen | Assistant's job | AI assistance | Human checkpoint |
| --- | --- | --- | --- |
| **1. Document workspace** | Find and associate required originals with the submission; see missing items. | Index connected sources, suggest document types and submission matches. | Check uncertain source matches to prevent attaching another submission's evidence. Located is not the same as reviewed. |
| **2. Compare coverage** | Compare the certificate, application and authorized client request; identify specific issues. | Extract candidate values with page references and highlight differences. | Check the current authorized request and original values because extraction or either document may be wrong. Reopen affected checks after new evidence arrives. |
| **3. Resolution and handoff** | Review the request and next action; track the response and reopen comparison. | Draft a precise message using the issue and its sources; associate a reply for review. | Approve the outgoing request to prevent incorrect or incomplete instructions. Verify the correction before clearing the issue and preparing the bind package. |

**Binding gate:** Required documents must be present and reviewed; requested limits must match the reviewed coverage; unresolved required checks block readiness. Missing evidence can still be escalated or requested while binding remains blocked. The final prototype action prepares an authorized bind review, not policy activation. Production needs the complete requirement catalog, permissions and version-aware review records.

**Routine information and exceptions:** The candidate request template lets the assistant select specific actions, inspect their sources, add case-specific requests and review the resulting editable draft. Ask for authorization clarification when it is unresolved; include a checked requirement as context instead of asking for it again. A selection means “include this request,” not “evidence verified.” Validate recurring fields and whether this reduces omissions using actual correspondence. Rare information can still be mandatory when it affects required documents, authorization or limits; custom text cannot waive those checks. This template's effectiveness has not been established.

### What changes from Owen's wishlist

| Request | Decision |
| --- | --- |
| Smart autofill | Keep source-linked extraction as assistance; defer unattended checklist completion. Entered values still need evidence and human review. |
| Cleaner interface | Improve readability and source visibility in service of the workflow, rather than a cosmetic redesign alone. |
| AI chat | Defer as a primary interface: neither interview demonstrates a need to converse with the tool. Put assistance directly beside documents and actions. |
| Mobile access | Keep layouts responsive; validate mobile tasks before investing in full mobile binding. The supplied evidence does not establish that need. |

### Validation and implementation boundaries

Test with assistants from both offices and the authorized binding reviewer using comparable cases: an off-portal document, conflicting limits, and a corrected document requiring renewed review. Compare the current process with the proposal; separate active work from waiting.

| Need | Observe | Guardrail |
| --- | --- | --- |
| Find the correct evidence | Retrieval time and external searches | Check for wrong submission links or obsolete versions. |
| Reduce avoidable correspondence | Clarification exchanges, information missing from the first request, and flag-to-usable-correction time | Classify waiting causes; a reply alone is not success. |
| Preserve reliable review | Correct discrepancy identification and attempts to advance with missing evidence or unresolved limits | Observe whether people verify originals and the authorized request, including after a new version arrives. |

Retain the design if people find and interpret evidence with less effort without increasing missed requirements. If linking is unreliable or waiting is external, revise integration or follow-up scope. The prototype demonstrates discrepancy and matching-document examples, plus reviewer-raised concerns. Functional checks verify these interactions, not usability or business improvement. Fixtures, ingestion, OCR, email delivery, permissions and audit persistence are simulated; the full policy/check catalog is outside the demo.

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
