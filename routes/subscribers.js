const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const bodyParser = require('body-parser')


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Get all subscribers
router.get('/', async(req, res) => {
    try {
        // Finding all data from database
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    //res.send('Get all subscribers')
})

// Get one subscriber
router.get('/:id', (req, res) => {
    res.send('Get one subscribers by: id')
})

// Create one subscriber
router.post('/',urlencodedParser, async (req, res) => {
    const subscriber = new Subscriber({
      name: req.body.name,
      subscribedChannel: req.body.subscribedChannel
    })
  
    try {
      const newSubscriber = await subscriber.save()
      res.status(201).json(newSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
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