import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"],
})
export class OrderDetailComponent implements OnInit {
  public orderDetails: any[];
  public entity: any;
  public totalAmount: number;
  public orderId: number;
  public baseFolder: string = environment.BASE_API;
  constructor(
    private utilityService: UtilityService,
    private _dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.orderId = params["id"];
      this.loadOrder(this.orderId);

      this.loadOrderDetail(this.orderId);
    });
  }

  public goBack() {
    this.utilityService.navigate("/admin/order/index");
  }

  public loadOrder(id: number) {
    this._dataService.get("/api/order/detail/" + id.toString()).subscribe(
      (response: any) => {
        this.entity = response;
      },
      (error) => this._dataService.handleError(error)
    );
  }
  public exportToExcel() {
    this._dataService
      .get("/api/order/exportExcel/" + this.orderId.toString())
      .subscribe(
        (response: any) => {
          window.open(this.baseFolder + response.Message);
        },
        (error) => this._dataService.handleError(error)
      );
  }
  public loadOrderDetail(id: number) {
    this._dataService
      .get("/api/order/getalldetails/" + id.toString())
      .subscribe(
        (response: any[]) => {
          this.orderDetails = response;
          this.totalAmount = 0;
          for (var item of this.orderDetails) {
            this.totalAmount = this.totalAmount + item.Quantity * item.Price;
          }
        },
        (error) => this._dataService.handleError(error)
      );
  }
}
