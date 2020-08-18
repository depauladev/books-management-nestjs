import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BookStatus } from "./book-status.enum";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    status: BookStatus;

    constructor(title: string) {
        super();
        
        this.title = title;
        this.status = BookStatus.TO_READ;
    }
}