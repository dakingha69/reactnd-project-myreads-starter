import React from 'react'
import * as BooksAPI from '../BooksAPI'
import '../App.css'

class Book extends React.Component {
  constructor(props) {
    super(props)
    this.state = {book: this.props.book}
  }
  update = (event) => {
    const { book } = this.props
    BooksAPI.update(book, event.target.value).then(updatedBooks => {
       if (this.props.handleUpdate) {
         this.props.handleUpdate(updatedBooks)
       } else {
         return
       }
    })
  }
  render() {
    const { book } = this.state
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select onChange={this.update}>
                <option value="none" disabled>Move to...</option>
                <option selected={book.shelf === 'currentlyReading'} value="currentlyReading">Currently Reading</option>
                <option selected={book.shelf === 'wantToRead'} value="wantToRead">Want to Read</option>
                <option selected={book.shelf === 'read'} value="read">Read</option>
                <option selected={book.shelf === ''} value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
