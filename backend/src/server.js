import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { locations, searchClinics, services, testimonials } from './data.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) ?? true,
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/services', (_req, res) => {
  res.json(services)
})

app.get('/api/locations', (_req, res) => {
  res.json(locations)
})

app.get('/api/testimonials', (_req, res) => {
  res.json(testimonials)
})

app.post('/api/appointments/search', (req, res) => {
  const results = searchClinics(req.body ?? {})
  res.json(results.length ? results : searchClinics({}))
})

const port = Number(process.env.PORT ?? 5000)
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`)
})
