const { Pool } = require('pg');
const parse = require('pg-connection-string').parse;
var pool = null;

const ENV = "prod"; // prod -> production;  dev -> developtment

if(ENV == "prod") { 
    // Remote Database
    var PG_CONNECT_STRING = parse("postgres://mssgbedvtcvmim:67af7195c5906b5b0336a38c80e769bf2b901a6fb9d06e385ee88467a98b876e@ec2-18-210-214-86.compute-1.amazonaws.com:5432/dbe3ockgmrsitv");
    pool = new Pool(PG_CONNECT_STRING);
} else if(ENV == "dev"){ 
    // Local Database
    pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'root',
        database: 'femeuc',
        port: '5432'
    });
} 

const getUserById = async (req, res) => {
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
        req.params.id
    ]);
    res.status(200).json(response.rows);
}

const getPageById = async (req, res) => {
    const response = await pool.query("SELECT * FROM page WHERE id = $1", [
        req.params.id
    ]);
    res.status(200).json(response.rows);
}

const getButtonById = async (req, res) => {
    const response = await pool.query("SELECT * FROM button WHERE id = $1", [
        req.params.id
    ]);
    res.status(200).json(response.rows);
}

module.exports = {
    getUserById,
    getPageById,
    getButtonById
}

// const getUserById = async (req, res) => {
//     const response = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
//     res.json(response.rows);
// }

// const createUser = async (req, res) => {
//     const { name, email } = req.body;
//     const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
//     console.log(response);
//     res.json({
//         message: "User added successfully",
//         body: {
//             user: {name, email}
//         }
//     });
// };

// const updateUser = async (req, res) => {
//     const { name, email } = req.body;
//     await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
//         name, 
//         email, 
//         req.params.id
//     ]);
//     res.json(`user ${req.params.id} updated successfully`); 
// }

// const deleteUser = async (req, res) => {
//     const response = await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
//     res.json(`user ${req.params.id} deleted successfully`);
// }


