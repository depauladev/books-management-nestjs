import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';
import { BookStatus } from './book-status.enum';
import { User } from '../auth/user.entity';
import { BookViewModel } from './dto/book.viewmodel';

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(BookRepository)
        private bookRepository: BookRepository
    ) {}

    async getBooks(filter: GetBookFilterDto, user: User): Promise<BookViewModel[]> {
        const books = await this.bookRepository.getBooks(filter, user);
        const booksVM = books.map(book => this.bookToViewModel(book));

        return booksVM;
    }

    async getBookById(id: number, user: User): Promise<BookViewModel> {
        const book = await this.bookRepository.getBookById(id, user);

        if(!book)
            throw new NotFoundException("Book not found");
    
        return this.bookToViewModel(book);
    }

    async createBook(dto: CreateBookDto, user: User): Promise<BookViewModel> {
        const book = await this.bookRepository.createBook(new Book(dto.title, user));

        return this.bookToViewModel(book);
    }

    async updateBookStatus(id: number, status: BookStatus, user: User): Promise<BookViewModel> {
        const book = await this.bookRepository.getBookById(id, user);

        if(!book)
            throw new NotFoundException("Book not found");

        book.updateStatus(status);
        await this.bookRepository.updateBook(book);
        
        return this.bookToViewModel(book);
    }

    async deleteBook(id: number, user: User): Promise<void> {
        const result = await this.bookRepository.deleteBook(id, user);

        if(!result)
            throw new NotFoundException(`Book not found`);
    }

    private bookToViewModel(book: Book): BookViewModel {
        return new BookViewModel(book.id, book.title, book.status, book.finishedAt);
    }
}
