import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia-modal.component.html',
  styleUrls: ['./editar-materia-modal.component.scss']
})
export class EditarMateriaComponent {

  constructor(
    public dialogRef: MatDialogRef<EditarMateriaComponent>,
    private materiasService: MateriasService,
    @Inject (MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log('data recibida en el modal ', this.data);
  }

  public cerrar_modal(){
    this.dialogRef.close({isEdit:false});
  }

  editarMateria(){
      this.materiasService.actualizarMateria(this.data.materia).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isEdit:true});
        }, (error)=>{
          this.dialogRef.close({isEdit:false});
        }
      );
  }

}
