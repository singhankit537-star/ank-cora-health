import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../server.js'

describe('GET /api/locations', () => {
  it('returns 200 with array of locations (no auth required)', async () => {
    const res = await request(app).get('/api/locations')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThanOrEqual(3)
  })

  it('each location has required fields', async () => {
    const res = await request(app).get('/api/locations')
    const loc = res.body[0]
    expect(loc).toHaveProperty('id')
    expect(loc).toHaveProperty('city')
    expect(loc).toHaveProperty('state')
    expect(loc).toHaveProperty('address')
    expect(loc).toHaveProperty('phone')
    expect(loc).toHaveProperty('lat')
    expect(loc).toHaveProperty('lng')
  })

  it('does not require Authorization header', async () => {
    const res = await request(app).get('/api/locations')
    expect(res.status).not.toBe(401)
    expect(res.status).not.toBe(403)
  })
})
