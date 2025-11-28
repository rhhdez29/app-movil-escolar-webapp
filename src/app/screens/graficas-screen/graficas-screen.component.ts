import { ChartOptions } from 'chart.js';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdministradoresService } from 'src/app/services/administradores.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})

export class GraficasScreenComponent implements OnInit {

  //Agregar chartjs-plugin-datalabels
  //Variables
  public total_user: any = {};

  //Histograma
  lineChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[0,0,0],
        label: 'Registro de usuarios',
        backgroundColor: '#F88406'
      }
    ]
  }
  lineChartOption = {
    responsive:false
  }
  lineChartPlugins = [ DatalabelsPlugin ];

  //Barras
  barChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[0,0,0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
          '#FB82F5',
          '#2AD84A'
        ]
      }
    ]
  }
  barChartOption = {
    responsive:false
  }
  barChartPlugins = [ DatalabelsPlugin ];

  //Circular
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[5, 34, 43],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#FCFF44',
          '#F1C8F2',
          '#31E731'
        ]
      }
    ]
  }
  pieChartOption = {
    responsive:false
  }
  pieChartPlugins = [ DatalabelsPlugin ];

  //Dona - Doughnut
  doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#31E7E7'
        ]
      }
    ]
  }
  doughnutChartOption = {
    responsive: false,
  };
  doughnutChartPlugins = [ DatalabelsPlugin ];

  constructor(
    private administradoresServices: AdministradoresService
  ) { }

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  // Función para obtener el total de usuarios registrados
  public obtenerTotalUsers(){
    this.administradoresServices.getTotalUsuarios().subscribe(
      (response)=>{
        this.total_user = response;
        console.log("Total usuarios: ", this.total_user);

        // Actualizar datos del doughnut
        const admins   = Number(this.total_user.admins)   || 0;
        const maestros = Number(this.total_user.maestros) || 0;
        const alumnos  = Number(this.total_user.alumnos)  || 0;

        //Actualizamos los datos de las graficas con los de la bdd
        this.pieChartData = {
          ...this.pieChartData,
          datasets: [
            {
              ...this.pieChartData.datasets[0],
              data: [admins, maestros, alumnos]
            }
          ]
        };

        this.doughnutChartData = {
          ...this.doughnutChartData,
          datasets: [
            {
              ...this.doughnutChartData.datasets[0],
              data: [admins, maestros, alumnos]
            }
          ]
        };

        this.lineChartData = {
          ...this.lineChartData,
          datasets: [
            {
              ...this.lineChartData.datasets[0],
              data: [admins, maestros, alumnos]
            }
          ]
        };

        this.barChartData = {
          ...this.barChartData,
          datasets: [
            {
              ...this.barChartData.datasets[0],
              data: [admins, maestros, alumnos]
            }
          ]
        };

      }, (error)=>{
        console.log("Error al obtener total de usuarios ", error);

        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }
}
