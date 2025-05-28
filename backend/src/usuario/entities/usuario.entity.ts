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

export type Perfil = 'prof' | 'aluno' | 'admin';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pessoa_id' })  
  pessoa_id: number;

  @OneToOne(() => Pessoa)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @Column() 
  email: string;

  @Column() 
  senha: string;

  @Column()
  login: string;

  @Column() 
  perfil: Perfil;

  @OneToMany(() => Matricula, (matricula) => matricula.usuario)
  matriculas: Matricula[];
}