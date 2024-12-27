import { Injectable, Inject } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ItemsEntity } from '../items/items.entity';
import { DatabaseService } from './database.interface';

@Injectable()
export class MySQLDatabaseService<T> implements DatabaseService<T> {
  constructor(
    @InjectRepository(ItemsEntity) private readonly repository: Repository<T>,
    private readonly dataSource: DataSource,
  ) {}

  async find(query: any): Promise<T[]> {
    return this.repository.find(query);
  }

  async create(item: T): Promise<T> {
    return this.repository.save(item);
  }

  async update(id: string, item: T): DeepPartial<T | null> {
    await this.repository.update(id, item);
    return this.repository.findOneBy({ id } as any);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}