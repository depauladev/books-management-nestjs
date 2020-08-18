import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';
import { BookStatus } from './book-status.enum';

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(BookRepository)
        private bookRepository: BookRepository
    ) {}

    async getBooks(filter: GetBookFilterDto): Promise<Book[]> {
        return await this.bookRepository.getBooks(filter);
    }

    async getBookById(id: number): Promise<Book> {
        const book = await this.bookRepository.getBookById(id);

        if(!book)
            throw new NotFoundException("Book not found");
    
        return book
    }

    async createBook(dto: CreateBookDto): Promise<Book> {
        const { title } = dto;
        
        const book = await this.bookRepository.createBook(new Book(title));

        return book;
    }

    async updateBookStatus(id: number, status: BookStatus): Promise<Book> {
        const book = await this.getBookById(id);
        book.status = status;
        
        await book.save();
        return book;
    }

    async deleteBook(id: number): Promise<void> {
        const result = await this.bookRepository.deleteBook(id);

        if(!result)
            throw new NotFoundException(`Book not found`);
    }
}
