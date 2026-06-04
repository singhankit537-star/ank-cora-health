import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../server.js'

// Test authenticateToken + requireRole via the protected routes
describe('authenticateToken middleware', () => {
  it('returns 401 when no token provided', async () => {
    const res = await request(app).get('/api/client/me')
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Access token required')
  })

  it('returns 403 for invalid/malformed token', async () => {
    const res = await request(app)
      .get('/api/client/me')
      .set('Authorization', 'Bearer not-a-real-token')
    expect(res.status).toBe(403)
    expect(res.body.message).toBe('Invalid or expired token')
  })

  it('passes with valid token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'client1', password: 'password123' })
    const token = loginRes.body.token

    const res = await request(app)
      .get('/api/client/me')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})

describe('requireRole middleware', () => {
  it('returns 403 when role does not match', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'client1', password: 'password123' })
    const clientToken = loginRes.body.token

    const res = await request(app)
      .get('/api/admin/me')
      .set('Authorization', `Bearer ${clientToken}`)
    expect(res.status).toBe(403)
    expect(res.body.message).toBe('Forbidden: insufficient role')
  })

  it('passes when role matches', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'password123' })
    const adminToken = loginRes.body.token

    const res = await request(app)
      .get('/api/admin/me')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
  })
})
