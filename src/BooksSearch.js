import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'
import Book from './Book'

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

  handleSearchTextChange = (evt) => {
    const txt = evt.target.value;
    this.setState({ searchText: txt });

    this.searchBooksThrottle(txt);
  };

  searchBooks = (arg) => {
    BooksAPI.search(arg).then(res => {
      this.setState({foundBooks: res});
      console.log(res);
    });
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
              <Book key={book.id} thumbnailUrl={book.imageLinks.thumbnail}
                title={book.title} authors={book.authors && book.authors.join(', ')} />
            ))}
          </ol>
        </div>
      </div>
    )
  };
}

export default BooksSearch;