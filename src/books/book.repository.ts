import { Book } from './book.entity';
import { Repository, EntityRepository } from "typeorm";
import { GetBookFilterDto } from './dto/get-books-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
    private logger = new Logger();

    async getBooks(filterDto: GetBookFilterDto, user: User): Promise<Book[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('book');

        query.where('book.userId = :userId', { userId: user.id });

        if(status)
            query.andWhere('book.status = :status', { status });

        if(search)
            query.andWhere('book.title ILIKE :search', { search: `%${search}%` });

        try {            
            const result = await query.getMany();
            return result;
        } catch (error) {
            this.logger.error(`Failed to fetch user ${user.username} books.`)
            throw new InternalServerErrorException();
        }
    }

    async getBookById(id: number, user: User): Promise<Book> {
        const book = await this.findOne({ where: { id, userId: user.id }});

        return book;
    }

    async createBook(book: Book): Promise<Book> {
        try {
            await book.save();
            return book;            
        } catch (error) {
            this.logger.error(`Failed to create new book for user ${book.user.username}.`)
            throw new InternalServerErrorException();
        }
    }

    async updateBook(book: Book): Promise<void> {
        await book.save();
    }

    async deleteBook(id: number, user: User): Promise<boolean> {
        const result = await this.delete({ id, userId: user.id });

        if(result.affected === 0)
            return false;

        return true;
    }
}