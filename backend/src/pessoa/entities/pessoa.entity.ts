import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pessoa') 
export class Pessoa {
    @PrimaryGeneratedColumn()
    pessoa_id: number; 

    @Column({ type: 'varchar', length: 255 })
    nome: string;
    
    @Column({ type: 'varchar', length: 11, unique: true })
    cpf: string;
}