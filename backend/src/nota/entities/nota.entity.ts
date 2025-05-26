import { Matricula } from "src/matricula/entities/matricula.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notas')
export class Nota {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    valor: number;

    @Column({ type: 'date' })
    data_lancamento: Date;

    @ManyToOne(() => Matricula, (matricula) => matricula.notas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'matricula_id' })
    matricula: Matricula;

}


