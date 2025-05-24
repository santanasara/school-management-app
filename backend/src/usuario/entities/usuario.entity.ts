import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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
}