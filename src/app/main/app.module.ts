import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../appComponent/app.component';
import { SharedRoutingModule, sharedComponents } from '../shared/shared-routes/shared.routing.module';
import { AdminRoutingModule, adminComponents } from '../admin/admin-routes/admin.routing.module';

@NgModule({
  declarations: [
    AppComponent, adminComponents, sharedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AdminRoutingModule,
    SharedRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
