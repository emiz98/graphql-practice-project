require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => {
  console.log("Db connected");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
