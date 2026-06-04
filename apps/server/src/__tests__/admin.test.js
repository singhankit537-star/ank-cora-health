import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import app from '../server.js'

let clientToken, adminToken

beforeAll(async () => {
  const adminRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'admin', password: 'password123' })
  adminToken = adminRes.body.token

  const clientRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'client1', password: 'password123' })
  clientToken = clientRes.body.token
})

describe('GET /api/admin/me', () => {
  it('returns 200 with admin profile for valid admin token', async () => {
    const res = await request(app)
      .get('/api/admin/me')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body.role).toBe('admin')
    expect(res.body).not.toHaveProperty('passwordHash')
  })

  it('returns 403 when client token used on admin route', async () => {
    const res = await request(app)
      .get('/api/admin/me')
      .set('Authorization', `Bearer ${clientToken}`)
    expect(res.status).toBe(403)
  })

  it('returns 401 with no token', async () => {
    const res = await request(app).get('/api/admin/me')
    expect(res.status).toBe(401)
  })
})
