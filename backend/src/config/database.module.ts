
// import { Module } from '@nestjs/common';
// import { databaseProviders } from './database.providers';

// @Module({
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleAsyncOptions } from './database.providers';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions)],
})
export class DatabaseModule {}

