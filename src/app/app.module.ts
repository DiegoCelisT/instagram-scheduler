import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { ScheduleAPIService } from './services/schedule-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    HttpClientInMemoryWebApiModule.forRoot(ScheduleAPIService, { delay: 500 }),
    BrowserAnimationsModule,
    FlexLayoutModule,

    MatTabsModule,
    MatListModule,
    MatTableModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
