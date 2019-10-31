import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CouponInterface } from './coupon.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MatSnackBar } from '@angular/material';
import { CouponService } from './coupon.service';

const PREFIX: string[] = ['981', '982'];
const APP_DATE_FORMATS = {
  parse: {dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'},
      monthYearLabel: {year: 'numeric'}
  }
};

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}],
  encapsulation: ViewEncapsulation.None
})
/**
 * Inner manipulation in popup, CREATE, UPDATE coupon
 */
export class CouponComponent implements OnInit {
  public barcodeValue: string;
  public couponForm: FormGroup;
  private flagAction: boolean;

  constructor(
    private service: CouponService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  /**
   * Init Reactive form with data and without data
   */
  ngOnInit() {
    if (this.data) {
      const couponForm = {};
      for (const item of Object.keys(this.data)) {
        couponForm[item] = [this.data[item], Validators.required];
      }
      this.couponForm = this.formBuilder.group(couponForm);
      this.flagAction = true;
    } else {
      this.couponForm = this.formBuilder.group({
        name: ['', Validators.required],
        status: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        discount: ['', Validators.required],
        id: ['', Validators.required],
        barcode: ['', Validators.required]
      });
      this.flagAction = false;
    }
    this.generateCode(this.couponForm.value.barcode);
  }
  /**
   * Generate barcode function
   * @param value
   */
  public generateCode(value: string) {
    this.barcodeValue = !value ? PREFIX[Math.round(Math.random())] + Math.random().toString().slice(2, 11) : value;
  }
  /**
   * Submit Reactive Form, switching for creating and updating
   */
  onSubmit() {
    if (this.flagAction) {
      this.service.updateCoupon(this.couponForm.value);
      this.couponForm.value.barcode = this.barcodeValue;
      this.snackBar.open('UPDATE', null, {
        duration: 2000,
      });
    } else {
      const ID = '_' + Math.random().toString(36).substr(2, 9);
      this.couponForm.value.id = ID;
      this.couponForm.value.barcode = this.barcodeValue;
      this.service.createCoupon(this.couponForm.value);
      this.snackBar.open('SAVE', null, {
        duration: 2000,
      });
    }
    this.dialogRef.close();
  }
}
