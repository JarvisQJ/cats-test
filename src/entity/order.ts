import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { McdCookie } from './McdCookie';
import { User } from './User';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mcdProductIds: string;

    @OneToOne(type => McdCookie)
    @JoinColumn()
    mcdCookie: McdCookie;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}