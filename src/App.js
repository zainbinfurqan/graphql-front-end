import React from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Users from './Pages/Users'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})



function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container-fluid">
        <Users />
      </div>
    </ApolloProvider>
  );
}

export default App;
