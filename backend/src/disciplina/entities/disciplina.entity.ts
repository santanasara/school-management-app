import { Curso } from 'src/curso/entities/curso.entity';
import { Turma } from 'src/turma/entities/turma.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('disciplina')
export class Disciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column({ nullable: true })
  cursoId: number;

  @ManyToOne(() => Curso, (curso) => curso.disciplinas)
  @JoinColumn({ name: 'cursoId' })
  curso: Curso;

  @OneToMany(() => Turma, (turma) => turma.disciplina)
  turma: Turma[];
}