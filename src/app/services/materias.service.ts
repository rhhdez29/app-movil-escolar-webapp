import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacadeService } from './facade.service';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private validatorService: ValidatorService,
    private http: HttpClient,
    private facadeService: FacadeService,
    private errorService: ErrorsService,
  ) { }

  public esquemaMateria() {
    return{
      'nrc': '',
      'nombre_materia': '',
      'seccion': '',
      'dias_json': [],
      'hora_inicio': '',
      'hora_fin': '',
      'salon': '',
      'programa_educativo': '',
      'profesor_asignado': '',
      'creditos': '',
    }
  }

  public validarMateria(data: any, editar: boolean){
    console.log("Validando materia...", data)
    let error: any = {};
    //Validaciones
    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorService.required;
    }
    if(!this.validatorService.required(data['nombre_materia'])){
      error["nombre_materia"] = this.errorService.required
    }
    if(!this.validatorService.min(data['seccion'], 3)){
      error['seccion'] = this.errorService.min(3);
    }

    if (!this.validatorService.required(data["dias_json"])) {
      error["dias_json"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["hora_inicio"])) {
      error["hora_inicio"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_fin"]) || !this.validatorService.timeValid(data["hora_inicio"], data["hora_fin"])){
      if(!this.validatorService.required(data["hora_fin"])){
        error["hora_fin"] = this.errorService.required;
      }else{
        error["hora_fin"] = this.errorService.timeValid;
      }
    }
    if (!this.validatorService.required(data["salon"])) {
      error["salon"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["programa_educativo"])){
      error["programa_educativo"] = this.errorService.required
    }
    if(!this.validatorService.required(data["profesor_asignado"])){
      error["profesor_asignado"] = this.errorService.required
    }
    if(!this.validatorService.min(data["creditos"], 2)){
      error["creditos"] = this.errorService.min(2);
    }

    return error
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarMateria (data: any): Observable <any>{
    // Verificamos si existe el token de sesión
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return this.http.post<any>(`${environment.url_api}/materias/`, data, { headers });
  }

   //Servicio para obtener la lista de materias
  public obtenerListaMaterias(): Observable<any>{
    // Verificamos si existe el token de sesión
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, { headers });
  }

  // Petición para obtener un administrador por su ID
  public obtenerMateriaPorID(idMateria: number): Observable<any> {
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      console.log("No se encontró el token del usuario");
    }
    return this.http.get<any>(`${environment.url_api}/materias/?id=${idMateria}`, { headers });
  }

  // Petición para actualizar un administrador
  public actualizarMateria(data: any): Observable<any> {
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      console.log("No se encontró el token del usuario");
    }
    return this.http.put<any>(`${environment.url_api}/materias/`, data, { headers });
  }

  //Servicio para eliminar una materia
  public eliminarMateria(idMateria: number): Observable<any>{
    // Verificamos si existe el token de sesión
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return this.http.delete<any>(`${environment.url_api}/materias/?id=${idMateria}`, { headers });
  }


}
