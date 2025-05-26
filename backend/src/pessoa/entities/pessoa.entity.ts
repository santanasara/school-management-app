import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('pessoa')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  nome: string;

  @Column({ nullable: false, select: false})
  cpf: string;
}
