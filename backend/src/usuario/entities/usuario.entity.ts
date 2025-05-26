import { Matricula } from 'src/matricula/entities/matricula.entity';
import { Pessoa } from 'src/pessoa/entities/pessoa.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Pessoa) 
  @JoinColumn() 
  pessoa: Pessoa;

  @Column() 
  email: string;

  @Column() 
  senha: string;

  @Column() 
  login: string;

  @Column() 
  perfil: string;

  @OneToMany(() => Matricula, (matricula) => matricula.usuario)
  matriculas: Matricula[];
}