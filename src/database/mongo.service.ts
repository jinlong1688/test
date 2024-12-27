import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DatabaseService } from './database.interface';
import { Model, Document } from 'mongoose';

@Injectable()
export class MongoDBDatabaseService<T extends Document> implements DatabaseService<T> {
  constructor(@InjectModel('Item') private readonly model: Model<T>) {}

  async find(query: any): Promise<T[]> {
    return this.model.find(query).exec();
  }

  async create(item: T): Promise<T> {
    return this.model.create(item);
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec(); // No error now
  }
}
