import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BookStatus } from "./book-status.enum";
import { User } from '../auth/user.entity';

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    status: BookStatus;

    @ManyToOne(type => User, user => user.books, { eager: false })
    user: User;

    @Column()
    userId: number;

    constructor(title: string) {
        super();
        
        this.title = title;
        this.status = BookStatus.TO_READ;
    }
}