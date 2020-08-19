import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';
import { BookStatusValidationPipe } from './pipes/book-status-validation.pipe';
import { BookStatus } from './book-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { BookViewModel } from './dto/book.viewmodel';

@ApiBearerAuth()
@ApiTags("Books")
@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    @ApiOperation({ summary: 'Get all user books' })
    getBooks(@Query(ValidationPipe) filter: GetBookFilterDto, @GetUser() user: User): Promise<BookViewModel[]> {
        return this.booksService.getBooks(filter, user);
    }
    
    @Get('/:id')
    @ApiOperation({ summary: 'Get book by id' })
    getBookById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<BookViewModel> {
        return this.booksService.getBookById(id, user);
    }

    @Post()
    @ApiOperation({ summary: 'Create new book' })
    @UsePipes(ValidationPipe)
    createBook(@Body() book: CreateBookDto, @GetUser() user: User): Promise<BookViewModel> {
        return this.booksService.createBook(book, user);
    }

    @Patch('/:id/status')
    @ApiOperation({ summary: 'Update book status' })
    updateBookStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BookStatusValidationPipe) status: BookStatus, 
        @GetUser() user: User): Promise<BookViewModel> {
        return this.booksService.updateBookStatus(id, status, user);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete book by id' })
    deleteBook(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): void {
        this.booksService.deleteBook(id, user);
    }
}
