import { PipeTransform, BadRequestException } from "@nestjs/common";
import { BookStatus } from "../book-status.enum";

export class BookStatusValidationPipe implements PipeTransform {
    readonly allowerdStatuses = [
        BookStatus.DONE,
        BookStatus.IN_PROGRESS,
        BookStatus.TO_READ
    ];


    transform(value: any){
        value = value.toUpperCase();

        if(!this.isStatusvalid(value))
            throw new BadRequestException(`${value} is not a valid status`);

        return value;
    }

    private isStatusvalid(status: any) {
        const index = this.allowerdStatuses.indexOf(status);

        return index !== -1;
    }
}