import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cfg = new Config();
  usuarios: any = [];
  ambientes: any = [];
  reservas: any = [];
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
      return this.http.get(this.cfg.api + "/ambientes/" + id).toPromise();
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
        let pms = [this.getUsuarios().then(r => { }),
        this.getAmbientes().then(r => { }),
        this.http.get(this.cfg.api + "/reservas").toPromise().then(r => {
          this.reservas = r;
          console.log(r);
        })];
        Promise.all(pms).then((r: any) => {
          console.log(r);
          this.invalido = false;
          pms = [];
          for (let i = 0; i < this.reservas.length; i++) {
            pms.push(this.getUsuario(this.reservas[i].usuario).then(u => {
              this.reservas[i].usuario = u;
            }));
            pms.push(this.getAmbiente(this.reservas[i].ambiente).then(a => {
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

  saveUsuario(usuario) {
    return new Promise((resolve, reject) => {

      this.http.post(this.cfg.api + "/usuarios", usuario).toPromise().then(r => {
        this.invalido = true;
        this.usuarios.push(usuario);
        resolve(usuario)
      }).catch(e => reject(e));
    });
  }

  saveAmbiente(ambiente) {
    return new Promise((resolve, reject) => {

      this.http.post(this.cfg.api + "/ambientes", ambiente).toPromise().then(r => {
        this.invalido = true;
        this.ambientes.push(ambiente);
        resolve(ambiente)
      }).catch(e => reject(e));
    });
  }

  saveReserva(reserva) {
    return new Promise((resolve, reject) => {
      this.http.post(this.cfg.api + "/reservas", reserva).toPromise().then(r => {
        this.invalido = true;
        this.reservas.push(reserva);
        resolve(reserva)
      }).catch(e => reject(e));
    });
  }

  updateUsuario(usuario) {
    return new Promise((resolve, reject) => {
      this.http.put(this.cfg.api + "/usuarios/" + usuario.id, usuario).toPromise().then((r: any) => {
        this.invalido = true;
        // for (let i = 0; i < this.usuarios.length; i++) {
        //   if (this.usuarios[i].id == r.id) {
        //     this.usuarios[i] = r;
        //   } 
        // }
        resolve(r);
      }).catch(e => reject(e));
    });
  }

  updateAmbiente(ambiente) {
    return new Promise((resolve, reject) => {
      this.http.put(this.cfg.api + "/ambientes/" + ambiente.id, ambiente).toPromise().then((r: any) => {
        this.invalido = true;
        // for (let i = 0; i < this.ambientes.length; i++) {
        // if (this.ambientes[i].id == r.id) {
        // this.ambientes[i] = r;
        // } 
        // }
        resolve(r);
      }).catch(e => reject(e));
    });
  }

  updateReserva(reserva) {
    console.log(reserva);

    return new Promise((resolve, reject) => {
      this.http.put(this.cfg.api + "/reservas/" + reserva.id, reserva).toPromise().then((r: any) => {
        this.invalido = true;
        // for (let i = 0; i < this.reservas.length; i++) {
        //   if (this.reservas[i].id == r.id) {
        //     this.reservas[i] = r;
        //   } 
        // }
        resolve(r);
      }).catch(e => reject(e));
    });
  }
  deletarReserva(reserva) {
    this.invalido = true;
    return Promise.all([this.http.delete(this.cfg.api + "/reservas/" + reserva.id).toPromise()]);
  }
  deletaAmbiente(ambiente) {
    // return new Promise(resolve => {
    //   this.getReservas().then(r => {
    let pms = [];
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].ambiente.id == ambiente.id) {
        pms.push(this.deletarReserva(this.reservas[i]));
      }
    }
    pms.push(this.http.delete(this.cfg.api + "/ambientes/" + ambiente.id).toPromise());
    this.invalido = true;
    return Promise.all(pms);
    //   });
    // });
  }
  deletaUsuario(usuario) {
    // return new Promise(resolve => {
    // this.getReservas().then(r => {
    let pms = [];
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].usuario.id == usuario.id) {
        pms.push(this.deletarReserva(this.reservas[i]));
      }
    }
    pms.push(this.http.delete(this.cfg.api + "/usuarios/" + usuario.id).toPromise());
    this.invalido = true;
    return Promise.all(pms);
    // });
    // });
  }
}
