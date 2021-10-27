import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { LayoutService } from '../../../../../core';
@Component({
  selector: 'app-mixed-widget1',
  templateUrl: './mixed-widget1.component.html'
})
export class MixedWidget1Component implements OnInit {
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  Data!: Array<number>;
  strokeColor?: string;
  bgColor?: string;
  Title?: Array<string>;
  check: string = 'chart-1';
  MaxHeight?: number;
  role?: Role;
  state: number = 0;
  digit?: number;
  digit1?: number;
  digit2?: number;
  digit3?: number;
  countStop: any;
  @Input() DataChart;
  @Input() TitleChart;
  @Input() Icon;
  constructor(
    private layout: LayoutService,
    private authService: AuthenticationService
  ) {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.colorsGrayGray500 = this.layout.getProp('js.colors.gray.gray500');
    this.colorsGrayGray200 = this.layout.getProp('js.colors.gray.gray200');
    this.colorsGrayGray300 = this.layout.getProp('js.colors.gray.gray300');
    this.colorsThemeBaseDanger = this.layout.getProp(
      'js.colors.theme.base.danger'
    );
  }

  ngOnInit(): void {
    this.digit = this.DataChart[0].reduce((pv, cv) => pv + cv, 0);
    this.digit1 = this.DataChart[1].reduce((pv, cv) => pv + cv, 0);
    this.digit2 = this.DataChart[2].reduce((pv, cv) => pv + cv, 0);
    this.digit3 = this.DataChart[3].reduce((pv, cv) => pv + cv, 0);
    this.state = 0;
    this.animateCount(this.digit);
    this.role = this.authService.currentUserValue!.role;
    let MaxTab: any[] = [];
    this.DataChart.forEach((element) => MaxTab.push(Math.max(...element)));
    this.MaxHeight = Math.max(...MaxTab) * 1.05;
    this.Data = this.DataChart[0];
    this.strokeColor = '#E67E22';
    this.bgColor = 'warning';
    this.Title = this.TitleChart[0];
    this.chartOptions = this.getChartOptions();
  }

  onClick(id: any) {
    if (id !== this.check) {
      switch (id) {
        case 'chart-1':
          this.animateCount(this.digit);
          this.Data = this.DataChart[0];
          this.strokeColor = '#E67E22';
          this.bgColor = 'warning';
          this.Title = this.TitleChart[0];
          break;
        case 'chart-2':
          this.animateCount(this.digit1);
          this.Data = this.DataChart[1];
          this.strokeColor = '#1F618D';
          this.bgColor = 'primary';
          this.Title = this.TitleChart[1];
          break;
        case 'chart-3':
          this.animateCount(this.digit2);
          this.Data = this.DataChart[2];
          this.bgColor = 'danger';
          this.strokeColor = '#D13647';
          this.Title = this.TitleChart[2];
          break;
        case 'chart-4':
          this.animateCount(this.digit3);
          this.Data = this.DataChart[3];
          this.bgColor = 'success';
          this.strokeColor = '#148F77';
          this.Title = this.TitleChart[3];
          break;
        default:
          break;
      }

      this.check = id;
      this.chartOptions = this.getChartOptions();
    }
  }

  getChartOptions() {
    return {
      series: [
        {
          name: 'Total Number',
          data: this.Data
        }
      ],
      chart: {
        type: 'area',
        height: 200,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 5,
          left: 0,
          blur: 3,
          color: this.strokeColor,
          opacity: 0.5
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid',
        opacity: 0
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.strokeColor]
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        },
        crosshairs: {
          show: false,
          position: 'front',
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3
          }
        }
      },
      yaxis: {
        min: 0,
        max: this.MaxHeight,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily
        },
        y: {
          // tslint:disable-next-line
          formatter: function (val) {
            return val;
          }
        },
        marker: {
          show: false
        }
      },
      colors: ['transparent'],
      markers: {
        colors: this.colorsThemeBaseDanger,
        strokeColor: [this.strokeColor],
        strokeWidth: 3
      }
    };
  }

  animateCount(digit) {
    this.state = 0;
    clearInterval(this.countStop);
    this.countStop = setInterval(() => {
      this.state++;
      if (digit >= 200) {
        if (this.state === Math.round(digit / 4)) {
          clearInterval(this.countStop);
          this.state = digit;
        }
      } else {
        if (this.state === digit) {
          clearInterval(this.countStop);
        }
      }
    }, 1);
  }
}
