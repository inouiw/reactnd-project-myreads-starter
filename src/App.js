import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(b => { 
      console.log(b, b[0]);
      this.setState({ books: b });
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList books={books} />
        )} />
        <Route path='/search' render={() => (
          <BooksSearch />
        )} />
      </div>
    )
  }
}

export default BooksApp
