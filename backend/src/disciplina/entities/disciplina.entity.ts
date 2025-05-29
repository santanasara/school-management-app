import { Turma } from 'src/turma/entities/turma.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('disciplina')
export class Disciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao?: string;

  @OneToMany(() => Turma, (turma) => turma.disciplina)
  turma: Turma[];

}