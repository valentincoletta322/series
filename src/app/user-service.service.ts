import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private auth: Auth, private http: HttpClient) {}

  register({ email, password }: any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  getUid(){
    return this.auth.currentUser?.uid
  }

  logout() {
    return signOut(this.auth);
  }

  ruta = 'https://apis.datos.gob.ar/series/api/series?ids=88.3_IPMPU_1995_M_34';

  getDatos(opciones: any) {
    console.log(opciones);
    let myRuta =this.ruta;
    myRuta += "&start_date=" + opciones.inicio;
    myRuta += "&end_date=" + opciones.final;
    return this.http.get(myRuta);
  }

}
