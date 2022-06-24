import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any;
  currentUser: any;
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  ngOnInit() {
    this.users = []; 
    this.currentUser = this.token.getUser();
    this.getAdminBoard();
    // to prevent ngFor to throw while we wait for API to return data
  }
  
  // public getUsers() {
  //   this.http.get('admin').subscribe(res => {
  //     this.users = res;
  //   });
  // }

  getAdminBoard(): Observable<any> {
    const headers = new HttpHeaders();
    this.currentUser = this.token.getUser();
    // let tokenParse = JSON.stringify(this.currentUser);   
    const token = this.currentUser.accessToken;
    let tokenParse = 'Bearer' + token;
    headers.append('Authorization', `Bearer ${tokenParse}`);
    const opts = ({ headers: headers });  
    console.log(JSON.stringify(opts));
    return this.http.get(API_URL + 'admin', opts);
  }
  
}
