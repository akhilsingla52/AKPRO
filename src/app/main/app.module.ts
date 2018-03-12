import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../appComponent/app.component';
import { SharedRoutingModule, sharedComponents } from '../shared/shared-routes/shared.routing.module';
import { AdminRoutingModule, adminComponents } from '../admin/admin-routes/admin.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    AdminRoutingModule,
    SharedRoutingModule
  ],
  declarations: [
    AppComponent, adminComponents, sharedComponents
  ],
 bootstrap: [AppComponent]
})
export class AppModule { }
