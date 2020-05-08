const express = require('express');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET /testimonials/random – zwracamy losowy element z tablicy.
// POST /testimonials – dodajemy nowy element do tablicy. Możesz założyć, że body przekazywane przez klienta będzie obiektem z dwoma atrybutami author i text. Id dodawanego elementu musisz losować.
// PUT /testimonials/:id – modyfikujemy atrybuty author i text elementu tablicy o pasującym :id. Załóż, że body otrzymane w requeście będzie obiektem z atrybutami author i text.
// DELETE /testimonials/:id – usuwamy z tablicy wpis o podanym id.

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const newOpinion = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(newOpinion);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
const opinion = db.testimonials.find(item => item.id == req.params.id);
const index = db.testimonials.indexOf(opinion);
const updatedOpinion = {
  ...opinion,
  author: req.body.author,
  text: req.body.text
  };
  db.testimonials[index] = updatedOpinion;
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const opinion = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

//concerts

app.get('/concerts', (req, res) => {
res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
res.json(db.concerts.filter(item => item.id == req.params.id));
});

app.post('/concerts', (req, res) => {
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

app.put('/concerts/:id', (req, res) => {
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

app.delete('/concerts/:id', (req, res) => {
const concert = db.concerts.find(item => item.id == req.params.id);
const index = db.concerts.indexOf(concert);
db.concerts.splice(index, 1);
res.json({ message: 'OK' });
});

// seats

app.get('/seats', (req, res) => {
res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
res.json(db.seats.filter(item => item.id == req.params.id));
});

app.post('/seats', (req, res) => {
const newSeat = {
  id: uuidv4(),
  day: req.body.day,
  seat: req.body.seat,
  client: req.body.client,
  email: req.body.email
};
db.seats.push(newSeat);
res.json({ message: 'OK' });
});

app.put('/seats/:id', (req, res) => {
const seat = db.seats.find(item => item.id == req.params.id);
const index = db.seats.indexOf(seat);
const updatedSeat = {
  ...seat,
  day: req.body.day,
  seat: req.body.seat,
  client: req.body.client,
  email: req.body.email
};
db.seats[index] = updatedSeat;
res.json({ message: 'OK' });
});

app.delete('/seats/:id', (req, res) => {
const seat = db.seats.find(item => item.id == req.params.id);
const index = db.seats.indexOf(seat);
db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
