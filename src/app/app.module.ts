import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './dashboard/autofocus.directive';
import { DraganddropService } from './draganddrop.service';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AutofocusDirective,
    CardComponent,
    ListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule


  ],
  exports:[
    DragDropModule,
  ],
  providers: [DraganddropService],
  bootstrap: [AppComponent]
})
export class AppModule { }
