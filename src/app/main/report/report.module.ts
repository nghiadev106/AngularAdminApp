import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RevenueComponent } from "./revenue/revenue.component";
import { RouterModule, Routes } from "@angular/router";
import { ChartsModule, ThemeService } from "ng2-charts";

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: RevenueComponent },
  { path: "revenues", component: RevenueComponent },
];

@NgModule({
  declarations: [RevenueComponent],
  imports: [CommonModule, ChartsModule, RouterModule.forChild(routes)],
  providers:[ThemeService]
})
export class ReportModule {}
