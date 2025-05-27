import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
