const express=require('express');
const app=express();
app.use(express.json());
const book=[
    {

    id:101,
    title: "Wings on Fire",
    author:" A.P.J. Abdul Kalam ",
    genre:"Autobiography",
    publishedYear:1999,
    available:true

    },
    {
   id:102,
   title: "The Alchemist",
    author:"Paulo Coelho ",
    genre:"Fiction",
    publishedYear:1998,
    available:true
    },
    {
        id:103,
         title: "Harry Potter",
    author:"J.K. Rowling",
    genre:"Fantasy",
    publishedYear:1997,
    available:false
        
    }
];
// GET - Filter books by author
app.get('/api/books/filter', (req, res) => {

    const author = req.query.author;

    const filteredBooks = book.filter(b =>
        b.author.toLowerCase().includes(author?.toLowerCase() || '')
    );

    res.status(200).json(filteredBooks);
});
//GET
app.get('/api/books',(req,res)=>{
    res.status(200).json(book)
});

// POST 
app.post('/api/books', (req, res) => {

    const { title, author, genre, publishedYear, available } = req.body;

    // Validation
   if (
    typeof title !== 'string' || !title.trim() ||
    typeof author !== 'string' || !author.trim() ||
    typeof genre !== 'string' || !genre.trim() ||
    typeof publishedYear !== 'number' ||
    !Number.isInteger(publishedYear) ||
    typeof available !== 'boolean'
) {
    return res.status(400).json({
        message: "Invalid book data"
    });
}
const newBook = {
    id: book.length > 0 ? Math.max(...book.map(b => b.id)) + 1 : 101,
    title,
    author,
    genre,
    publishedYear,
    available
};
    book.push(newBook);

    res.status(201).json(newBook);
});
// GET book by ID
app.get('/api/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const foundBook = book.find(b => b.id === id);

    if (!foundBook) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json(foundBook);
});
// PUT - Update book
app.put('/api/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const foundBook = book.find(b => b.id === id);

    if (!foundBook) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, genre, publishedYear, available } = req.body;

    if (
        typeof title !== 'string' || !title.trim() ||
        typeof author !== 'string' || !author.trim() ||
        typeof genre !== 'string' || !genre.trim() ||
        typeof publishedYear !== 'number' ||
        typeof available !== 'boolean'
    ) {
        return res.status(400).json({
            message: "Invalid book data"
        });
    }

    foundBook.title = title;
    foundBook.author = author;
    foundBook.genre = genre;
    foundBook.publishedYear = publishedYear;
    foundBook.available = available;

    res.status(200).json(foundBook);
});
// DELETE - Delete book
app.delete('/api/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = book.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully"
    });
});
module.exports = app;