import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';
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
export class MainComponent implements OnInit, AfterViewInit {
  public user: LoggedInUser;
  public functions: any[];
  public baseFolder: string = environment.BASE_API;
  constructor(
    private utilityService: UtilityService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    console.log(this.user);
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }

  ngAfterViewInit() {
    this.loadScripts();
  }

  public loadScripts() {
    this.renderExternalScript('../../assets/js/adminlte.min.js').onload = () => { };
    this.renderExternalScript('../../assets/js/demo.js').onload = () => { };
  }

  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
