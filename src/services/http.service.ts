import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiBaseUrl: any = 'https://65cf1c2abdb50d5e5f5a8147.mockapi.io/crud-app';
  // this is the testing api in future may be it will be deleted.

  storeData: any[] = [];
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.apiBaseUrl);
  }

  deleteData(id: number,storeData:any) {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.delete(url,storeData);
  }

  postData(item: any) {
    return this.http.post(this.apiBaseUrl, item);
  }
  getById(id: any) {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get(url);
  }

  updateById(id:any,data:any){
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.put(url,data);
  }
}
