import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTableModule,
  MatIconModule,
  MatSortModule,
  MatSnackBarModule
 } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxBarcodeModule } from 'ngx-barcode';
import { CouponComponent } from './coupon/coupon.component';

@NgModule({
  declarations: [
    AppComponent,
    CouponComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxBarcodeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSortModule,
    MatSnackBarModule
  ],
  entryComponents: [
    CouponComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
