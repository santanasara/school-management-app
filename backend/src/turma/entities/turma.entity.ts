import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Matricula } from 'src/matricula/entities/matricula.entity';

@Entity('turma')
export class Turma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true})
  nome?: string;

  @Column()
  local: string;

  @Column()
  horario: string;

  @Column({ type: 'date', name: 'data_inicial' })
  dataInicial: Date;

  @Column({ type: 'date', name: 'data_final' })
  dataFinal: Date;

  @ManyToOne(() => Usuario, { nullable: true, eager: true })
  instrutor?: Usuario | null;

  @ManyToOne(() => Disciplina, { nullable: true, eager: false })
  disciplina?: Disciplina | null;

  @OneToMany(() => Matricula, (matricula) => matricula.usuario)
  matriculas: Matricula[];
}