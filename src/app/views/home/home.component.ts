import { Component, OnInit } from '@angular/core';
import {EconomicsService} from '../../services/economics/economics.service';
import {MatTableDataSource} from '@angular/material/table';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  loading: boolean;
  ecoValues: any;
  constructor(
    private _economics: EconomicsService,
  ) { 
    this.dataSource = new MatTableDataSource<any>([]);
    this.displayedColumns = ['key', 'name', 'value', 'unit', 'date'];
    this.loading = false;
  }

  ngOnInit(): void {
    this.getApiValues();
  }

  getApiValues() {
    this.loading = true;
    this._economics.getList().subscribe(
      (res) => {
        this.ecoValues = res.apis;
        this.dataSource.data = Object.values(this.ecoValues[0].example.response);
        this.historicChart(this.ecoValues[1]);
        this.loading = false;
      }
    );
  }

  historicChart(historic: any) {
    let value = Object.entries(historic.example.response.values);
      const data = value.map((val) => {
        const date = Number(val[0])*1000;
        return [date, val[1]];
      });
      
      (Highcharts as any).chart('historic', {
        chart: {
            type: 'column',
            height: '300px'
        },
        title: {
            text: historic.example.name
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Precio en dolares'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, (Highcharts as any).getOptions().colors[0]],
                      [1, Highcharts.color((Highcharts as any).getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
              },
              marker: {
                  radius: 2
              },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },
        tooltip: {
            pointFormat: 'Precio del cobre: <b>{point.y:.2f} dolares</b>'
        },
        series: [{
            name: 'Population',
            data,
            type: 'area',
        }]
    });
  }

    
}
