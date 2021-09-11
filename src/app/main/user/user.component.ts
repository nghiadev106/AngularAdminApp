import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm,FormBuilder, FormGroup  } from '@angular/forms';
import { IMultiSelectOption } from 'angular2-dropdown-multiselect';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { AuthenService } from 'src/app/core/services/authen.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from "moment";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {

  @ViewChild('modalAddEdit', {static: false}) public modalAddEdit: ModalDirective;
  @ViewChild('avatar', {static: false}) avatar;
  public myRoles: string[] = [];
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;
  public baseFolder: string = environment.BASE_API;
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];
  public formUpload: FormGroup;
  private headers = new HttpHeaders();

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    public _authenService: AuthenService,
    private daterangepickerOptions: DaterangepickerConfig,
    public fb: FormBuilder,
    private http: HttpClient) {

    if (_authenService.checkAccess('USER') == false) {
      _utilityService.navigateToLogin();
    }

    this.daterangepickerOptions.settings = {
      locale: { format: 'DD-MM-YYYY' },
      alwaysShowCalendars: false
    }

    this.headers = this.headers.set("Authorization", "Bearer " + _authenService.getLoggedInUser().access_token);

    this.formUpload = this.fb.group({
      avatar: [null]
    })
  }

  ngOnInit() {
    this.loadRoles();
    this.loadData();

  }

  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.users = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }
  loadRoles() {
    this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }
  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        this.myRoles = [];
        for (let role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
        console.log(this.entity.BirthDay);
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
    this.loadUserDetail(id);
    this.modalAddEdit.show();
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formUpload.patchValue({
      avatar: file
    });
    this.formUpload.get('avatar').updateValueAndValidity()
    console.log(this.formUpload.value);
  }
  saveChange(form: NgForm) {
    if (form.valid) {
      this.entity.Roles = this.myRoles;
      let fi = this.avatar.nativeElement;
      if (fi.files.length > 0) {
        // this._uploadService.postWithFile('/api/upload/saveImage?type=avatar', null, fi.files)
        //   .then((imageUrl: string) => {
        //     this.entity.Avatar = imageUrl;
        //   }).then(() => {
        //     this.saveData(form);
        //   });
          var formData: any = new FormData();
          formData.append("avatar", this.formUpload.get('avatar').value);

          this.http.post('http://localhost:5000/api/upload/saveImage?type=avatar', formData, { headers: this.headers }).subscribe(
            (response) => {
              console.log(response);
              this.entity.Avatar = response;
              this.saveData(form);
            },
            (error) => console.log(error)
          )
      }
      else {
        this.saveData(form);
      }
    }
  }
  private saveData(form: NgForm) {
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
  }
  deleteItem2(id: any) {
    if(confirm(MessageContstants.CONFIRM_DELETE_MSG)) {
      this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      });
    }
  }
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
  public selectGender(event) {
    this.entity.Gender = event.target.value
  }

  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }

}
