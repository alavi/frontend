import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {

  state = {
    myReads: []
  }

  componentDidMount () {
    BooksAPI.getAll().then((myReads) => {
      this.setState({ myReads })
    })

  }


//  updateShelf = (book, shelf) => {
  //  BooksAPI.update(book, shelf)
  //  BooksAPI.getAll().then((myReads) => {
    //    this.setState({ myReads })
  //  })
//  }

  updateShelf = (book, shelf) => {
      //console.log ("in updateShelf:" + book.title + ' ' + book.shelf + ' New Shelf:' + shelf)
    //  console.log (this.state)
    //  console.log(JSON.stringify(BooksAPI.update(book, shelf)))

    BooksAPI.update(book, shelf).then ( () => {
        book.shelf = shelf

    BooksAPI.getAll().then((myReads) => {
        this.setState({ myReads })
    })

        console.log ("in updateShelf:" + book.title + ' ' + book.shelf + ' New Shelf:' + shelf)
      //  this.setState(prevState => {

      return  this.setState(prevState => {
            // remove the book from prevState.myReads and then add it back
           // so it will appears in the end of its new shelf, then return an object with the new
           console.log ("in updateShelf, SetState")
           //console.log (prevState.myReads.filter(item => item.title === book.title))
           //return prevState.myReads.concat(prevState.myReads.filter(item => item.id === book.id))
           prevState.myReads.concat(prevState.myReads.filter(item => item.id === book.id))
       })
    })
 }


//    if (this.state.books !== []) {
//           this.setState(prevState => {
//             return prevState.books.map(book => (
//             myReads.find(l => l.id = book.id ? (book.shelf = l.shelf) : (book.shelf = "none")))
//         )}
//       )}

  render() {

    return (
      <div className="app">
        <Route exact path="/search"  render={() => (
          <SearchPage
            onChangeShelf={this.updateShelf}
            myReads={this.state.myReads}
            />
          )}
          />

         <Route exact path="/"  render={() =>(
           <MainPage onChangeShelf={this.updateShelf}
              myReads={this.state.myReads}
              />)}
           />

      </div>

    )
  }
}

export default BooksApp
