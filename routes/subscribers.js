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
router.get('/:id', getSubscriber, async(req, res) => {
    //res.send('Get one subscribers by: id')
    res.json(res.subscriber)
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
router.patch('/:id', getSubscriber, urlencodedParser, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }

  if (req.body.subscribedChannel != null) {
    res.subscriber.subscribedChannel = req.body.subscribedChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch {
    res.status(400).json({ message: err.message })
  }

})

// Delete one subscriber
router.delete('/:id', getSubscriber, async(req, res) => {
    //res.send('Delete one subscriber by: id')
    try {
      await res.subscriber.remove()
      res.json({ message: 'Deleted this Subscriber'})
    } catch(err) {
      res.status(500).json({ message: err.message})
    }
})

// Get Subscriber
async function getSubscriber(req, res, next) {
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cant find subscriber'})
    } 
  } catch(err) {
    return res.status(500).json({ message: err.message})
  }
  res.subscriber = subscriber
  next()
}


module.exports = router