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
    BooksAPI.search(this.state.searchText)
    .then(foundBooks => {
      this.setState({foundBooks});
      console.log(foundBooks);
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