import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book, BookStatus } from './book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    getBooks(@Query() filter: GetBookFilterDto): Book[] {
        if(Object.keys(filter).length)
            return this.booksService.getBooksFiltered(filter);
        else
            return this.booksService.getAllBooks();
    }

    @Get('/:id')
    getBookById(@Param('id') id: string) {
        return this.booksService.getBookById(id);
    }

    @Post()
    createBook(@Body() command: CreateBookDto): Book {
        return this.booksService.createBook(command);
    }

    @Patch('/:id/status')
    updateBookStatus(@Param('id') id: string, @Body('status') status: BookStatus) {
        return this.booksService.updateBookStatus(id, status);
    }

    @Delete('/:id')
    deleteBook(@Param('id') id: string) {
        this.booksService.deleteBook(id);
    }
}
