import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { LoggedInUser } from '../core/domain/loggedin.user';
import { UtilityService } from '../core/services/utility.service';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit{
  public user: LoggedInUser;
  public functions: any[];
  public baseFolder: string = environment.BASE_API;
  constructor(
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
}
