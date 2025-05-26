import { Matricula } from 'src/matricula/entities/matricula.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()  
  pessoa_id: number;

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