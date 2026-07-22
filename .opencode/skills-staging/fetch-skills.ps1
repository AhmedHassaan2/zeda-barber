$baseDir = "C:\Users\A.Hassan\Desktop\open code\.opencode\skills-staging"

$skills = @(
    @{Repo="remotion-dev/skills"; Name="remotion-best-practices"},
    @{Repo="101-skills/skills"; Name="ai-video-generation"},
    @{Repo="101-skills/skills"; Name="ai-image-generation"},
    @{Repo="101-skills/skills"; Name="twitter-automation"},
    @{Repo="101-skills/skills"; Name="ai-avatar-video"},
    @{Repo="101-skills/skills"; Name="remotion-render"},
    @{Repo="getpaperclipai/paperclip"; Name="design-guide"},
    @{Repo="getpaperclipai/paperclip"; Name="para-memory-files"},
    @{Repo="heygen-com/hyperframes"; Name="media-use"},
    @{Repo="heygen-com/hyperframes"; Name="hyperframes-media"},
    @{Repo="heygen-com/hyperframes"; Name="product-launch-video"},
    @{Repo="heygen-com/hyperframes"; Name="faceless-explainer"},
    @{Repo="stablyai/orca"; Name="orchestration"},
    @{Repo="automattic/wp-calypso"; Name="dashboard-create-screen"},
    @{Repo="nextlevelbuilder/ui-ux-pro-max-skill"; Name="ui-ux-pro-max"},
    @{Repo="leonxlnx/taste-skill"; Name="high-end-visual-design"},
    @{Repo="leonxlnx/taste-skill"; Name="design-taste-frontend"},
    @{Repo="leonxlnx/taste-skill"; Name="redesign-existing-projects"},
    @{Repo="leonxlnx/taste-skill"; Name="brandkit"},
    @{Repo="leonxlnx/taste-skill"; Name="imagegen-frontend-web"},
    @{Repo="arvindrk/extract-design-system"; Name="extract-design-system"},
    @{Repo="pbakaus/impeccable"; Name="quieter"},
    @{Repo="pbakaus/impeccable"; Name="impeccable"},
    @{Repo="pbakaus/impeccable"; Name="colorize"},
    @{Repo="pbakaus/impeccable"; Name="optimize"},
    @{Repo="roin-orca/skills"; Name="simple"},
    @{Repo="obra/superpowers"; Name="using-superpowers"},
    @{Repo="obra/superpowers"; Name="verification-before-completion"},
    @{Repo="coreyhaines31/marketingskills"; Name="copywriting"},
    @{Repo="coreyhaines31/marketingskills"; Name="marketing-psychology"},
    @{Repo="coreyhaines31/marketingskills"; Name="content-strategy"},
    @{Repo="llllllllama/rigorpilot-skills"; Name="explore-run"},
    @{Repo="llllllllama/rigorpilot-skills"; Name="ai-research-explore"},
    @{Repo="browser-use/browser-use"; Name="browser-use"}
)

$results = @()

foreach ($skill in $skills) {
    $skillDir = Join-Path $baseDir $skill.Name
    New-Item -ItemType Directory -Force -Path $skillDir | Out-Null
    $filePath = Join-Path $skillDir "SKILL.md"
    
    $found = $false
    $urlPatterns = @(
        "https://raw.githubusercontent.com/$($skill.Repo)/main/skills/$($skill.Name)/SKILL.md",
        "https://raw.githubusercontent.com/$($skill.Repo)/main/$($skill.Name)/SKILL.md",
        "https://raw.githubusercontent.com/$($skill.Repo)/main/SKILL.md"
    )
    
    foreach ($url in $urlPatterns) {
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                $response.Content | Out-File -FilePath $filePath -Encoding UTF8
                $found = $true
                $lineCount = (Get-Content $filePath | Measure-Object -Line).Lines
                $firstLines = Get-Content $filePath -Head 5
                $results += [PSCustomObject]@{
                    Skill = $skill.Name
                    Repo = $skill.Repo
                    Status = "Found"
                    Lines = $lineCount
                    FirstLines = ($firstLines -join "`n")
                }
                break
            }
        } catch {
            # Continue to next pattern
        }
    }
    
    if (-not $found) {
        "Skill not found in repository: $($skill.Repo)" | Out-File -FilePath $filePath -Encoding UTF8
        $results += [PSCustomObject]@{
            Skill = $skill.Name
            Repo = $skill.Repo
            Status = "Not Found"
            Lines = 1
            FirstLines = "Skill not found in repository"
        }
    }
}

# Export results for report
$results | ConvertTo-Json -Depth 3 | Out-File -FilePath "$baseDir\results.json" -Encoding UTF8
Write-Host "Fetch complete. Results saved to results.json"
