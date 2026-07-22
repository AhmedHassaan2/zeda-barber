# Scoring Methodology

## Score Categories

### Validation Score (0–100)

**Source:** `/workspace-validate` results

| Check | Weight | Scoring |
|-------|--------|---------|
| All agents present | 20% | 100 if all expected agents exist, penalty per missing |
| All skills present | 20% | 100 if all expected skills exist, penalty per missing |
| All commands present | 15% | 100 if all expected commands exist, penalty per missing |
| Manifest sync | 15% | 100 if manifests match actual file counts |
| No broken references | 15% | 100 if no dead links, -10 per broken reference |
| File naming valid | 10% | 100 if all names follow conventions |
| No orphan files | 5% | 100 if all files are referenced |

**Formula:** `Σ(check_score × weight)`

### Security Score (0–100)

**Source:** `/security-scan` results

| Check | Weight | Scoring |
|-------|--------|---------|
| No hardcoded secrets | 40% | 100 if clean, 0 if any found |
| No unsafe patterns | 25% | 100 if clean, -20 per finding |
| No sensitive data in docs | 20% | 100 if clean, -15 per finding |
| Dependency audit clean | 15% | 100 if no known vulnerabilities |

**Formula:** `Σ(check_score × weight)`

### Performance Score (0–100)

**Source:** `/performance-check` or manual review

| Check | Weight | Scoring |
|-------|--------|---------|
| File sizes reasonable | 30% | 100 if all under 300 lines |
| No excessive imports | 25% | 100 if all under 15 imports |
| Efficient patterns used | 25% | 100 if no anti-patterns detected |
| No redundant content | 20% | 100 if no duplication found |

**Formula:** `Σ(check_score × weight)`

### Documentation Score (0–100)

**Source:** Manual review or automated check

| Check | Weight | Scoring |
|-------|--------|---------|
| README exists | 20% | 100 if present, 0 if missing |
| Content completeness | 30% | 0–100 based on sections filled |
| Examples included | 20% | 100 if examples present |
| Cross-references valid | 15% | 100 if all links resolve |
| Consistent formatting | 15% | 100 if follows template |

**Formula:** `Σ(check_score × weight)`

## Component Quality Scores

### Agent Quality (0–100)

| Factor | Weight | Scoring |
|--------|--------|---------|
| Description length | 15% | 100 if 20+ words, scaled down |
| Metadata complete | 20% | 100 if all fields present |
| Instructions clear | 30% | 0–100 based on detail level |
| Examples included | 20% | 100 if examples present |
| No placeholder text | 15% | 100 if clean, 0 if placeholders |

### Skill Quality (0–100)

| Factor | Weight | Scoring |
|--------|--------|---------|
| Workflow steps defined | 25% | 100 if 5+ steps, scaled |
| Code examples included | 25% | 100 if examples present |
| References valid | 20% | 100 if all links resolve |
| Metadata complete | 15% | 100 if all fields present |
| No outdated content | 15% | 100 if current, penalty if stale |

### Command Quality (0–100)

| Factor | Weight | Scoring |
|--------|--------|---------|
| Usage instructions | 25% | 100 if clear usage docs |
| Agent routing correct | 25% | 100 if properly routed |
| Metadata complete | 20% | 100 if all fields present |
| Examples included | 15% | 100 if examples present |
| Error handling noted | 15% | 100 if edge cases documented |

## Usage Scores

### Component Usage Score (0–100)

Based on how often a component is actually used relative to peers:

| Usage Level | Score |
|-------------|-------|
| Top 10% most used | 100 |
| Top 25% | 80 |
| Average | 60 |
| Below average | 40 |
| Zero uses | 0 |

### Adoption Rate

```
adoption_rate = (components_used / total_components) × 100
```

## Trend Calculation

| Indicator | Definition |
|-----------|-----------|
| Improving | Current score > previous score by 5+ points |
| Stable | Current score within ±5 points of previous |
| Declining | Current score < previous score by 5+ points |
| Unknown | Only one data point available |

## Aggregate Health Score

```
health_score = (validation × 0.25) + (security × 0.30) + (performance × 0.20) + (documentation × 0.25)
```

| Health Level | Score Range | Action |
|--------------|-------------|--------|
| Excellent | 90–100 | Maintain |
| Good | 75–89 | Monitor |
| Needs Attention | 50–74 | Plan improvements |
| Poor | Below 50 | Immediate action required |
