import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'

class BooksList extends Component {
  render() {
    const { books } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === 'currentlyReading').map(book => (
                    <Book key={book.id} thumbnailUrl={book.imageLinks.thumbnail}
                      title={book.title} authors={book.authors.join(', ')} />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === 'wantToRead').map(book => (
                    <Book key={book.id} thumbnailUrl={book.imageLinks.thumbnail}
                      title={book.title} authors={book.authors.join(', ')} />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === 'read').map(book => (
                    <Book key={book.id} thumbnailUrl={book.imageLinks.thumbnail}
                      title={book.title} authors={book.authors.join(', ')} />
                  ))}
                </ol>
              </div>
            </div>
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
  books: PropTypes.array.isRequired
};

export default BooksList;