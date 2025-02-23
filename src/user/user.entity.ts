import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ERole } from '../enums/role.enum';
import { CardEntity } from '../card/card.entity';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'email', length: 70, nullable: false, unique: true })
    email: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'role', nullable: false, type: 'enum', enum: ERole })
    role: ERole;

    @OneToMany(() => CardEntity, (cards) => cards.fk_user)
    cards: CardEntity[];
}
