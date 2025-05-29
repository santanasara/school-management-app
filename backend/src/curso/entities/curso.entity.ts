import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column({ name: 'carga_horaria' })
  cargaHoraria: number;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Disciplina, (disciplina) => disciplina.cursoId)
  disciplinas: Disciplina[];
}
