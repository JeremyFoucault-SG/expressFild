const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

app.disable('etag');

const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/school', (req, res) => {
    console.log('couc')  
    connection.query('SELECT * from school', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération profils');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/school/wild', (req, res) => {
    console.log('opop')  
    connection.query(`SELECT * from school WHERE student_name LIKE '%wild%'`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération profils');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/school/campus', (req, res) => {
    console.log('opop')  
    connection.query(`SELECT * from school WHERE school_name LIKE 'Wild%'`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération profils');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/school/date', (req, res) => {
    console.log('opop')  
    connection.query(`SELECT * from school WHERE birthday_date > '2000-5-09'`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération profils');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/school/desc', (req, res) => {
    console.log('huhu')  
    connection.query(`SELECT * from school ORDER BY student_name DESC`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération profils');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/school/asc', (req, res) => {
    console.log('huhu')  
    connection.query(`SELECT * from school ORDER BY student_name ASC`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération profils');
        } else {
            res.json(results);
        }
    });
});

app.put('/api/school/:id', (req, res) => {
    let id = req.param('id')    
    // récupération des données envoyées
    const formData = req.body;
    // connection à la base de données, et insertion de l'employé
    connection.query(`UPDATE school SET ? WHERE student_id = ${id}`, formData, err => {
        
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la modification d'un élève");
        } else {
            
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200).send("Bravo Champion");
        }
    });
});

app.put('/api/school', (req, res) => {
    // connection à la base de données, et insertion de l'employé
    connection.query(`UPDATE school SET pensionary = !pensionary`, err => {
        
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la modification d'un élève");
        } else {
            
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200).send("Bravo Champion");
        }
    });
});


app.delete('/api/school/:id', (req, res) => {
    
    // récupération des données envoyées
    const idStudent = req.params.id;
    
    // connexion à la base de données, et suppression de l'employé
    connection.query('DELETE FROM school WHERE student_id = ?', [idStudent], err => {
        
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la suppression d'un élève");
        } else {
            
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});

app.delete('/api/school', (req, res) => {
    // connexion à la base de données, et suppression de l'employé
    connection.query('DELETE FROM school WHERE pensionary = 0 ', err => {
        
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la suppression d'un élève");
        } else {
            
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});


app.get('/api/school/:id', (req, res) => {
    let id = req.param('id')
    console.log(res)  
    connection.query(`SELECT * from school WHERE student_id = ${id}`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération profils');
        } else {
            res.json(results);
        }
    });
});


app.post('/api/school', (req, res) => {
    // récupération des données envoyées
    const formData = req.body;
    console.log(formData)
    console.log("bubu")
    // connexion à la base de données, et insertion de l'employé
    connection.query('INSERT INTO school SET ?', formData, (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde d'un éléve");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200).send("Bravo Champion");
        }
    });
});






app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    
    console.log(`Server is listening on ${port}`);
});