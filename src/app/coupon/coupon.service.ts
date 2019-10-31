import { Injectable } from '@angular/core';
import { CouponInterface } from './coupon.interface';
import { Subject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CouponService {
  private storage = localStorage;
  public coupons = new Subject<CouponInterface[]>();
  constructor() {
    const coupons = JSON.parse(this.storage.getItem('coupons'));
    if (!coupons) {
      this.storage.setItem('coupons', JSON.stringify([]));
    }
  }
  /**
   * Create coupon item
   * @param data
   */
  public createCoupon(data: CouponInterface): Observable<CouponInterface[]> {
    const coupons = JSON.parse(this.storage.getItem('coupons'));
    if (coupons) {
      coupons.push(data);
      this.storage.setItem('coupons', JSON.stringify(coupons));
      this.coupons.next(coupons);
    } else {
      this.storage.setItem('coupons', JSON.stringify([data]));
      this.coupons.next([data]);
    }
    return this.coupons;
  }
  /**
   * get list of coupons from storage
   */
  public getCoupons(): CouponInterface[] {
    const data = JSON.parse(this.storage.getItem('coupons'));
    this.coupons.next([data]);
    return data;
  }
  /**
   * Delete selected coupon by ID
   * @param id
   */
  public deleteCoupon(id: string): Observable<CouponInterface[]>  {
    const data = JSON.parse(this.storage.getItem('coupons'));
    const filtered = data.filter(item => item.id !== id);
    this.storage.setItem('coupons', JSON.stringify(filtered));
    this.coupons.next(filtered);
    return this.coupons;
  }
  /**
   * Updete selected coupon by ID
   * @param coupon
   */
  public updateCoupon(coupon: CouponInterface) {
    const data = JSON.parse(this.storage.getItem('coupons'));
    const changed = data.map(item => {
      if (item.id === coupon.id) {
        item = coupon;
      }
      return item;
    });
    this.storage.setItem('coupons', JSON.stringify(changed));
    this.coupons.next(changed);
  }
}