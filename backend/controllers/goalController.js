const asyncHandler = require ('express-async-handler')

const Goal = require('../model/goalModel')
const User = require('../model/userModel')

//@desc Get goals
//@route GET /api/goals
//@access Private

const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//@desc Set goals
//@route POST /api/goals
// @access Private

const setGoals = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user:req.user.id,
    })

    res.status(200).json(goal)
})

//@desc Update goals
//@route PUT /api/goals/:id
//@access Private

const updateGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not Found')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updateGoal)
})

//@desc Delete goals
//@route DELETE /api/goals/:id
//@access Private

const deleteGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not Found')
    }

    await goal.deleteOne()

    res.status(200).json({id:req.params.id})
})



module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}