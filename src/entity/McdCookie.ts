import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class McdLogin {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mcdCookie: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}