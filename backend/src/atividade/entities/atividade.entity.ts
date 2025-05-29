import { Turma } from 'src/turma/entities/turma.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('atividade')
export class Atividade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  titulo: string;

  @Column({ nullable: true})
  descricao?: string;

  @Column({ type: 'date', name: 'data_inicial' })
  dataInicial: Date;

  @Column({ type: 'date', name: 'data_final' })
  dataFinal: Date;

  @ManyToOne(() => Turma, { nullable: false, onDelete: 'CASCADE' })
  turma: Turma;

}
