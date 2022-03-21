import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {


  // baseURL: string = "http://localhost/api/"
  baseURL: string = "http://jet-herecut-com.preview-domain.com/api/";
  
  loginState: boolean = false;
  constructor(private http: HttpClient) { }

  private subject = new Subject<any>()

  sendUpdate(message: string) {
    this.subject.next({ text: message })
  }r

  getUpdate(): Observable<any> {
    return this.subject.asObservable()
  }

  sendApiRequest(method: any, data: any) {
    return <any>(
      this.http.post(this.baseURL + method, btoa(JSON.stringify(data)))
    );
  }

  sendApiRequest2(method: string, data: any, condition: string) {
    return <any>(
      this.http.post(this.baseURL + method + condition, btoa(JSON.stringify(data)))
    )
  }

  setLogin(): void {
    window.sessionStorage.setItem('loginState', 'true');
  }

  setLogout(): void {
    window.sessionStorage.clear();
    this.loginState = false;
  }

  updateResponse(message: string) {
    this.subject.next({ text: message });
  }



}
