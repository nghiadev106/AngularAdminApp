import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { MessageContstants } from "src/app/core/common/message.constants";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { UtilityService } from "src/app/core/services/utility.service";

@Component({
  selector: "app-order-add",
  templateUrl: "./order-add.component.html",
  styleUrls: ["./order-add.component.css"],
})
export class OrderAddComponent implements OnInit {
  @ViewChild("addEditModal", { static: false })
  public addEditModal: ModalDirective;
  public entity: any = { Status: true };
  public sizeId: number = null;
  public colorId: number = null;
  public colors: any[];
  public sizes: any[];
  public products: any[];
  public orderDetails: any[] = [];
  public detailEntity: any = {
    ProductID: 0,
    Quantity: 1,
    Price: 0,
  };

  constructor(
    private utilityService: UtilityService,
    private _dataService: DataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}
  /*Product quantity management */
  public showAddDetail() {
    this.loadColors();
    this.loadSizes();
    this.loadProducts();
    this.addEditModal.show();
  }
  public loadProducts() {
    this._dataService.get("/api/product/getallparents").subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error) => this._dataService.handleError(error)
    );
  }
  public loadColors() {
    this._dataService.get("/api/productQuantity/getcolors").subscribe(
      (response: any[]) => {
        this.colors = response;
      },
      (error) => this._dataService.handleError(error)
    );
  }
  public loadSizes() {
    this._dataService.get("/api/productQuantity/getsizes").subscribe(
      (response: any[]) => {
        this.sizes = response;
      },
      (error) => this._dataService.handleError(error)
    );
  }
  public goBack() {
    this.utilityService.navigate("/admin/order/index");
  }

  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      this.entity.OrderDetails = this.orderDetails;
      this._dataService
        .post("/api/order/add", JSON.stringify(this.entity))
        .subscribe(
          (response: any) => {
            this.entity = response;
            this.notificationService.printSuccessMessage(
              MessageContstants.CREATED_OK_MSG
            );
            this.utilityService.navigate("/admin/order");
          },
          (error) => this._dataService.handleError(error)
        );
    }
  }
  public saveOrderDetail(valid: boolean) {
    if (valid) {
      this.addEditModal.hide();
      this.detailEntity.Product = this.products.find(
        (x) => x.ID == this.detailEntity.ProductID
      );
      this.orderDetails.push(this.detailEntity);
      this.detailEntity = {
        ProductID: 0,
        Quantity: 0,
        Price: 0,
      };
    }
  }

  public onOptionsSelected(event) {
    const productId = event.target.value;
    let product = this.products.find((x) => x.ID == productId);
    if (product.PromotionPrice) {
      this.detailEntity.Price = product.PromotionPrice;
    }else{
      this.detailEntity.Price = product.Price;
    }
  }

  //Action delete
  public deleteDetail(item: any) {
    for (var index = 0; index < this.orderDetails.length; index++) {
      let orderDetail = this.orderDetails[index];
      if (
        orderDetail.ProductID == item.ProductID &&
        orderDetail.ColorId == item.ColorId &&
        orderDetail.SizeId == item.SizeId
      ) {
        this.orderDetails.splice(index, 1);
      }
    }
  }
}
