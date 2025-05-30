import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Matricula } from './entities/matricula.entity';
import { Repository } from 'typeorm';
import { SituacaoMatricula } from './entities/SituacaoMatricula';
import { Turma } from 'src/turma/entities/turma.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { isBefore } from 'date-fns';

@Injectable()
export class MatriculaService {
  constructor(
      @InjectRepository(Matricula)
      private matriculaRepository: Repository<Matricula>,
      @InjectRepository(Turma)
      private readonly turmaRepository: Repository<Turma>,
      @InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>,
    ) {}
  
    async create(createMatriculaDto: CreateMatriculaDto, user: any ): Promise<Matricula> {

      const turma = await this.turmaRepository.findOneBy({ id: createMatriculaDto.turmaId });
      if (!turma) {
        throw new NotFoundException('Turma não encontrada');
      }

      const usuario = await this.usuarioRepository.findOneBy({ id: user.userId  });
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
      const dataMatricula = new Date()

      const matricula = this.matriculaRepository.create({turma,usuario,dataMatricula});

      if (!isBefore(new Date(), new Date(matricula.turma.dataInicial))) {
        throw new BadRequestException('A tuma já iniciau, não é possível realizar a matrícula');
      }

      if (await this.findByTurmaUsuario(matricula.usuario.id, matricula.turma.id)) {
        throw new BadRequestException('Vocjé já esta matriculado');
      }

      return this.matriculaRepository.save(matricula);
    }
  
    async findAll(): Promise<Matricula[]> {
      return this.matriculaRepository.find();
    }

    async findPorInstrutor(id: number): Promise<Matricula[]> {
        return this.matriculaRepository.find({
          where: { turma: { instrutor: { id: id } } },
          relations: ['usuario', 'usuario.pessoa', 'turma', 'turma.disciplina', 'notas'],
        });

    }

    async findPorAluno(idAluno: number, idTurma?:number ): Promise<Matricula[]> {

      const where: any = {
        usuario: { id: idAluno },
      };

      if (idTurma) {
        where.turma = { id: idTurma };
      }

        return this.matriculaRepository.find({
          where,
          relations: ['usuario', 'usuario.pessoa', 'turma', 'turma.disciplina', 'notas'],
        }) 
  
    }
  
    async findOne(id: number): Promise<Matricula> {
      const matricula = await this.matriculaRepository.findOne({ 
        where: { id },
        relations: ['usuario', 'usuario.pessoa', 'notas'],
      });
      if (!matricula) throw new NotFoundException('Matricula não encontrado');
      return matricula;
    }
  
    async findAtivos(): Promise<Matricula[]> {
      return this.matriculaRepository.find({ where: { situacaoMatricula: SituacaoMatricula.ATIVA } });
    }
  
    async findByNome(nome: string, usuario: Usuario): Promise<Matricula[]> {

      if (usuario.perfil == 'admin') {
        return this.matriculaRepository.createQueryBuilder('matricula')
          .leftJoinAndSelect('matricula.turma', 'turma')
          .leftJoinAndSelect('turma.disciplina', 'disciplina')
          .where("1 = 1")
          .andWhere('(LOWER(disciplina.nome) LIKE LOWER(:nome) OR LOWER (turma.nome) LIKE LOWER(:nome))', { nome: `%${nome}%` }).getMany()
      } else if (usuario.perfil == 'prof') {
        //const matricula = await this.findByNomeProfessor(nome, usuario.id);
        return [];
      } else if (usuario.perfil == 'aluno') {
        return (await this.findByNomeAluno(nome, usuario.id)) || [];
      }

      return [];

    }

    async findByNProfessor(nome: string, id: number): Promise<Matricula[]> {
      return this.matriculaRepository.createQueryBuilder('matricula')
        .leftJoinAndSelect('matricula.turma', 'turma')
        .leftJoinAndSelect('turma.disciplina', 'disciplina')
        .where("1 = 1")
        .andWhere('(LOWER(disciplina.nome) LIKE LOWER(:nome) OR LOWER (turma.nome) LIKE LOWER(:nome)) AND turma.instrutor.id == :id', { nome: `%${nome}%`, id: id }).getMany()
    }

    async findByNomeAluno(nome: string, id: number): Promise<Matricula[]> {
      return this.matriculaRepository.createQueryBuilder('matricula')
        .leftJoinAndSelect('matricula.turma', 'turma')
        .leftJoinAndSelect('turma.disciplina', 'disciplina')
        .where("1 = 1")
        .andWhere('(LOWER(disciplina.nome) LIKE LOWER(:nome) OR LOWER (turma.nome) LIKE LOWER(:nome)) AND usuario.id == :id', { nome: `%${nome}%`, id: id }).getMany()
    }

  
    async findByCargaHorariaMinima(min: number): Promise<Matricula[]> {
      return this.matriculaRepository
        .createQueryBuilder('matricula')
        .where('matricula.cargaHoraria > :min', { min })
        .getMany();
    }
  
    async update(id: number, updateMatriculaDto: UpdateMatriculaDto): Promise<Matricula> {
      const matricula = await this.matriculaRepository.preload({
        id,
        ...updateMatriculaDto,
      });
      if (!matricula) throw new NotFoundException('Matricula não encontrado');
      return this.matriculaRepository.save(matricula);
    }
  
    async remove(id: number): Promise<void> {
      const matricula = await this.findOne(id);
      await this.matriculaRepository.remove(matricula);
    }

    async findByTurmaUsuario(idUsuario: number, idTUrma: number): Promise<Matricula | null> {
      const matricula = await this.matriculaRepository.createQueryBuilder('matricula')
        .leftJoinAndSelect('matricula.turma', 'turma')
        .leftJoinAndSelect('matricula.usuario', 'usuario')
        .where("1 = 1")
        .andWhere('turma.id = :idTUrma AND usuario.id = :idUsuario', { idTUrma: idTUrma, idUsuario: idUsuario }).getOne();

      return matricula;
    }
    
    async listarMatriculasPorTurma(id:number, idInstrutor?: number): Promise<Matricula[]> {

      const qb = this.matriculaRepository
        .createQueryBuilder('matricula')
        .leftJoinAndSelect('matricula.turma', 'turma')
        .leftJoinAndSelect('matricula.usuario', 'usuario')
        .leftJoinAndSelect('usuario.pessoa', 'pessoa')
        .leftJoinAndSelect('turma.instrutor', 'instrutor')
        .where("1 = 1")
        .andWhere('turma.id = :id', { id: id })

        if (idInstrutor) {
          qb.andWhere('instrutor.id = :instrutor', { instrutor: idInstrutor })
        }
      

      return qb.getMany() 
    }

    async findByUsuario(idUsuario: number): Promise<Matricula | null> {
      const matricula = await this.matriculaRepository.createQueryBuilder('matricula')
        .leftJoinAndSelect('matricula.turma', 'turma')
        .leftJoinAndSelect('matricula.usuario', 'usuario')
        .where("1 = 1")
        .andWhere('usuario.id = :idUsuario', {idUsuario: idUsuario }).getOne();

      return matricula;
    }


}
