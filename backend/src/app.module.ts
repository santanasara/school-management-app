import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursoModule } from './curso/curso.module';
import { Curso } from './curso/entities/curso.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // garante que as variáveis estejam disponíveis em todo o app
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: Number(configService.get<string>('DATABASE_PORT') || 5432),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          autoLoadEntities: true,
          entities: [Curso],
          synchronize: true,
        };
      },
    }),

    CursoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
