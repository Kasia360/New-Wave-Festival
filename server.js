const express = require('express');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// data
// const db = [
//   { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
//   {
//     id: 2,
//     author: 'Amanda Doe',
//     text: 'They really know how to make you happy.'
//   }
// ];

// GET /testimonials – ma po prostu zwracać całą zawartość tablicy.
// GET /testimonials/:id – zwracamy tylko jeden element tablicy, zgodny z :id.
// GET /testimonials/random – zwracamy losowy element z tablicy.
// POST /testimonials – dodajemy nowy element do tablicy. Możesz założyć, że body przekazywane przez klienta będzie obiektem z dwoma atrybutami author i text. Id dodawanego elementu musisz losować.
// PUT /testimonials/:id – modyfikujemy atrybuty author i text elementu tablicy o pasującym :id. Załóż, że body otrzymane w requeście będzie obiektem z atrybutami author i text.
// DELETE /testimonials/:id – usuwamy z tablicy wpis o podanym id.

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter(item => item.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
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
  console.log(req.body);
  db.map(item =>
    item.id == req.params.id
      ? { ...item, author: req.body.author, text: req.body.text }
      : item
  );
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  console.log(req.params);
  //db.filter(item => item.id !== req.params.id);
  res.json({ message: 'OK' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
