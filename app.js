const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const members = require("./members");

// MAIN ROUTE
app.get("/", (req, res) => res.render("index", {
    title: "Members App",
    members
}))

// HANDLEBARS MIDDLE - WARE
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API / MEMBERS
app.use("/api/members", require("./routes/api/members"));

// PORT AND LISTENING
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on ${PORT}...`))
