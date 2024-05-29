import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  NgApexchartsModule,
  ApexFill
} from 'ng-apexcharts';
import { StatistiqueService } from '../../shared/Services/statistique.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-statistics',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,MatProgressSpinnerModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, NgApexchartsModule, FormsModule, RouterLink],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  isLoading = false;
  statistics: any = {
    matiere: [],
    averageNote: []
  };

  filtre: any = {
    dateDebut: undefined,
    dateFin: undefined
  }

  chartSeries: ApexAxisChartSeries = [];
  chartOptions!: {
    chart: ApexChart,
    xaxis: ApexXAxis,
    title: ApexTitleSubtitle,
    yaxis: ApexYAxis,
    tooltip: ApexTooltip,
    fill: ApexFill
  } ;

  constructor(private http: HttpClient, private statistiqueService: StatistiqueService) {
    
  }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    const params = {
      dateDebut: this.filtre.dateDebut || '',
      dateFin: this.filtre.dateFin || ''
    };
    this.isLoading = true;
    this.statistiqueService.GetStatEleve(params).subscribe(response => {
      this.statistics = response;
      this.updateChart();
      this.isLoading = false;
    });
  }


  updateChart() {
    const categories = this.statistics.map((stat: any) => stat.matiere);
    const data = this.statistics.map((stat: any) => stat.averageNote);

    this.chartOptions = {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories : categories
      },
      title: {
        text: 'Moyenne des notes par matières'
      },
      yaxis: {
        title: {
          text: 'Moyenne'
        }
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val.toString();
          }
        }
      },
      fill: {
        colors: ['#053F5C'] 
      }
    };
    this.chartSeries = [{ name: 'Moyenne', data: data }];
  }

  filtre_() { 
    this.getStatistics();
  }
}
