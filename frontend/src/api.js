const API_URL = import.meta.env.VITE_API_URL || 'https://digital-wellbeing-coach.onrender.com'

export async function predict(payload) {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    let message = 'Prediction failed'
    try { message = (await res.json()).detail || message } catch {}
    throw new Error(message)
  }
  return res.json()
}
