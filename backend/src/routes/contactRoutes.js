import express from 'express'
import {
  createContact,
  getContacts,
  deleteContact
} from '../controllers/contactController.js'

import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', createContact)
router.get('/', getContacts)  // Diakses tanpa token
router.delete('/:id', verifyToken, deleteContact)

export default router
