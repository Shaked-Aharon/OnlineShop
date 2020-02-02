// import { NgModule, Optional, SkipSelf } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule } from '@angular/router';

// import { environment } from '@env/environment';

// import { MAT_DATE_LOCALE } from '@angular/material';
// import { AngularMaterialModule } from '../shared/shared/angular-material.module';

// @NgModule({
//   imports: [
//     AngularMaterialModule,
//     BrowserAnimationsModule,
//     CommonModule,
//     HttpClientModule,
//     RouterModule
//   ],
//   declarations: [ ],
//   providers: [
//     { provide: MAT_DATE_LOCALE, useValue: environment.defaultLanguage }
//   ],
//   exports: []
// })
// export class CoreModule {

//   constructor(@Optional() @SkipSelf() parentModule: CoreModule,
//               private translate: TranslateService,
//               private logger: LoggerService) {

//     this.logger.info('Core Module initialised');

//     throwIfAlreadyLoaded(parentModule, 'CoreModule');
//   }

// }