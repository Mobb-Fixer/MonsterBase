const express = require('express');
const mysql = require("mysql")

//Application Express
const app = express()


//Connection à la base de donnée SQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'monsterbase',
})

connection.connect((err) => {
  if(err){
    console.error("Erreur de connexion : " + err.stack)
    return;
  }
  console.log("Connexion réussie à la bdd !")
})


//CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});


//Les Routes

app.use(express.json());

//La route POST

app.post('/api/updateMonster', (req, res) => {
  const { nom, nombre, image } = req.body;
  console.log('Données reçues du front-end :', String(req.body).replace(/\n|\r/g, '')); // Ajout de cette ligne
  const sql = 'INSERT INTO canettes (nom, nombre, image) VALUES (?, ?, ?)';
  connection.query(sql, [nom, nombre, image], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du monstre :', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Monstre ajouté avec succès !'); // Ajout de cette ligne
      res.status(200).send('Monster added successfully');
    }
  });
});


//La route GET

app.get('/api/getMonsters', (req, res) => {
  const sql = 'SELECT * FROM canettes';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching Monsters: ', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(result);
    }
  });
});


//La deuxieme route GET

app.get('/api/getTotalCanettes', (req, res) => {
  const sql = 'SELECT SUM(nombre) AS totalCanettes FROM canettes';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching total Canettes: ', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Renvoie uniquement le total
      res.status(200).json({ totalCanettes: result[0].totalCanettes });
    }
  });
});


//La route PUT

app.put('/api/updateMonster/:id', (req, res) => {
  const monsterId = req.params.id;
  const { nom, nombre, image } = req.body;
  const sql = 'UPDATE canettes SET nom = ?, nombre = ?, image = ? WHERE id = ?';

  connection.query(sql, [nom, nombre, image, monsterId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du monstre :', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Monstre mis à jour avec succès !');
      res.status(200).json({ message: 'Monster updated successfully' });
    }
  });
});


//La route DELETE

app.delete('/api/deleteMonster/:id', (req, res) => {
  const monsterId = req.params.id;
  const sql = 'DELETE FROM canettes WHERE id = ?';

  connection.query(sql, [monsterId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du monstre :', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Monstre supprimé avec succès !');
      res.status(200).send('Monster deleted successfully');
    }
  });
});


module.exports = app;
