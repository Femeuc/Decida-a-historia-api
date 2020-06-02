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

// GET routes
const getUserById = async (req, res) => {
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

const getUserByUsername = async (req, res) => {
    const response = await pool.query("SELECT * FROM users WHERE username = $1", [
        req.query.username
    ]);
    res.status(200).json({response: response.rows});
}

const getStoryById = async (req, res) => {
    const response = await pool.query("SELECT * FROM story WHERE id = $1", [
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

const getStoriesByGenre = async (req, res) => {
    const response = await pool.query("SELECT * FROM story WHERE genre = $1", [
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

const getAllStories = async (req, res) => {
    const response = await pool.query("SELECT * FROM story");
    res.status(200).json({response: response.rows});
}

const getPageById = async (req, res) => {
    const response = await pool.query("SELECT * FROM page WHERE id = $1", [
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

const getAllPages = async (req, res) => {
    const response = await pool.query("SELECT * FROM page");
    res.status(200).json({response: response.rows});
}

const getPageWhereButtonIs = async (req, res) => {
    const response = await pool.query("SELECT * FROM page WHERE button1 = $1", [
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

const getButtonById = async (req, res) => {
    const response = await pool.query("SELECT * FROM button WHERE id = $1", [
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

const getButtonWherePageIs = async (req, res) => {
    const response = await pool.query("SELECT * FROM button WHERE linked_page = $1", [
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

const getPageInnerJoinButton1AndButton2 = async (req, res) => {
    let sql = "SELECT page.id AS page_id, page.story AS story, button1.name AS button_1," +
        " button2.name AS button_2, button1.id AS btn1_id, button2.id AS btn2_id FROM " +
        "page INNER JOIN button button1 ON page.button1 = button1.id INNER JOIN button" +
        " button2 ON page.button2 = button2.id WHERE page.id = $1";

    const response = await pool.query(sql, [
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}


// POST routes
const createPage = async (req, res) => {
    const response = await pool.query("INSERT INTO page(story, button1, button2) VALUES ($1, $2, $3) RETURNING id", [
        req.body.story,
        req.body.button1,
        req.body.button2
    ]);
    res.status(200).json({response: response.rows[0].id});
}

const createStory = async (req, res) => {
    const response = await pool.query("INSERT INTO story(genre, title, description) VALUES ($1, $2, $3) RETURNING id", [
        req.body.genre,
        req.body.title,
        req.body.description
    ]);
    res.status(200).json({response: response.rows[0].id});
}

const createButton = async (req, res) => {
    const response = await pool.query("INSERT INTO button(name) VALUES ($1) RETURNING id", [
        req.body.name
    ]);
    res.status(200).json({response: response.rows[0].id});
}

const createButtonWithRelation = async (req, res) => {
  const response = await pool.query("INSERT INTO button(name, linked_page) VALUES ($1, $2) RETURNING id", [
      req.body.name,
      req.body.id
  ]);
  res.status(200).json({response: response.rows[0].id});
}

const createPageAndItsButtons = async (req, res) => {
    const response1 = await pool.query("INSERT INTO button(name) VALUES ($1) RETURNING id", [
        req.body.button1
    ]);
    const response2 = await pool.query("INSERT INTO button(name) VALUES ($1) RETURNING id", [
        req.body.button2
    ]);

    let button1_id = response1.rows[0].id;
    let button2_id = response2.rows[0].id;

    const response3 = await pool.query("INSERT INTO page(story, button1, button2) VALUES ($1, $2, $3) RETURNING id", [
        req.body.story,
        button1_id,
        button2_id
    ]);

    res.status(200).json({response: response3.rows[0].id});
 }

const createUser = async (req, res) => { // returns null if the chosen username is unavailable
    const response1 = await pool.query("SELECT COUNT(*) FROM users WHERE username = $1", [
        req.body.username
    ]);
    let result = null;
    if(parseInt(response1.rows[0].count) == 0) { // if the chosen username is available
       const response2 = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id", [
               req.body.username,
               req.body.password
       ]);
       result = response2.rows[0].id;
    }
    res.status(200).json({
        response : result
    });
 }


// PUT routes
const updateStory = async (req, res) => {
    const response = await pool.query("UPDATE story SET " + req.body.name + " = $1 WHERE id = $2", [
        req.body.value,
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

const updateButton = async (req, res) => {
    const response = await pool.query("UPDATE button SET " + req.body.name + " = $1 WHERE id = $2", [
        req.body.value,
        req.params.id
    ]);
    res.status(200).json({response: response.rows});
}

module.exports = {
    getUserById,
    getUserByUsername,
    getStoryById,
    getAllStories,
    getPageById,
    getAllPages,
    getPageWhereButtonIs,
    getButtonById,
    getButtonWherePageIs,
    getStoriesByGenre,
    getPageInnerJoinButton1AndButton2,

    createPage,
    createStory,
    createButton,
    createButtonWithRelation,
    createPageAndItsButtons,
    createUser,

    updateStory,
    updateButton
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


