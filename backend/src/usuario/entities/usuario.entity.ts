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

  @OneToOne(() => Pessoa, { eager:true,  onDelete: 'CASCADE'})
  @JoinColumn({ name: 'id' })
  pessoa: Pessoa;

  @Column()  
  pessoa_id: number;

  @Column({select:false}) 
  email: string;

  @Column({select:false}) 
  senha: string;

  @Column({select:false})
  login: string;

  @Column() 
  perfil: Perfil;

  @OneToMany(() => Matricula, (matricula) => matricula.usuario)
  matriculas: Matricula[];
}