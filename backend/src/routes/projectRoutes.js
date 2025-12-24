import { Router } from 'express'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
import  upload  from '../middlewares/uploadMiddleware.js'

const router = Router()

router.get('/', getProjects)
router.post('/', verifyToken, upload.single('image'), createProject)
router.put('/:id', verifyToken, upload.single('image'), updateProject)
router.delete('/:id', verifyToken, deleteProject)

export default router
