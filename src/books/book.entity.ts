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

    @Column({ nullable: true })
    finishedAt: Date;

    constructor(title: string, user: User) {
        super();
        
        this.title = title;
        this.user = user;
        this.status = BookStatus.TO_READ;
    }

    updateStatus(status: BookStatus) {
        this.status = status;
        this.finishedAt = null;
        
        if(status === BookStatus.DONE)
            this.finishedAt = new Date();
    }
}