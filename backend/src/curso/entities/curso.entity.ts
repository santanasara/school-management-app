import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cursos') // nome da tabela no banco
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
