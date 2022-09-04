import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import { BrowserRouter } from 'react-router-dom';
import "swiper/css/bundle";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: process.env.REACT_APP_BASE_URL,
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
);
