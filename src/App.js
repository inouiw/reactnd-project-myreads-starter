import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
        {this.state.showSearchPage ? (
          <BooksSearch />
        ) : (
            <BooksList books={books} />
        )}
      </div>
    )
  }
}

export default BooksApp
