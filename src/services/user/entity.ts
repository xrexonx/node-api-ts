
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, OneToMany, JoinTable
} from 'typeorm'

import { Address } from "../address/entity"
import { Contact } from "../contact/entity"


const oneToManyOptions = {
    eager: true
}


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    email: string

    @OneToMany(_ =>
        Address, address => address.user, oneToManyOptions)
    @JoinTable()
    addresses: Address[]

    @OneToMany(_ =>
        Contact, contact => contact.user, oneToManyOptions)
    @JoinTable()
    contacts: Contact[]

    @Column('boolean', {default: true})
    isActive: boolean = true;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
