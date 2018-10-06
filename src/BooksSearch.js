import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'
import Book from './Book'
import PropTypes from 'prop-types'

class BooksSearch extends Component {
  constructor(props) {
    super(props);
    // Pause 1 sec between calling the searchBooks method.
    this.searchBooksThrottle = _.throttle(this.searchBooks, 1000, { 'leading': false });
  }

  state = {
    searchText: '',
    foundBooks: []
  };

  handleSearchTextChange = (event) => {
    const searchText = event.target.value;
    this.setState({ searchText });
    this.searchBooksThrottle();
  };

  searchBooks = () => {
    // The search method does not return the shelf a book is on. So need to join with getAll.
    Promise.all([BooksAPI.search(this.state.searchText), BooksAPI.getAll()])
    .then(([foundBooks, booksInShelf]) => {
      // Result may be an error object instead of an array with the results.
      if (Array.isArray(foundBooks)) {
        // Create Map for booksInShelf for fast lookup.
        const booksInShelfMap = new Map()
        booksInShelf.forEach(b => booksInShelfMap.set(b.id, b));
        const foundBooksWithShelf = foundBooks.map(foundBook => {
          const bookInShelf = booksInShelfMap.get(foundBook.id);
          if (bookInShelf) {
            // Book is in shelf. Return shelf book because it has shelf prop.
            return bookInShelf;
          }
          // Book is not in shelf. Return book from search result.
          return foundBook;
        });
        this.setState({foundBooks: foundBooksWithShelf});
      }
      else {
        this.setState({foundBooks: []});
      }
    });
  }

  handleShelfChange = (book, value) => {
    this.props.onShelfChange(book, value)
    .then(this.searchBooks); // Reload from Database because this is the truth.
  }

  render() {
    const { searchText, foundBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={searchText} onChange={this.handleSearchTextChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {foundBooks.map(book => (
              <Book key={book.id} book={book} onShelfChange={this.handleShelfChange} />
            ))}
          </ol>
        </div>
      </div>
    )
  };
}

BooksSearch.propTypes = {
  onShelfChange: PropTypes.func.isRequired
};

export default BooksSearch;