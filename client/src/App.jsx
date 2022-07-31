import React from "react";
import BookList from "./components/BookList";
import { gql, useQuery } from "@apollo/client";

function App() {
  const GET_BOOKS = gql`
    query {
      books {
        name
        id
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_BOOKS);

  return (
    <div className="h-screen w-screen bg-red-900">
      <BookList />
    </div>
  );
}

export default App;
