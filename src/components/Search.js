import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import '../App.css'

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      searchField: '',
      books: [],
      myBooks: ''
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(myBooks => {
      this.setState({myBooks})
    })
  }

  getShelf(book) {
    const myBookIds = this.state.myBooks.map(myBook => myBook.id)
    if (myBookIds.indexOf(book.id) === -1) {
      return ''
    } else {
      return this.state.myBooks[myBookIds.indexOf(book.id)].shelf
    }
  }

  handleSearch = (event) => {
    const query = event.target.value
    BooksAPI.search(query).then(books => {
      this.setState({
        books: books.map(book => {
          return {
            ...book,
            shelf: this.getShelf(book)
          }
        }),
        searchField: query})
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <span className="close-search">Close</span>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" onChange={this.handleSearch} placeholder="Search by title or author"/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.books.map(book => <Book key={book.id} book={book} />)}
            </ol>
          </div>
        </div>
      )
  }
}

export default Search
