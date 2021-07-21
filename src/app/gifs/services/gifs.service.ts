import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _records: string[] = [];

  public results: any[] = [];

  get records(){
    this._records = this._records.splice(0,10);
    return[...this._records];
  }

  constructor ( private http: HttpClient){

  }

  SearchGifs( query:string ){
    query = query.trim().toLowerCase();

    if(!this._records.includes( query)){
      this._records.unshift( query );
      this._records = this._records.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=Xv9SMX8ZKs9or6mrmnleFG8cUKS4M1kk&q=${query}}&limit=8&offset=0&rating=g&lang=en`).subscribe( (resp : any)=>{
      console.log(resp.data);
      console.log(this._records);
      this.results = resp.data;
    });
    
    
  }
}
