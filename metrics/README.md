# Workspace Metrics System

## Overview

The Metrics System tracks the health, usage, and quality of all workspace components — agents, skills, commands, playbooks, and knowledge documents.

## What It Tracks

| Category | Metrics | Source |
|----------|---------|--------|
| **Usage** | Times used, last used, success rate | Workspace activity logs |
| **Quality** | Validation, security, performance, documentation scores | Automated scans |
| **Health** | Agent/skill/command quality, dependency freshness | Periodic audits |
| **Trends** | Score changes over time, adoption rates | History log |

## Files

| File | Purpose |
|------|---------|
| `README.md` | This file — system overview |
| `CURRENT.md` | Latest metrics snapshot |
| `HISTORY.md` | Chronological log of all metric entries |
| `REPORT-TEMPLATE.md` | Template for generating periodic reports |
| `SCORING.md` | Formulas and methodology for each score |

## How to Use

### Update Current Snapshot
1. Run `/workspace-validate` to get validation and component counts
2. Run `/security-scan` to get security findings
3. Run `/performance-check` if applicable
4. Update `CURRENT.md` with new values
5. Append entries to `HISTORY.md`

### Generate a Report
1. Copy `REPORT-TEMPLATE.md`
2. Name it `report-YYYY-MM-DD.md`
3. Fill in all sections using `CURRENT.md` and `HISTORY.md` data
4. Review recommendations before acting on them

### Track Trends
- Add entries to `HISTORY.md` after each metrics update
- Compare current values against previous entries
- Flag any declining scores for investigation

## Review Cadence

| Activity | Frequency |
|----------|-----------|
| Update `CURRENT.md` | After each major workspace change |
| Append to `HISTORY.md` | With each `CURRENT.md` update |
| Generate full report | Weekly or monthly |
| Score methodology review | Quarterly |
