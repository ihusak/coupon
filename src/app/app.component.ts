import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CouponComponent } from './coupon/coupon.component';
import { CouponInterface } from './coupon/coupon.interface';
import { CouponService } from './coupon/coupon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

const tableHeader: string[] = ['name', 'status', 'startDate', 'endDate', 'discount', 'barcode', 'actions'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * Logig for user manipulation coupons
 */
export class AppComponent implements AfterViewInit {
  title = 'coupon';
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = tableHeader;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(
    private service: CouponService,
    public dialog: MatDialog
    ) {
    this.getListOfCoupons();
    this.service.coupons.subscribe(data => {
      this.dataSource.data = data;
    });
  }
  /**
   * Init sort
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  /**
   * Popup manipulation
   */
  openDialog(): void {
    this.dialog.open(CouponComponent, {
      width: '50%',
      data: null
    });
  }
  /**
   * Get list of coupons for view
   */
  getListOfCoupons() {
    this.dataSource.data = this.service.getCoupons();
  }
  /**
   * Select item coupon for update
   * @param id
   */
  updateCoupon(id: string) {
    const selectCoupon = [...this.dataSource.data].filter(item => item['id'] === id);
    this.dialog.open(CouponComponent, {
      width: '50%',
      data: selectCoupon[0]
    });
  }
  /**
   * Delete selected coupon
   * @param id
   */
  deleteCoupon(id: string) {
    const confirmDelete = confirm();
    if (confirmDelete) {
      this.service.deleteCoupon(id);
    } else {
      return;
    }
  }
}
