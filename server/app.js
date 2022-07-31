require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => {
  console.log("Db connected");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
