import { Injectable } from '@nestjs/common';
import { Book, BookStatus } from './book.model';
import { v4 as uuidv4 } from 'uuid'
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BooksService {
    private books: Book[] = [];

    getAllBooks(): Book[] {
        return this.books;
    }

    getBooksFiltered(filter: GetBookFilterDto): Book[] {
        const { status, search } = filter;

        let books = this.getAllBooks();

        if (status) 
            books = books.filter(book => book.status === status);
        
        if (search)
            books = books.filter(book => book.title.includes(search));

        return books;
    }

    getBookById(id: string): Book {
        return this.books.find(book => book.id === id);
    }

    createBook(command: CreateBookDto): Book {
        const { title } = command;

        const book: Book = {
            id: uuidv4(),
            title,
            status: BookStatus.TO_READ,
        };

        this.books.push(book);
        return book;
    }

    updateBookStatus(id: string, status: BookStatus): Book {
        const book: Book = this.getBookById(id);
        book.status = status;
        return book;
    }

    deleteBook(id: string): void {
        this.books = this.books.filter(book => book.id !== id);
    }
}
