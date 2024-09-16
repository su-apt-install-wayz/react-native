const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const client = new Client({
  host: 'localhost', // Assurez-vous que cela pointe vers le service Docker PostgreSQL
  user: 'user',
  password: 'password',
  database: 'pizza_db',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// 1. Sélectionner toutes les pizzas
app.get('/pizzas', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pizzas');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching pizzas', err.stack);
    res.status(500).send('Error fetching pizzas');
  }
});

// 2. Sélectionner une pizza par ID
app.get('/pizzas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM pizzas WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Pizza not found');
    }
  } catch (err) {
    console.error('Error fetching pizza', err.stack);
    res.status(500).send('Error fetching pizza');
  }
});

// 3. Ajouter une nouvelle pizza
app.post('/pizzas', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO pizzas (name, description, price) VALUES ($1, $2, $3) RETURNING *',
      [name, description, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding pizza', err.stack);
    res.status(500).send('Error adding pizza');
  }
});

// 4. Mettre à jour une pizza existante
app.put('/pizzas/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const result = await client.query(
      'UPDATE pizzas SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, description, price, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Pizza not found');
    }
  } catch (err) {
    console.error('Error updating pizza', err.stack);
    res.status(500).send('Error updating pizza');
  }
});

// 5. Supprimer une pizza
app.delete('/pizzas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM pizzas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Pizza not found');
    }
  } catch (err) {
    console.error('Error deleting pizza', err.stack);
    res.status(500).send('Error deleting pizza');
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
