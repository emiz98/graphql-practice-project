const graphql = require("graphql");
const Book = require("../models/book.model");
const Author = require("../models/author.model");
const _ = require("lodash");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //code to get data from db
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
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //code to get data from db
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //code to get data from db
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({ name: args.name, age: args.age });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
