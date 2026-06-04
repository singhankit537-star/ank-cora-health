import express from 'express'
import { getAllLocations } from '../data/seed.js'

const router = express.Router()

// GET /api/locations — public, no auth required
router.get('/', (_req, res) => {
  return res.json(getAllLocations())
})

export default router
