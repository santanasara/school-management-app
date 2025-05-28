import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TipoMaterial } from './tipo-material.enum';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({
    type: 'enum',
    enum: TipoMaterial,
    default: TipoMaterial.OUTRO,
  })
  tipo: TipoMaterial;

  @Column()
  link_arquivo: string;

  @ManyToOne(() => Disciplina, { nullable: true, onDelete: 'CASCADE' })
  disciplina: Disciplina | null;
}
