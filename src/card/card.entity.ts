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
import { ECardStatus } from '../enums/card_status.enum';

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

    @Column({
        name: 'status',
        nullable: false,
        type: 'enum',
        enum: ECardStatus,
    })
    status: ECardStatus;

    @ManyToOne(() => UserEntity, (fk_user) => fk_user.cards)
    fk_user: UserEntity;

    @OneToMany(() => CustomFieldEntity, (customField) => customField.fk_card, {
        cascade: true,
    })
    custom_fields: CustomFieldEntity[];
}
