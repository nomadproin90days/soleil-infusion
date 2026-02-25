# Soleil Infusion — GHL CRM Automation System

## Project Purpose
Full GoHighLevel CRM automation suite for Soleil Infusion (Glen Burnie, MD).
Built by Stone Systems for client Thuy Cao.

## Directory Structure
- `/workflows` — Machine-readable workflow specs (JSON + README per workflow)
- `/report` — Human-readable documentation (Markdown)
- `/site` — Static web report (deployable to Vercel)
- `/scripts` — Setup scripts for GHL foundation (custom fields, custom values)
- `/docs` — Session logs and reference documents

## For AI Agents (e.g., Gemini, GPT-4)
To consume these workflows:
1. Read `/workflows/index.json` for the full list
2. Load individual `/workflows/[name]/workflow.json` files
3. Each JSON is self-contained with trigger, actions, tags, and compliance rules
4. Reference `/report/index.md` for business context

## Deployment
Live report: [Vercel URL]
