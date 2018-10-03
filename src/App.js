import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  onShelfChange = (book, value) => {
    // Return promise so caller knows when update is complete.
    return BooksAPI.update(book, value);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList onShelfChange={this.onShelfChange} />
        )} />
        <Route path='/search' render={() => (
          <BooksSearch onShelfChange={this.onShelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp
