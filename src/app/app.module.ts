import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ReactiveComponentModule } from '@ngrx/component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store';
import { environment } from '../environments/environment';
import * as components from './game/components';
import { EffectsModule } from '@ngrx/effects';
import { StartGameEffect } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    components.BoardComponent,
    components.CellComponent,
    components.StatusBarComponent,
    components.ClockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveComponentModule,
    FontAwesomeModule,
    MatButtonModule,
    MatGridListModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([StartGameEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
