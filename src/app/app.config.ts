import { ApplicationConfig } from '@angular/core';
import { ActivatedRouteSnapshot, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AudioRecordingService } from './utils/record-audio';
import { Cookie } from './utils/cookies';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    Cookie,
    AudioRecordingService
  ]
};
