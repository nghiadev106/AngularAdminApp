import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  @ViewChild('modalAddEdit', {static: false}) public modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public categories: any[];
  public entity: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/productCategory/getall?keyword=' + this.filter + '&page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        console.log(response);
        this.categories = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }
  loadCategory(id: any) {
    this._dataService.get('/api/productCategory/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        console.log(this.entity);
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }
  showEditModal(id: any) {
    this.loadCategory(id);
    this.modalAddEdit.show();
  }
  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/productCategory/add', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/productCategory/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }

  deleteItem(id: any) {
    if(confirm(MessageContstants.CONFIRM_DELETE_MSG)) {
      this._dataService.delete('/api/productCategory/delete', 'id', id).subscribe((response: Response) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      });
    }
  }
}
