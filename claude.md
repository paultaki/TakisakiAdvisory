Claude.md
Project Overview
Project Name: Takisaki OS – Strategic Leadership Infrastructure
Current Phase: MVP Launch / Iterative Refinement
Primary Goal: Equip Paul Takisaki with a custom leadership, coaching, and AI tooling system to amplify his consulting and content platform across paultakisaki.com
Target Users: Paul (creator/operator), coaching clients, execs in transition, high-performers seeking clarity
Expected Outcome: A self-contained leadership ecosystem with modular content, tools, and coaching automation built around Paul’s proprietary frameworksPaul_Takisaki_Bio_2025-…Paul's Brand Story.

Technical Context
Tech Stack:

Frontend: HTML + Tailwind CSS + Vanilla JS

Backend: None (static), with optional integrations via Vercel/Cloudflare Workers

Database: Not used (currently markdown-based/Notion)

Hosting/Deployment: Vercel (for web); Claude Desktop for AI session; Notion for vault scaffolding

Key Dependencies:

Claude Desktop

Vercel

Tailwind CSS

Google Analytics & Tag Manager

Custom prompt scaffolding (e.g., 80/20 Identity Map, Leadership Mirror, Signature Tools)

Development Environment:

Local dev (VS Code), GitHub backup, markdown + Claude sessions for system modeling

Architecture & Structure
Directory Structure:

bash
Copy
Edit
/paultakisaki
/src
/insights
/services
/coaching
claude.md
playbook/
fixer-files/
tools/
Core Components:

claude.md: primes Claude each session

Leadership Vault: reference content for Paul’s coaching frameworks

Signature Tools: tactical prompts, decision systems, templates

Insights: blogs + case studies

Landing Pages: conversion tools (quiz, coaching funnel, PDOM etc.)

Data Flow:
Client → Website (via blog, email, quiz) → Session (Paul) → Vault tracking via Notion + Claude notes
AI tools assist on inbound, follow-up, and reflection (Claude, Make.com agents)

State Management:

None (manual memory + Claude long context)

Long-term: Notion DB + Claude memory sync (future roadmap)

Current Status
Completed Features:

Leadership Vault consolidation

Signature Tools written in markdown

Full HTML website with working CTA & booking

Testimonials curated for proof

Blog pipeline with live insights

In Progress:

Claude session mapping for startup routines

Leadership Mirror quiz logic

AI-powered local concierge (MyPhoenixApp)

Next Up:

Launch quiz funnel

Build pricing/payment intake form

Consolidate Fixer Files into single-view dashboard

Ship PDF vault preview

Code Standards & Rules
Naming Conventions:

kebab-case for files

camelCase for functions

PascalCase for components

Style Guide:

Tailwind utility-first, responsive mobile-first

Minimalist, high-impact (Jobs-style)

No-Touch Zones:

paultakisaki.com public landing layout (unless scoped update)

Past approved testimonials/case studies without flag

Must-Follow Patterns:

80/20 rule = eliminate non-needle movers

All copy = conversational, blunt, high-clarity

Don’t over-build—ship fast, refine later

Business Logic & Requirements
Core Functionality:

Personal site that converts thought leadership into clients

Claude sessions that instantly recall current goals

Vault = scalable coaching asset

Business Rules:

Everything must reinforce credibility, depth, and results

No fluff. No theatrical leadership language.

Edge Cases:

Claude session forgets context → manually restore with claude.md

Vault items drift → re-calibrate via Notion

Performance Targets:

Claude session must remain responsive + grounded

Website: sub-1s load, zero broken paths

Known Issues & Constraints
Technical Debt:

Manual Claude onboarding each session

Lack of persistent memory across Claude + Notion + HTML

Limitations:

No backend/user login

Claude memory caps per session

Dependencies:

Claude desktop + OpenAI runtime

Notion for vault + editorial tracking

Make.com for automation (future)

Workarounds:

Manual markdown sync + Claude priming

Staging Claude prompt packs as JSON/txt + copy/paste vault exports

Testing & Quality
Test Coverage:

Web contact + booking = ✅

Blogs + SEO links = ✅

Quiz logic = ⚠️ (TBD)

Critical Paths:

Home > Book a Call

Quiz > Email capture

Testimonials > Trust-building

Performance Benchmarks:

Site load < 1.5s

Claude recall latency < 5s

Session Context
Last Session Date: June 19, 2025
Last Completed: Vault system updated + testimonial pages mapped
Current Focus: Claude-ready session primer to maintain deep continuity
Specific Instructions for Today: Claude: Prioritize vault access, reflect Paul’s frameworks, eliminate bloat

Reference Information
API Endpoints:

N/A (static site + Claude desktop)

Important URLs:

https://www.paultakisaki.com

LinkedIn

TheFinalsLoadout

Righteously Wretched (brand)

Key Decisions Made:

Site structure = Jobs-style minimalism

Coaching = invite-only, $1500–$2500/mo

Signature content = markdown + Claude-primed

Rejected Approaches:

LMS or Notion-as-front-end (not scalable yet)

Group coaching = de-prioritized for now

Quick Start for Claude:
When starting a session, focus on the “Current Focus” section first.
Maintain voice, tone, structure, and vault language.
Unless explicitly told otherwise, do not refactor existing frameworks.
Priority = insight over polish. Execution > theory.
