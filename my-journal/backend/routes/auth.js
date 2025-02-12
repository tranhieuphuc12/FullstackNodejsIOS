require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = express.Router()

// register user
router.post('/register', async (req, res) => {
    const { email, password } = req.body    
    try {
        const user = new User({ email, password })
        await user.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.status(201).json({ token})
        
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' })
        }
        console.log(error)
        res.status(500).json({ error: 'Error registering user' })
    }
})

router.delete('/delete', async (req, res) => {
    const { email } = req.body
    try {
        await User.deleteMany({})
        res.status(200).json({ message: 'All users deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting users' })
    }
})

// login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body    
    try {
        const user = await User.findOne({ email }).select('+password');               
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.status(200).json({ token })
    } catch (error) {
    
        res.status(500).json({ error: 'Error logging in' })
    }
})

// get user
router.get('/me', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ error: 'Not authorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select('-password')
        
        res.json(user)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching user' })
    }
})

module.exports = router
