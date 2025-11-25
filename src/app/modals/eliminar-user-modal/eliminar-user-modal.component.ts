import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { FacadeService } from '../../services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent {

  public rol: string = "";
  public userId: number = Number(this.facadeService.getUserId());
  public rolUser: string = this.facadeService.getUserGroup();
  public tipo: string = "";

  constructor(
    private administradoresService: AdministradoresService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService,
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    private facadeService: FacadeService,
    private materiasService: MateriasService
  ) { }

  ngOnInit(): void {
    this.rol = this.data.rol;
    this.tipo = this.data.tipo;
    console.log('data recibida en el modal ', this.data);

  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }


  public eliminarUser(){
    if(this.rol == "administrador"){
      // Entonces elimina un administrador
      this.administradoresService.eliminarAdministrador(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );


    }else if(this.rol == "maestro"){
      // Entonces elimina un maestro
      this.maestrosService.eliminarMaestro(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );

    }if(this.rol == "alumno"){
      // Entonces elimina un alumno

      this.alumnosService.eliminarAlumno(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );

    }

  }

  public eliminarMateria(){
    this.materiasService.eliminarMateria(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }

}
