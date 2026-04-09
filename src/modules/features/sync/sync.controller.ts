import { Controller, Post, Get, Body, Query, UseGuards, Delete, Param } from '@nestjs/common';
import { ApiKeyGuard } from '../../../common/guards/api-key.guard';
import { SyncService } from './sync.service';
import type { UploadPayload } from './types/sync.types';

@Controller('sync')
@UseGuards(ApiKeyGuard)
export class SyncController {
  constructor(private syncService: SyncService) { }

  @Post('upload')
  upload(@Body() body: UploadPayload) {
    return this.syncService.upload(body);
  }

  @Get('download')
  download(
    @Query('since') since?: string,
    @Query('deviceId') deviceId?: string,
  ) {
    return this.syncService.download(
      since ? parseInt(since) : undefined,
      deviceId,
    );
  }

  @Delete(':tipo/:id')
  softDelete(
    @Param('tipo') tipo: 'campana' | 'pot' | 'ensayo',
    @Param('id') id: string,
  ) {
    return this.syncService.softDelete(tipo, parseInt(id));
  }
}