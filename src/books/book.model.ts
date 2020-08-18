export interface Book {
    id: string;
    title: string;
    status: BookStatus;
}

export enum BookStatus {
    TO_READ = 'TO_READ',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}