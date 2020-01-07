import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs"
import {Client} from "../models/Client"
import { database } from 'firebase';

import { map } from "rxjs/operators";
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection:AngularFirestoreCollection<Client>;
  clientDoc:AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>

  constructor(private afs:AngularFirestore) {
    this.clientsCollection = this.afs.collection("client", ref => ref.orderBy("lastName", "asc"))
   }

   getClients():Observable<Client[]>{
    //  get the clients with id
    this.clients = this.clientsCollection.snapshotChanges()
    .pipe(map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data
      })
    }));
    return this.clients
   }

   newClient(client: Client){
     this.clientsCollection.add(client)
   }

   getClient(id:string):Observable<Client>{
     this.clientDoc = this.afs.doc<Client>(`client/${id}`);
     this.client = this.clientDoc.snapshotChanges().pipe(map(action =>{
       if(action.payload.exists === false){
         return null
       }else{
         const data = action.payload.data() as Client;
         data.id = action.payload.id;
         return data;
       }
     }))
     return this.client
   }


   updateClient(client:Client){
     this.clientDoc = this.afs.doc(`client/${client.id}`);
     this.clientDoc.update(client)
   }
}
