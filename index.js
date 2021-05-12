const express = require('express')

const app = express()

app.use(express.json())

const books = [
    {title: 'Java Programming', id:1},
    {title: 'C# Programming', id: 2},
    {title: 'Eiffel Programming', id: 3},
    {title: 'NodeJS Programming', id: 4},
    {title: 'Python Programming', id: 5},
    {title: 'C++ Programming', id: 6},
    {title: 'MySql', id: 7},
]

app.get('/', (req, resp) =>{
    resp.send('Rest API using NodeJS and Express')
})

app.get('/api/books', (req, resp) =>{
    resp.send(books)
})

app.get('/api/books/:id', (req, resp) =>{
    const book = books.find(v => v.id === parseInt(req.params.id))
    if(!book) resp.status(404).send('books not found') //if book if empty
    resp.send(book)//return books
})

app.post('/api/books/addBook', (req, resp) =>{ // add a  book
    const book = {
        id: books.length + 1, // add another book to the current one
        title: req.body.title
    }
    books.push(book)
    resp.send(book)
})
app.put('/api/books/:id', (req, resp) =>{
    const book = books.find(v => v.id === parseInt(req.params.id))//put the exact book in 
    if(!book) resp.status(404).send('Books not found') //if book if empty

    book.title = req.body.title // update book

    resp.send(book)
})
app.delete('/api/books/:id', (req, resp) =>{
    const book = books.find(v => v.id === parseInt(req.params.id))//find exact book to delete
    if(!book) resp.status(404).send('Books not found') //if book if empty
    const index = books.indexOf(book)
    books.splice(index, 1)
    resp.send(book)//Particular book is Deleted 
})
app.listen(8080)