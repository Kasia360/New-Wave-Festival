const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const newConcert = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  };
  db.concerts.push(newConcert);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const concert = db.concerts.find(item => item.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  const updatedConcert = {
    ...concert,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  };
  db.concerts[index] = updatedConcert;
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const concert = db.concerts.find(item => item.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
