import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class BooksList extends Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.loadBooks();
  }
  
  loadBooks = () => {
    BooksAPI.getAll().then(books => { 
      this.setState({ books });
    });
  }

  // Increases UI update performance from 3 sec to 1 sec when shelf value is changed.
  updateStateOptimistically = (book, newShelfVal) => {
    const bookCopy = JSON.parse(JSON.stringify(book));
    bookCopy.shelf = newShelfVal;
    const copyOfBooksExeptChanged = this.state.books.filter(b => b.id !== book.id);
    this.setState({ books: [...copyOfBooksExeptChanged, bookCopy]});
  };

  handleShelfChange = (book, value) => {
    this.updateStateOptimistically(book, value);
    this.props.onShelfChange(book, value)
    .then(this.loadBooks); // Reload from Database because this is the truth.
  }

  render() {
    const { books } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf shelf='currentlyReading' title='Currently Reading' books={books} onShelfChange={this.handleShelfChange} />
            <Bookshelf shelf='wantToRead' title='Want to Read' books={books} onShelfChange={this.handleShelfChange} />
            <Bookshelf shelf='read' title='Read' books={books} onShelfChange={this.handleShelfChange} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

BooksList.propTypes = {
  onShelfChange: PropTypes.func.isRequired
};

export default BooksList;