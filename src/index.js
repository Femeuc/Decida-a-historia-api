const express = require('express');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (resq, resp) => {
    resp.json({ message: "Hello World!" });
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);