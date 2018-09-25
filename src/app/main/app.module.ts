import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

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
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(), 
    NgbPaginationModule,
    AdminRoutingModule,
    SharedRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
