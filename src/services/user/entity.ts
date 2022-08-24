
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
} from 'typeorm'

import { Address } from "../address/entity"
import { Contact } from "../contact/entity"


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    fullName: string

    @Column()
    email: string

    @OneToMany(_ => Address, address => address.user)
    addresses: Address[]

    @OneToMany(_ => Contact, contact => contact.user)
    contacts: Contact[]

    @Column('boolean', {default: true})
    isActive: boolean = true;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
