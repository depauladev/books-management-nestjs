import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';
import { BookStatusValidationPipe } from './pipes/book-status-validation.pipe';
import { Book } from './book.entity';
import { BookStatus } from './book-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    getBooks(@Query(ValidationPipe) filter: GetBookFilterDto, @GetUser() user: User): Promise<Book[]> {
        return this.booksService.getBooks(filter, user);
    }
    
    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Book> {
        return this.booksService.getBookById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBook(@Body() book: CreateBookDto, @GetUser() user: User): Promise<Book> {
        return this.booksService.createBook(book, user);
    }

    @Patch('/:id/status')
    updateBookStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BookStatusValidationPipe) status: BookStatus, 
        @GetUser() user: User): Promise<Book> {
        return this.booksService.updateBookStatus(id, status, user);
    }

    @Delete('/:id')
    deleteBook(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): void {
        this.booksService.deleteBook(id, user);
    }
}
