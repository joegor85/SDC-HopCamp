import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import pg from "pg";
import bodyParser from 'body-parser';
const { Pool } = pg;

dotenv.config();
const app = express();
const pool = new Pool({connectionString: process.env.DATABASE_URL});
pool.connect();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded( {extended: false} ))
app.get('/',(req,res)=>{
    res.send('wows');
})

app.get('/api/campsites',(req,res)=>{
    pool.query(`SELECT * FROM campsites ORDER BY id ASC`).then(response=>{
        res.send(response.rows);
    })
});
//Modified the query to only retreive 10 rows from the last 50 entries in the table:
// app.get('/api/campsites', (req, res) => {
//     pool.query(`
//       SELECT *
//       FROM (
//         SELECT *
//         FROM campsites
//         ORDER BY id DESC
//         LIMIT 50
//       ) AS random_50_rows
//       ORDER BY id ASC
//       LIMIT 10
//     `).then(response => {
//       res.send(response.rows);
//     });
//   });



app.get("/api/ratings", (req, res) => {
    // console.log(req.query);
    pool.query("SELECT * FROM rating", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error reading RATING table`);
        } else if (result.rows.length === 0) {
            console.log(`RATING table not found`);
            res.status(404).send(`RATING table not found`);
        } else {
            res.json(result.rows);
        }
    })
});
//Modified this query to do the same thing, 10 rows from somewhere in the last 50
// app.get("/api/ratings", (req, res) => {
//     pool.query(`
//       SELECT *
//       FROM (
//         SELECT *
//         FROM rating
//         ORDER BY id DESC
//         LIMIT 50
//       ) AS last_50_rows
//       ORDER BY id ASC
//       LIMIT 10
//     `, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send(`Error reading RATING table`);
//       } else if (result.rows.length === 0) {
//         console.log(`RATING table not found`);
//         res.status(404).send(`RATING table not found`);
//       } else {
//         res.json(result.rows);
//       }
//     });
//   });




app.get("/api/camping-spots", (req, res) => {
    // console.log(req.query);
    pool.query("SELECT * FROM camping_spot", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error reading CAMPING_SPOT table`);
        } else if (result.rows.length === 0) {
            console.log(`CAMPING_SPOT table not found`);
            res.status(404).send(`CAMPING_SPOT table not found`);
        } else {
            // console.log(result.rows);
            res.json(result.rows);
        }
    })
});
//Modified this query to do the same thing, 10 rows from somewhere in the last 50
// app.get("/api/camping-spots", (req, res) => {
//     // console.log(req.query);
//     pool.query("SELECT * FROM (SELECT * FROM camping_spot ORDER BY id DESC LIMIT 50) AS last_50_rows ORDER BY id ASC LIMIT 10", (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send(`Error reading CAMPING_SPOT table`);
//         } else if (result.rows.length === 0) {
//             console.log(`CAMPING_SPOT table not found`);
//             res.status(404).send(`CAMPING_SPOT table not found`);
//         } else {
//             // console.log(result.rows);
//             res.json(result.rows);
//         }
//     })
// });




app.get("/api/campers-also", (req, res) => {
    // console.log(req.query);
    pool.query("SELECT * FROM campers_also", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error reading CAMPERS_ALSO table`);
        } else if (result.rows.length === 0) {
            console.log(`CAMPERS_ALSO table not found`);
            res.status(404).send(`CAMPERS_ALSO table not found`);
        } else {
            // console.log(result.rows);
            res.json(result.rows);
        }
    })
});
//Modified this query to do the same thing, 10 rows from somewhere in the last 50
// app.get("/api/campers-also", (req, res) => {
//     // console.log(req.query);
//     pool.query("SELECT * FROM (SELECT * FROM campers_also ORDER BY id DESC LIMIT 50) AS last_50_rows ORDER BY id ASC LIMIT 10", (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send(`Error reading CAMPERS_ALSO table`);
//         } else if (result.rows.length === 0) {
//             console.log(`CAMPERS_ALSO table not found`);
//             res.status(404).send(`CAMPERS_ALSO table not found`);
//         } else {
//             // console.log(result.rows);
//             res.json(result.rows);
//         }
//     })
// });




app.get("/api/photogallery", (req, res) => {
    pool.query("SELECT * FROM photos").then((result) => {
        res.json(result.rows); 
    });
});
//Modified this query to do the same thing, 10 rows from somewhere in the last 50
// app.get("/api/photogallery", (req, res) => {
//     pool.query("SELECT * FROM (SELECT * FROM photos ORDER BY id DESC LIMIT 50) AS last_50_rows ORDER BY id ASC LIMIT 10").then((result) => {
//         res.json(result.rows); 
//     });
// });

//-------------------This route not implemented on page---------------------------------//
// app.get("/api/photogallery/:id", (req, res) => {
// pool
//     .query("SELECT * FROM photos WHERE id = $1", [req.params.id])
//     .then((result) => {
//     if (result.rows.length === 0) {
//         res.status(404).json({ error: "Photo not found" });
//     } else {
//         res.json(result.rows);
//     }
//     })
//     .catch((error) => {
//     res.status(500).json({ error: "Internal server error" });
//     });
// });
//---------------------------------------------------------------------------------------//


app.get('/api/things-nearby', function(req, res) {
    pool.query(`SELECT * FROM things_nearby`, function(err, response) {
        // console.log(err ? err : response.rows)
        res.json(response.rows)
    })
});
//Modified this query to do the same thing, 10 rows from somewhere in the last 50
// app.get('/api/things-nearby', function(req, res) {
//     pool.query(`SELECT * FROM (SELECT * FROM things_nearby ORDER BY id DESC LIMIT 50) AS last_50_rows ORDER BY id ASC LIMIT 10`, function(err, response) {
//         // console.log(err ? err : response.rows)
//         res.json(response.rows)
//     })
// });




app.listen(port,()=>{
    console.log('Listening to port ' + port);
})