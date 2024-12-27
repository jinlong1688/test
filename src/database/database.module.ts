import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MySQLDatabaseService } from './mysql.service';
import { MongoDBDatabaseService } from './mongo.service';

@Module({})
export class DatabaseModule {
  static async forRootAsync(): Promise<DynamicModule> {
    const configService = new ConfigService();
    const dbType = configService.get('DB_TYPE');
    if (dbType === 'mysql') {
      return {
        module: DatabaseModule,
        imports: [
          TypeOrmModule.forRoot({
            // MySQL 配置
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'test',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
          }),
        ],
        providers: [
          {
            provide: 'DATABASE_SERVICE',
            useClass: MySQLDatabaseService,
          },
        ],
        exports: ['DATABASE_SERVICE'],
      };
    } else if (dbType === 'mongodb') {
      return {
        module: DatabaseModule,
        imports: [
          MongooseModule.forRoot('mongodb://localhost:27017/test'),
        ],
        providers: [
          {
            provide: 'DATABASE_SERVICE',
            useClass: MongoDBDatabaseService,
          },
        ],
        exports: ['DATABASE_SERVICE'],
      };
    } else {
      throw new Error('Invalid database type');
    }
  }
}