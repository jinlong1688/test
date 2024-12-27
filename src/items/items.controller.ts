import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DatabaseFactory } from '../database/database.factory';
import { DatabaseService } from '../database/database.interface';
import { ItemsService } from './items.service';
import { Item } from './items.entity';

@Controller('items')
export class ItemsController {
  private databaseService: DatabaseService<Item>;

  constructor(
    private databaseFactory: DatabaseFactory,
    private itemsService: ItemsService,
  ) {
    this.databaseService = this.databaseFactory.createDatabaseService<Item>();
  }

  @Get()
  async find(@Query() query: any) {
    return this.databaseService.find(query);
  }

  @Post()
  async create(@Body() item: Item) {
    return this.databaseService.create(item);
  }
}