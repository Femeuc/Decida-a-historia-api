// const { Pool } = require('pg');

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: 'root',
//     database: 'firstapi',
//     port: '5432'
// })

// const getUsers = async (req, res) => {
//     const response = await pool.query("SELECT * FROM users");
//     res.status(200).json(response.rows);
// }

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

const getMessage = (req, res) => {
    res.json({ message: "Hello World!" });
}

module.exports = {
    getMessage
}