const express = require('express');
const router = express.Router()

const {getGoals, setGoals, deleteGoal, updateGoal} = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

// Apply the protect middleware to all routes
router.use(protect);

// Routes
router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoal).put(updateGoal)

module.exports = router