import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.interface';
import { MySQLDatabaseService } from './mysql.service';
import { MongoDBDatabaseService } from './mongo.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ItemsEntity } from 'src/items/items.entity';

@Injectable()
export class DatabaseFactory {
  constructor(
    private configService: ConfigService,
    @InjectRepository(ItemsEntity) private readonly repository: Repository<any>,
    private readonly dataSource: DataSource,
    @InjectModel('Item') private readonly model: Model<any>,
  ) {}

  createDatabaseService<T>(): DatabaseService<T> {
    const dbType = this.configService.get('DB_TYPE');
    if (dbType === 'mysql') {
      return new MySQLDatabaseService<T>(this.repository, this.dataSource);
    } else if (dbType === 'mongodb') {
      return new MongoDBDatabaseService<T>(this.model);
    } else {
      throw new Error('Unsupported database type');
    }
  }
}