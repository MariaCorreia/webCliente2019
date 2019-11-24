import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cfg = new Config();
  usuarios: any;
  ambientes: any;
  reservas: any;
  invalido = true;
  constructor(private http: HttpClient) { }

  getUsuarios() {
    if (this.invalido) {
      return new Promise((resolve, reject) => {
        this.http.get(this.cfg.api + "/usuarios").toPromise().then(r => {
          this.usuarios = r;
          resolve(r);
        }).catch(e => reject(e));
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.usuarios);
      });
    }
  }
  getUsuario(id) {
    if (this.invalido) {
      return this.http.get(this.cfg.api + "/usuarios/" + id).toPromise();
    } else {
      return new Promise((resolve, reject) => {
        this.usuarios.forEach(v => {
          if (v.id == id) {
            resolve(v);
          }
        });
        reject({});
      });
    }
  }
  getAmbientes() {
    if (this.invalido) {
      return new Promise((resolve, reject) => {
        this.http.get(this.cfg.api + "/ambientes").toPromise().then(r => {
          this.ambientes = r;
          resolve(r);
        }).catch(e => reject(e));
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.ambientes);
      });
    }
  }
  getAmbiente(id) {
    if (this.invalido) {
      return this.http.get(this.cfg.api + "/usuarios/" + id).toPromise();
    } else {
      return new Promise((resolve, reject) => {
        this.ambientes.forEach(v => {
          if (v.id == id) {
            resolve(v);
          }
        });
        reject({});
      });
    }
  }
  getReservas() {
    if (this.invalido) {
      return new Promise((resolve, reject) => {
        let pms = [this.getUsuarios().then(r => { }), this.getAmbientes().then(r => { }), this.http.get(this.cfg.api + "/reservas").toPromise().then(r => {
          this.reservas = r;
          console.log(r);
        })];
        Promise.all(pms).then((r: any) => {
          console.log(r);
          this.invalido = false;
          pms = [];
          for (let i = 0; i < this.reservas.length; i++) {
            pms.push(this.getUsuario(this.reservas[i].usuario).then(u => {
              console.log(u);
              this.reservas[i].usuario = u;
            }));
            pms.push(this.getAmbiente(this.reservas[i].ambiente).then(a => {
              console.log(a);
              this.reservas[i].ambiente = a;
            }));
          }
          Promise.all(pms).then(x => {
            resolve(this.reservas);
          });
        });
      });
    } else {
      return new Promise(resolve => {
        resolve(this.reservas);
      })
    }
  }
  getReserva(id) {
    return new Promise((resolve, reject) => {
      this.getReservas().then(r => {
        this.reservas.forEach(v => {
          if (v.id == id) {
            resolve(v);
          }
        });
        reject({});
      });
    });
  }
}
