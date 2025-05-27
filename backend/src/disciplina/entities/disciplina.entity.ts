import { Turma } from 'src/turma/entities/turma.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('disciplina')
export class Disciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao?: string;

  @OneToMany(() => Turma, (turma) => turma.disciplina)
  turma: Turma[];

}