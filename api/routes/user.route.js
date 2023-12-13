import express from 'express'
import { deleteUser, updateUser } from '../controllers/user.controller.js'
import {verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.put("/update/:id", verifyUser, updateUser)
router.delete("/delete/:id", verifyUser, deleteUser)

export default router