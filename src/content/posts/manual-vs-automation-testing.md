---
title: Manual or Automated? The Wrong Question
date: 2026-04-21
excerpt: Automation is not a better version of manual testing. They answer different questions. Here is the split I use when deciding what to automate and what to keep in human hands.
tags: [strategy, automation, manual-testing]
draft: false
---

"Should we automate this?" is usually asked as if automation were simply manual testing done faster. It is not. The two answer different questions, and treating one as an upgrade of the other produces suites that are expensive to maintain and still miss the interesting bugs.

## What each one is actually good at

**Automation answers: has this changed?** It runs the same path the same way and tells you when the result differs. It is tireless, exact and completely incurious.

**Manual testing answers: is this any good?** A person notices that the button works but sits below the fold on a phone, that the error message blames the user, that the flow makes sense for a new account but not for a returning one.

Automation protects what you already understand. Manual testing is how you come to understand it.

## The split I use

Automate when the check is:

- **Repeated** — runs every release, or every pull request
- **Deterministic** — same input, same output, no judgement needed
- **Expensive to do by hand** — long forms, many data permutations, cross-browser
- **Stable** — the flow has settled and is not being redesigned next sprint

Keep it manual when the check is:

- **New** — the feature just landed and nobody has used it in anger yet
- **Subjective** — layout, wording, whether the experience feels right
- **Rare** — a migration you will run once
- **Volatile** — the UI changes weekly and the test would break more often than the feature

## The trap: automating too early

A test written against a screen that is still being designed will be rewritten three times before release. Each rewrite costs more than the manual pass it replaced.

My rule: a flow earns an automated test after it ships and survives one round of feedback. Before that, explore it by hand — that is where the design bugs live anyway.

## The other trap: never revisiting the suite

An automated suite is code, and code rots. Tests that fail intermittently get rerun until they pass, which is the same as deleting them but slower. Once a team stops trusting a red build, the suite has stopped working regardless of how many tests it contains.

Budget time to delete tests. A suite of 60 checks that always tells the truth is worth more than 400 that mostly do.

## A concrete example

For a checkout flow:

| Check | Where it belongs |
| --- | --- |
| Payment succeeds with a valid card | Automated — runs every build |
| Card declines show the right message | Automated — deterministic, many cases |
| Total recalculates on address change | Automated — pure logic |
| Checkout on a small phone with a long address | Manual — judgement about layout |
| Behaviour when the network drops mid-payment | Manual first, automated once understood |
| Whether the flow feels trustworthy | Manual, always |

## The real question

Not "manual or automated" but **what do I want to know?** If the answer is "that nothing broke", automate it. If the answer is "whether this is any good", go and use the thing.

Most teams need both, in roughly that order.
