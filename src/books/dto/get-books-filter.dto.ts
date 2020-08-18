import { BookStatus } from '../book.model';

export class GetBookFilterDto {
    status: BookStatus;
    search: string;
}