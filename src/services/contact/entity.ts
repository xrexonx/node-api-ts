
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { User } from "../user/entity";

@Entity()
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    number: string

    @Column()
    type: string

    @Column()
    userId: number;

    @ManyToOne(_ => User,user => user.contacts,{
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}