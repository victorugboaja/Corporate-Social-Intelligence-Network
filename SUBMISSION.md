# Corporate Social Intelligence Network (CSIN)

## Problem

Corporate giving teams receive compelling funding stories, but the evidence behind those stories is inconsistent and difficult to compare. A request can move forward before anyone has seen what was reported, what is missing, and what a person still has to decide.

## Target users

Corporate social-investment and giving teams reviewing Canadian funding requests.

## Solution

CSIN is a human-led demonstration. A funder scouts a curated set of fictional Canadian organizations, opens an organization profile, reads program analysis, discusses the supplied record with a voice analyst, and keeps review and funding authorization with a person.

## Working flow

Landing → Scout → organization profile → program analysis → human review → voice analyst → test-funding flow → prospect list.

Local routes: `/`, `/scout`, `/evidence`, `/analyst.html`, `/fund.html`, and `/track`.

Auth0 Universal Login provides account creation, login, logout and protected application routes. After authentication, CSIN asks for the user’s name and company as the workspace profile.

## Demonstration data

Every organization, program result, rating, and financial figure in CSIN is fictional demonstration data. Ottawa Access Collective and the other profiles are not real charities. A campaign target, including the fictional CAD 20,000 Ottawa fixture, is not a grant, invoice, or payment.

## Voice analyst

ElevenLabs is used only as the voice analyst. The person starts and ends the conversation. The analyst discusses supplied fictional records. It does not approve a finding or authorize funding.

## Test settlement

Solana is used only as devnet test settlement. Devnet SOL has no monetary value. This repository does not contain a verified transaction, so settlement stays pending until a verified transaction exists. A test transfer would not pay a fictional Canadian-dollar request and would not prove social impact.

## Technology and build process

The prototype uses a React and TypeScript landing page, browser JavaScript for the application workflow, a Node.js server, Auth0 for identity, ElevenLabs for the voice analyst and Solana devnet for the test-settlement path. It was built during Hack the Hill III with AI-assisted development using OpenAI Codex and Cursor. The participant defined the product, civic problem, workflow, evidence rules, interface requirements and final implementation decisions.

## Not claimed

Auth0 is integrated and verified locally; production-domain configuration and deployment are not yet claimed. The repository does not contain a confirmed Solana transaction. Sponsor eligibility is not established by these materials alone.
