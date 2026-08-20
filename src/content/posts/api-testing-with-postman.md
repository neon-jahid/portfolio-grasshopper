---
title: A Practical Start to API Testing with Postman
date: 2026-06-02
excerpt: Testing the UI catches what users see. Testing the API catches what breaks before they see it. A walkthrough of the checks I add to every collection, and how to run them in CI.
tags: [api, postman, automation]
featured: true
draft: false
---

The UI is the last place a bug shows up and the slowest place to find it. By the time a wrong total renders on a page, the wrong number already crossed a network boundary. Testing there is faster, more stable and far easier to automate.

Here is the set of checks I put on every endpoint, and how the collection ends up running itself.

## Four checks that belong on every request

### 1. Status code

The cheapest assertion, and the one that catches deploys pointing at the wrong environment.

```js
pm.test('responds 200', () => pm.response.to.have.status(200));
```

### 2. Response shape

Status codes lie. A `200` with a missing field is still a broken contract. Assert the schema, not a handful of properties:

```js
const schema = {
  type: 'object',
  required: ['id', 'email', 'createdAt'],
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    createdAt: { type: 'string' },
  },
};

pm.test('matches the user schema', () => {
  pm.response.to.have.jsonSchema(schema);
});
```

This is the check that catches a renamed field before the front end does.

### 3. Response time

Not a load test — a smoke alarm. If a call that normally takes 200 ms suddenly takes three seconds, something changed.

```js
pm.test('responds within budget', () => {
  pm.expect(pm.response.responseTime).to.be.below(800);
});
```

### 4. Auth behaviour

For every protected endpoint, add the negative case: no token, expired token, wrong role. Authorisation gaps are the defects with the highest cost and the lowest discovery rate through the UI.

## Make the collection environment-agnostic

Hardcoded URLs are why collections rot. Use variables for everything that changes between environments:

| Variable | Dev | Staging |
| --- | --- | --- |
| `baseUrl` | `https://dev.api.example` | `https://staging.api.example` |
| `authUser` | `qa-dev-01` | `qa-stg-01` |

Requests then read `{{baseUrl}}/v1/users/{{userId}}` and one collection covers every environment.

## Chain requests instead of hardcoding ids

A test that depends on user `42` existing is a test that fails on a fresh database. Create what you need, then pass it forward:

```js
// Tests tab of "Create user"
const body = pm.response.json();
pm.collectionVariables.set('userId', body.id);
```

The next request uses `{{userId}}`. The chain is self-contained and reruns cleanly.

## Run it from the command line

Once the collection passes locally, Newman runs the same file in CI:

```bash
npx newman run collections/payments-api.json \
  --environment envs/staging.json \
  --reporters cli,junit \
  --reporter-junit-export results/api.xml
```

The JUnit output plugs into most pipelines, so a failing contract fails the build instead of surfacing three sprints later.

## Where to stop

API tests are not a substitute for exploratory testing, and a green collection does not mean the feature makes sense. What it does mean is that the contract has not silently changed — and that is the class of bug that is hardest to spot by hand.

Start with the four checks on your busiest endpoint. Add the next endpoint tomorrow.
