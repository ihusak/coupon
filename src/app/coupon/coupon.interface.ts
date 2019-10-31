export interface CouponInterface {
  name: string;
  status: string;
  startDate: Date | string;
  endDate: Date | string;
  discount: string;
  id: string;
  barcode: string;
};