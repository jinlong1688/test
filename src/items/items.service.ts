import { Injectable } from '@nestjs/common';
import { DatabaseFactory } from '../database/database.factory';
import { DatabaseService } from '../database/database.interface';
import { Item } from './items.entity';

@Injectable()
export class ItemsService {
  private databaseService: DatabaseService<Item>;

  constructor(
    private databaseFactory: DatabaseFactory,
  ) {
    this.databaseService = this.databaseFactory.createDatabaseService<Item>();
  }

  async find(query: any) {
    return this.databaseService.find(query);
  }

  async create(item: Item) {
    return this.databaseService.create(item);
  }
}