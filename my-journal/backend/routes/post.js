const express = require('express')
const Post = require('../models/Post')
const auth = require('../middleware/auth')
const router = express.Router()

// get all posts for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    //sort post by newest first
    const posts = await Post.find({ user: req.user }).sort({ createdAt: -1 })    
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete({ _id: req.params.id, user: req.user })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json({ message: 'Post deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' })
  }
})

// create a new post
router.post('/', auth, async (req, res) => {
  try {
    console.log("Auth user", req.user)
    const newPost = new Post({
      ...req.body,
      user: req.user,
    })
    
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating post' })
  } 
})

// Update particular post
router.patch('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, 
      {...req.body, updatedAt: Date.now()},
      { new: true })
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  }
  catch (error) {
    res.status(500).json({ error: 'Error updating post' })
  }
})



module.exports = router
