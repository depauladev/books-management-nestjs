import { BookStatus } from "../book-status.enum";

export class BookViewModel {
    id: number;
    title: string;
    status: BookStatus;
    finishedAt: Date;

    constructor(id: number, title: string, status: BookStatus, finishedAt: Date) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.finishedAt = finishedAt;
    }
}