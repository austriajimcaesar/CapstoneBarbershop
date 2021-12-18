import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // baseURL: string = "http://gordoncollegeccs.edu.ph:4230/api/"
  baseURL: string = "http://localhost/CapstoneBarbershop/api/"

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>()

  sendUpdate(message: string) {
    this.subject.next({ text: message })
  }

  getUpdate(): Observable<any> {
    return this.subject.asObservable()
  }

  sendApiRequest(method: any, data: any) {
    return <any>(
      this.http.post(this.baseURL + method, data)
    );
  }

  sendApiRequest2(method: string, data: any, condition: string) {
    return <any>(
      this.http.post(this.baseURL + method + condition, btoa(JSON.stringify(data)))
    )
  }
}
