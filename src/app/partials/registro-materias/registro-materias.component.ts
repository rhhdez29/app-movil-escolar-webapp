import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarMateriaComponent } from 'src/app/modals/editar-materia-modal/editar-materia-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';


@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})

export class RegistroMateriasComponent implements OnInit {

  public materia: any = {};
  public errors: any = {};
  public rol: string = '';
  public lista_maestros: any[] = [];
  public editar: boolean = false;
  public idMateria: number = 0;
  public Maestros: Maestros[] = [];

  public dias:any[] = [
    {value: '1', day: 'Lunes'},
    {value: '2', day: 'Martes'},
    {value: '3', day: 'Miércoles'},
    {value: '4', day: 'Jueves'},
    {value: '5', day: 'Viernes'},
  ];

  //Para el select
  public programas: any[] = [
    {value: '1', viewValue: 'Ingeniería en Ciencias de la Computación'},
    {value: '2', viewValue: 'Licenciatura en Ciencias de la Computación'},
    {value: '3', viewValue: 'Ingeniería en Tecnologías de la Información'},
  ];



  constructor(
    private location : Location,
    private materiasService: MateriasService,
    private facadeService: FacadeService,
    private maestrosService: MaestrosService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.materia = this.materiasService.esquemaMateria();
    this.rol = this.facadeService.getUserGroup();
    this.obtenerMaestros();

    //El if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerMateriaByID();
    }

  }
  public goBack() {
    this.location.back();
  }

  // Funciones para los checkbox
  public checkboxChange(event:any){
    console.log("Evento: ", event);
    if(event.checked){
      this.materia.dias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materia.dias_json.forEach((materia, i) => {
        if(materia == event.source.value){
          this.materia.dias_json.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.materia);
  }

  public revisarSeleccion(nombre: string){
    if(this.materia.dias_json){
      var busqueda = this.materia.dias_json.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  // Función para los campos solo de datos alfabeticos
  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

  // Función para los campos que aceptan letras, números y espacio
  public soloLetrasNums(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);

    // Permitir:
    // - Letras mayúsculas (A-Z)
    // - Letras minúsculas (a-z)
    // - Números (0-9)
    // - Espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&   // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) &&  // Letras minúsculas
      !(charCode >= 48 && charCode <= 57) &&   // Números
      charCode !== 32                          // Espacio
    ) {
      event.preventDefault();
    }
  }
  registrarMateria() {

    this.errors = {};
    this.errors = this.materiasService.validarMateria(this.materia, this.errors);
    if(Object.keys(this.errors).length > 0){
      return false;
    }

    //Validar usuario
    if(this.rol === 'administrador'){
      this.materiasService.registrarMateria(this.materia).subscribe(

        (response) => {

          // Redirigir o mostrar mensaje de éxito
          alert("Materia registrada exitosamente");
          console.log("Materia registrada: ", response);
          window.location.reload();

        },
        (error) => {
          // Manejar errores de la API
          alert("Error al registrar materia");
          console.error("Error al registrar la materia: ", error);
        }

      );
    }
    else{

      alert("No tienes permisos para realizar esta accion")

    }

  }

  // Consumimos el servicio para obtener los maestros
  //Obtener maestros
  public obtenerMaestros() {
    this.maestrosService.obtenerListaMaestros().subscribe(
      (response) => {
        this.lista_maestros = response;
        console.log("Lista users: ", this.lista_maestros);
        if (this.lista_maestros.length > 0) {
          //Agregar datos del nombre e email
          this.lista_maestros.forEach(usuario => {
            usuario.nombre= usuario.user.first_name + " " + usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Maestros: ", this.lista_maestros);

          this.Maestros = this.lista_maestros.map((m: any) => ({
            value: m.id,
            viewValue: m.nombre
          }));
          console.log("Nombres de maestros: ", this.Maestros);
        }
      }, (error) => {
        console.error("Error al obtener la lista de maestros: ", error);
        alert("No se pudo obtener la lista de maestros");
      }
    );
  }

  //Obtener usuario por ID
  public obtenerMateriaByID() {
    //Lógica para obtener el usuario según su ID y rol
    console.log("Obteniendo Materia por ID: ", this.idMateria);
    //Aquí se haría la llamada al servicio correspondiente según el rol

    this.materiasService.obtenerMateriaPorID(this.idMateria).subscribe(
      (response) => {
        this.materia = response;
        console.log("Materia original obtenida: ", this.materia);
        // // Asignar datos, soportando respuesta plana o anidada
        this.materia.hora_inicio = response.hora_inicio?.substring(0,5);
        this.materia.hora_fin = response.hora_fin?.substring(0,5);
        this.materia.profesor_asignado = response.profesor_asignado;
        // this.materia.first_name = response.materia?.first_name || response.first_name;
        // this.materia.last_name = response.materia?.last_name || response.last_name;
        // this.materia.email = response.materia?.email || response.email;
        // this.materia.tipo_usuario = this.rol;
        // this.isAdmin = true;
      }, (error) => {
        console.log("Error: ", error);
        alert("No se pudo obtener la materia seleccionada");
      }
    );

  }

  public actualizar() {
    // Validación de los datos
    this.errors = {};
    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if(Object.keys(this.errors).length > 0){
      return false;
    }


    if(this.rol === 'administrador'){

      const dialogRef = this.dialog.open(EditarMateriaComponent,{
        data: {materia: this.materia}, //Se pasan valores a través del componente
        height: '288px',
        width: '328px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.isEdit){
          console.log("Materia editada");
          alert("Materia editada correctamente.");

          // Si el maestro se elimina a sí mismo, redirigir al inicio de sesión
          this.router.navigate(["materias"]);


        }else{
          alert("Materia no se ha podido editar.");
          console.log("No se editó la materia");
        }
      });

    }else{
      alert("No tienes permisos para realizar esta accion")
    }

    // // Ejecutamos el servicio de actualización
    // this.materiasService.actualizarMateria(this.materia).subscribe(
    //   (response) => {
    //     // Redirigir o mostrar mensaje de éxito
    //     alert("Materia actualizada exitosamente");
    //     console.log("Materia actualizada: ", response);
    //     this.router.navigate(["materias"]);
    //   },
    //   (error) => {
    //     // Manejar errores de la API
    //     alert("Error al actualizar Materia");
    //     console.error("Error al actualizar Materia: ", error);
    //   }
    // );

  }
}
export interface Maestros{
  value: number;     // id del maestro
  viewValue: string; // nombre completo
}
