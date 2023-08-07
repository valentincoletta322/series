import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private firestore:Firestore) { }

  addData(_data:String, _uid:any){
    const dataRef = collection(this.firestore,'data')
    return addDoc(dataRef,{
      user_id: _uid,
      data: _data
    })
  }
}
