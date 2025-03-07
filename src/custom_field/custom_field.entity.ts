import { CardEntity } from '../card/card.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ECustomFieldType } from '../enums/custom_field_type.enum';

@Entity({ name: 'custom_field' })
export class CustomFieldEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'title', length: 100, nullable: false })
    title: string;

    @Column({ name: 'description', length: 400 })
    description: string;

    @Column({ name: 'type', type: 'enum', enum: ECustomFieldType })
    type: ECustomFieldType;

    @Column({ name: 'text', nullable: true })
    text?: string;

    @Column({ name: 'boolean', nullable: true })
    boolean?: boolean;

    @Column({ name: 'list', type: 'json', nullable: true })
    list?: string[];

    @ManyToOne(() => CardEntity, (card) => card.custom_fields, {
        onDelete: 'CASCADE',
    })
    fk_card: CardEntity;
}
