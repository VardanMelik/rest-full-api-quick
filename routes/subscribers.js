const express = require('express')
const router = express.Router()

// Get all subscribers
router.get('/', (req, res) => {
    res.send('Get all subscribers')
})

// Get one subscriber
router.get('/:id', (req, res) => {
    res.send('Get one subscribers by: id')
})

// Create one subscriber
router.post('/', (req, res) => {
    res.send('Create one subscriber')
})

// Update one subscriber
router.patch('/:id', (req, res) => {
    res.send('Update one subscriber by: id')
})

// Delete one subscriber
router.delete('/:id', (req, res) => {
    res.send('Delete one subscriber by: id')
})

module.exports = router