const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;

//dummy
var books = [
  { name: "Name1", genre: "genre1", id: "1", authorId: "1" },
  { name: "Name2", genre: "genre2", id: "2", authorId: "2" },
  { name: "Name3", genre: "genre3", id: "3", authorId: "3" },
  { name: "Name4", genre: "genre4", id: "4", authorId: "2" },
  { name: "Name5", genre: "genre4", id: "5", authorId: "3" },
  { name: "Name6", genre: "genre4", id: "6", authorId: "3" },
];

var authors = [
  { name: "Author1", age: 44, id: "1" },
  { name: "Author2", age: 42, id: "2" },
  { name: "Author3", age: 45, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: GraphQLString },
    age: { type: graphql.GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //code to get data from db
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
