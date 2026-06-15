const token = process.env.VERCEL_TOKEN
const projectId = 'zeda-barber'

const vars = [
  { key: 'NEXT_PUBLIC_SUPABASE_URL', value: 'https://kydsogldwxnzberharst.supabase.co', type: 'encrypted', target: ['production', 'preview'] },
  { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZHNvZ2xkd3huemJlcmhhcnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NTM5MzAsImV4cCI6MjA5NzEyOTkzMH0.sfcJBFWDrXySLoKrP5N8XTLIPl8VTyKn9ai9LoRqpB0', type: 'encrypted', target: ['production', 'preview'] },
  { key: 'SUPABASE_SERVICE_ROLE_KEY', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZHNvZ2xkd3huemJlcmhhcnN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU1MzkzMCwiZXhwIjoyMDk3MTI5OTMwfQ.DuBnTLLlfbA6uNDEzbaqthjzksAutNCuSQa16TQOjpM', type: 'encrypted', target: ['production', 'preview'] },
]

async function main() {
  for (const v of vars) {
    const r = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(v),
    })
    const d = await r.json()
    console.log(`${v.key}: ${d.createdAt ? 'OK' : d.error?.message || JSON.stringify(d)}`)
  }

  // Trigger deployment
  const deploy = await fetch(`https://api.vercel.com/v13/deployments`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: projectId,
      project: projectId,
      target: 'production',
      gitSource: { type: 'github', repoId: undefined, ref: 'master', repo: 'AhmedHassaan2/zeda-barber' },
    }),
  })
  const depResult = await deploy.json()
  if (depResult.url) console.log(`\nDeployed: https://${depResult.url}`)
  else console.log(`Deploy: ${depResult.error?.message || JSON.stringify(depResult)}`)
}

main().catch(console.error)
