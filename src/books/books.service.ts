import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';
import { BookStatus } from './book-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(BookRepository)
        private bookRepository: BookRepository
    ) {}

    async getBooks(filter: GetBookFilterDto, user: User): Promise<Book[]> {
        return await this.bookRepository.getBooks(filter, user);
    }

    async getBookById(id: number, user: User): Promise<Book> {
        const book = await this.bookRepository.getBookById(id, user);

        if(!book)
            throw new NotFoundException("Book not found");
    
        return book
    }

    async createBook(dto: CreateBookDto, user: User): Promise<Book> {
        const { title } = dto;
        const bookToCreate = new Book(title);
        bookToCreate.user = user;
        
        const book = await this.bookRepository.createBook(bookToCreate);

        delete book.user;
        return book;
    }

    async updateBookStatus(id: number, status: BookStatus, user: User): Promise<Book> {
        const book = await this.getBookById(id, user);
        book.status = status;
        
        await book.save();
        delete book.user;
        return book;
    }

    async deleteBook(id: number, user: User): Promise<void> {
        const result = await this.bookRepository.deleteBook(id, user);

        if(!result)
            throw new NotFoundException(`Book not found`);
    }
}
