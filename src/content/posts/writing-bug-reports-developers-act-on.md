---
title: Writing Bug Reports Developers Act On
date: 2026-07-18
excerpt: A bug report is a handover, not an accusation. Here is the structure I use so a developer can reproduce, understand and fix an issue without asking me a single follow-up question.
tags: [process, reporting, manual-testing]
featured: true
draft: false
---

Most rejected bugs are not wrong. They are unclear. The finding was real, but the report did not carry enough context for anyone else to act on it, so it bounced back with "cannot reproduce" and everybody lost a day.

A bug report is a handover. The question it has to answer is simple: **what would another person need in order to see what I just saw?**

## The structure I use

Every report I file has the same six parts, in the same order.

1. **Title** — component, behaviour, condition. `Checkout: order total ignores discount when coupon applied after address change`.
2. **Environment** — build number, browser or device, account or role, environment name.
3. **Steps to reproduce** — numbered, starting from a known state.
4. **Expected result** — what the requirement or common sense says should happen.
5. **Actual result** — what happened, quoted exactly where there is an error message.
6. **Evidence** — screenshot, screen recording, network log, or the failing request and response.

The order matters. A developer reading top to bottom gets the *what*, then the *where*, then the *how*, and only then the proof.

## Titles carry most of the weight

The title is the only part that shows up in a backlog view, a standup, and a release-notes filter. It is doing more work than any other field.

A weak title describes a feeling:

> Checkout is broken

A strong title describes a condition and an outcome:

> Checkout: order total ignores discount when coupon is applied after changing the address

The second one can be triaged without opening it. That is the whole goal.

## Steps start from a known state

"Log in and go to checkout" assumes my cart, my account and my feature flags. Start from something anyone can recreate:

```text
1. Sign in as a standard customer (test account: qa-standard-01)
2. Add any in-stock item to the cart
3. Go to Checkout
4. Apply coupon SAVE10 — note the total drops by 10%
5. Change the delivery address to a different country
6. Observe the order total
```

If a step needs specific data, name the data. If it needs a specific state, say how to get there.

## Separate the symptom from your theory

It is tempting to write "the discount service is not recalculating on address change". Sometimes you are right. Often you are not, and a wrong theory sends the fix in the wrong direction.

Put observations in the report and theories in a clearly labelled note at the bottom:

> **Possible cause:** the totals call fires before the address update resolves — the network tab shows `POST /totals` completing before `PATCH /address`.

Now the developer has your reasoning without being anchored to it.

## Attach the smallest useful evidence

A forty-second video where the bug appears at second thirty-eight is worse than one screenshot with the wrong number circled. Trim it. If the failure is in an API response, paste the request and the response body rather than a picture of them — text is searchable.

## Severity and priority are different things

Severity is how badly the thing is broken. Priority is how soon somebody should care. A crash in a screen nobody visits is high severity and low priority. Saying which one you mean saves an argument in triage.

## The test before you file

Read your own report as if you have never seen the feature. If you can follow it from a clean environment and reach the failure, it is ready. If you cannot, no one else will either.
