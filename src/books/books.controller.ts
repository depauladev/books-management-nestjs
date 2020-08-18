import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';
import { BookStatusValidationPipe } from './pipes/book-status-validation.pipe';
import { Book } from './book.entity';
import { BookStatus } from './book-status.enum';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    getBooks(@Query(ValidationPipe) filter: GetBookFilterDto): Promise<Book[]> {
        return this.booksService.getBooks(filter);
    }
    
    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) id: number): Promise<Book> {
        return this.booksService.getBookById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBook(@Body() book: CreateBookDto): Promise<Book> {
        return this.booksService.createBook(book);
    }

    @Patch('/:id/status')
    updateBookStatus(@Param('id', ParseIntPipe) id: number, @Body('status', BookStatusValidationPipe) status: BookStatus): Promise<Book> {
        return this.booksService.updateBookStatus(id, status);
    }

    @Delete('/:id')
    deleteBook(@Param('id', ParseIntPipe) id: number): void {
        this.booksService.deleteBook(id);
    }
}
