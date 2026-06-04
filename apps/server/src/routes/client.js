import express from 'express'
import { findUserById } from '../data/seed.js'
import { authenticateToken, requireRole } from '../middleware/auth.js'

const router = express.Router()

// GET /api/client/me — requires valid JWT with role=client
router.get('/me', authenticateToken, requireRole('client'), (req, res) => {
  const user = findUserById(req.user.id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  return res.json({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  })
})

export default router
