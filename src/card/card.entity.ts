import { CustomFieldEntity } from '../custom_field/custom_field.entity';
import { UserEntity } from '../user/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'card' })
export class CardEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'title', length: 100, nullable: false })
    title: string;

    @Column({ name: 'description', length: 400 })
    description: string;

    @CreateDateColumn({ name: 'creation_date' })
    creation_date: Date;

    @Column({ name: 'status', length: 400, nullable: false })
    status: string;

    @ManyToOne(() => UserEntity, (fk_user) => fk_user.cards)
    fk_user: UserEntity;

    @OneToMany(
        () => CustomFieldEntity,
        (custom_fields) => custom_fields.fk_card,
    )
    custom_fields: CustomFieldEntity[];
}
