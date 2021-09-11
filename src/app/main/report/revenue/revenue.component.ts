import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { DataService } from 'src/app/core/services/data.service';
import * as pluginAnnotations from "chartjs-plugin-annotation";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: "app-revenue",
  templateUrl: "./revenue.component.html",
  styleUrls: ["./revenue.component.css"],
})
export class RevenueComponent implements OnInit {
  public fromDate = "";
  public toDate = "";
  public tableData: any[];
  public tableData2: any[];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.loadRevenues();
    this.loadRevenuesMonth();
  }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: "Lợi nhuận ngày" },
    { data: [], label: "Doanh thu ngày" },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    legend: { position: "bottom" },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
        },
        {
          id: "y-axis-1",
          position: "right",
          gridLines: {
            color: "rgba(255,0,0,0.3)",
          },
          ticks: {
            fontColor: "red",
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno",
          },
        },
      ],
    },
  };
  // public lineChartColors: Color[] = [
  //   {
  //     // grey
  //     backgroundColor: "rgba(148,159,177,0.2)",
  //     borderColor: "rgba(148,159,177,1)",
  //     pointBackgroundColor: "rgba(148,159,177,1)",
  //     pointBorderColor: "#fff",
  //     pointHoverBackgroundColor: "#fff",
  //     pointHoverBorderColor: "rgba(148,159,177,0.8)",
  //   },
  //   {
  //     // dark grey
  //     backgroundColor: "rgba(77,83,96,0.2)",
  //     borderColor: "rgba(77,83,96,1)",
  //     pointBackgroundColor: "rgba(77,83,96,1)",
  //     pointBorderColor: "#fff",
  //     pointHoverBackgroundColor: "#fff",
  //     pointHoverBorderColor: "rgba(77,83,96,1)",
  //   },
  //   {
  //     // red
  //     backgroundColor: "rgba(255,0,0,0.3)",
  //     borderColor: "red",
  //     pointBackgroundColor: "rgba(148,159,177,1)",
  //     pointBorderColor: "#fff",
  //     pointHoverBackgroundColor: "#fff",
  //     pointHoverBorderColor: "rgba(148,159,177,0.8)",
  //   },
  // ];
  public lineChartLegend = true;
  public lineChartType: ChartType = "line";
  public lineChartPlugins = [pluginAnnotations];
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  refreshChart() {
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chart.chart.config.data.labels = this.lineChartLabels;
        this.chart.chart.config.data.datasets = this.lineChartData;
        this.chart.chart.update();
      }
    });
  }

  loadRevenues() {
    this._dataService.get('/api/statistic/getrevenue?fromDate=' + this.fromDate + '&toDate=' + this.toDate)
      .subscribe((response: any[]) => {
        this.lineChartLabels = [];
        this.lineChartData = [];
        var revenue = { data: [], label: 'Doanh thu' };
        var benefit = { data: [], label: 'Lợi nhuận' };
        this.tableData = [];
        for (let item of response) {
          revenue.data.push(item.Revenues);
          benefit.data.push(item.Benefit);
          this.lineChartLabels.push(moment(item.Date).format('DD/MM/YYYY'));
          //push to table
          this.tableData = response;

        }
        this.lineChartData.push(revenue);
        this.lineChartData.push(benefit);

        this.refreshChart();
      });

  }

  //revenue by month use bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    legend: { position: "bottom" },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: "Lợi nhuận tháng" },
    { data: [], label: "Doanh thu tháng" },
  ];

  loadRevenuesMonth() {
    this._dataService
      .get(
        "/api/statistic/getrevenue-month?fromDate=" +
          this.fromDate +
          "&toDate=" +
          this.toDate
      )
      .subscribe((response: any[]) => {
        this.barChartLabels = [];
        this.barChartData = [];
        var revenue = { data: [], label: "Doanh thu tháng" };
        var benefit = { data: [], label: "Lợi nhuận tháng" };
        this.tableData2 = [];
        for (let item of response) {
          revenue.data.push(item.Revenues);
          benefit.data.push(item.Benefit);
          this.barChartLabels.push(item.Month);
          //push to table
          this.tableData2 = response;
        }
        this.barChartData.push(revenue);
        this.barChartData.push(benefit);
      });
  }
}
