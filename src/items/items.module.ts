import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsEntity } from './items.entity';
import { ItemsSchema } from './items.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsEntity]),
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}