import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

@Entity('turma')
export class Turma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  local: string;

  @Column()
  horario: string;

  @Column({ type: 'date', name: 'data_inicial' })
  dataInicial: Date;

  @Column({ type: 'date', name: 'data_final' })
  dataFinal: Date;

  @ManyToOne(() => Usuario, { nullable: false, eager: true })
  instrutor: Usuario;

  @ManyToOne(() => Disciplina, { nullable: true, eager: true })
  disciplina?: Disciplina;
}