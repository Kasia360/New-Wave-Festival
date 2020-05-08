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
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const newOpinion = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.push(newOpinion);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
const opinion = db.find(item => item.id == req.params.id);
const index = db.indexOf(opinion);
const updatedOpinion = {
  ...opinion,
  author: req.body.author,
  text: req.body.text
  };
  db[index] = updatedOpinion;
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const opinion = db.find(item => item.id == req.params.id);
  const index = db.indexOf(opinion);
  db.splice(index, 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
