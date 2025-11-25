import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';
import { DatosUsuario } from '../maestros-screen/maestros-screen.component';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent {


    public name_user: string = "";
    public rol: string = "";
    public token: string = "";
    public lista_materias: any[] = [];

    //Para la tabla
    displayedColumns: string[] = ['nrc', 'nombre_materia', 'seccion', 'dias_json', 'hora_inicio', 'hora_fin', 'salon', 'programa_educativo', 'profesor_asignado', 'creditos', 'editar', 'eliminar'];
    dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

    @ViewChild(MatPaginator)
    set matPaginator(p: MatPaginator) {
      this.dataSource.paginator = p;
    }
    @ViewChild(MatSort)
    set matSort(s: MatSort | undefined) {
      if (s) this.dataSource.sort = s;
    }

    ngAfterViewInit() {

    }

    constructor(
      public facadeService: FacadeService,
      public maestrosService: MaestrosService,
      private router: Router,
      public dialog: MatDialog,
      public materiasService: MateriasService,
    ) { }

    ngOnInit(): void {
      this.name_user = this.facadeService.getUserCompleteName();
      this.rol = this.facadeService.getUserGroup();
      //Validar que haya inicio de sesión
      //Obtengo el token del login
      this.token = this.facadeService.getSessionToken();
      console.log("Token: ", this.token);
      if(this.token == ""){
        this.router.navigate(["/"]);
      }
      //Obtener maestros
      this.obtenerMaterias();
    }

    // Consumimos el servicio para obtener los maestros
    //Obtener maestros
    public obtenerMaterias() {
      if(this.rol == "administrador" || this.rol == "maestro"){
        this.materiasService.obtenerListaMaterias().subscribe(
          (response) => {
            this.lista_materias = response;
            console.log("Lista users: ", this.lista_materias);
            if (this.lista_materias.length > 0) {

              console.log("Materias: ", this.lista_materias);

              this.dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
            }
          }, (error) => {
            console.error("Error al obtener la lista de materias: ", error);
            alert("No se pudo obtener la lista de materias");
          }
        );
      }else{
        alert("No tienes permisos para ver la lista de materias.");
      }
    }


    public goEditar(idMateria: number) {
      this.router.navigate(["registro-materias/materia/" + idMateria]);
    }

    public delete(idMateria: number) {
      // Administrador puede elimianar a cualquier maestro
      // Maestro solo puede eliminar a su propio registro
      if (this.rol === 'administrador') {
        //Si es administrador o es maestro, es decir, cumple la condición, se puede eliminar
        const dialogRef = this.dialog.open(EliminarUserModalComponent,{
          data: {id: idMateria, tipo: 'materia'}, //Se pasan valores a través del componente
          height: '288px',
          width: '328px',
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result.isDelete){
            console.log("Materia eliminada");
            alert("Materia eliminada correctamente.");

            window.location.reload();

          }else{
            alert("Materia no se ha podido eliminar.");
            console.log("No se eliminó la materia");
          }
        });
      }else{
        alert("No tienes permisos para eliminar esta materia.");
      }

    }

    public onSearch(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

    }

}

//Esto va fuera de la llave que cierra la clase
export interface DatosMateria {
  id: number,
  nrc: number;
  nombre_materia: string;
  seccion: number;
  dias_json: string [];
  hora_inicio: string,
  hora_fin: string,
  salon: string,
  programa_educativo: string,
  profesor_asignado: string;
  creditos: number;
}
