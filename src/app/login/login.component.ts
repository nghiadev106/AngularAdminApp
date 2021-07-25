import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageContstants } from '../core/common/message.constants';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }
  login() {
    this.loading = true;
    this.authenService.login(this.model.username, this.model.password)
    .then(data => {
      this.router.navigate([UrlConstants.HOME]);
    }).catch(error=>{
      this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }

}
