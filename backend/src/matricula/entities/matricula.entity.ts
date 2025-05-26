import { Nota } from 'src/nota/entities/nota.entity';
import { Turma } from 'src/turma/entities/turma.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

@Entity('matricula')
export class Matricula {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    data_matricula: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.matriculas, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Turma, (turma) => turma.matriculas, { eager: true })
    @JoinColumn({ name: 'turma_id' })
    turma: Turma;

    @OneToMany(() => Nota, (nota) => nota.matricula)
    notas: Nota[];


}
