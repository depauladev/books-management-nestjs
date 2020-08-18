import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { BookStatus } from '../book-status.enum';

export class GetBookFilterDto {
    @IsOptional()
    @IsIn([BookStatus.DONE, BookStatus.IN_PROGRESS, BookStatus.TO_READ])
    status: BookStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}