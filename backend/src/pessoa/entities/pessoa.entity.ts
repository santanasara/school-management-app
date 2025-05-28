import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity('pessoa') 
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ type: 'varchar', length: 255 })
    nome: string;
    
    @Column({ type: 'varchar', length: 11, unique: true })
    cpf: string;

    @OneToOne(() => Usuario, usuario => usuario.pessoa, {
        cascade: true, 
        orphanedRowAction: 'delete' 
    })
    usuario: Usuario;

}