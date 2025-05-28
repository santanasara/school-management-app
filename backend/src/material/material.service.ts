import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { TipoMaterial } from './entities/tipo-material.enum';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepository.create(createMaterialDto);
    return await this.materialRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return await this.materialRepository.find({ relations: ['disciplina'] });
  }

  async findOne(id: number): Promise<Material | null> {
    return await this.materialRepository.findOne({
      where: { id },
      relations: ['disciplina'],
    });
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
    await this.materialRepository.update(id, updateMaterialDto);
    return (await this.findOne(id)) as Material;
  }

  async remove(id: number): Promise<void> {
    await this.materialRepository.delete(id);
  }

  async findByDisciplina(disciplinaId: number): Promise<Material[]> {
    return await this.materialRepository.find({
      where: { disciplina: { id: disciplinaId } },
      relations: ['disciplina'],
    });
  }

  async findByTipo(tipo: TipoMaterial): Promise<Material[]> {
    return await this.materialRepository.find({
      where: { tipo },
      relations: ['disciplina'],
    });
  }

  async findByTitulo(titulo: string): Promise<Material[]> {
    return await this.materialRepository
      .createQueryBuilder('material')
      .leftJoinAndSelect('material.disciplina', 'disciplina')
      .where('LOWER(material.titulo) LIKE :titulo', {
        titulo: `%${titulo.toLowerCase()}%`,
      })
      .getMany();
  }

  async buscarComFiltros(
    tipo?: string,
    disciplinaId?: number,
    titulo?: string,
  ): Promise<Material[]> {
    const query = this.materialRepository
      .createQueryBuilder('material')
      .leftJoinAndSelect('material.disciplina', 'disciplina');

    if (tipo) {
      query.andWhere('material.tipo = :tipo', { tipo });
    }

    if (disciplinaId) {
      query.andWhere('disciplina.id = :disciplinaId', { disciplinaId });
    }

    if (titulo) {
      query.andWhere('LOWER(material.titulo) LIKE :titulo', {
        titulo: `%${titulo.toLowerCase()}%`,
      });
    }

    return await query.getMany();
  }
}
