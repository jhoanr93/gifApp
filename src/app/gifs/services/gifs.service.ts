import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _records: string[] = [];

  public results: Gif[] = [];

  get records(){
    this._records = this._records.splice(0,10);
    return[...this._records];
  }

  constructor ( private http: HttpClient){

    if(localStorage.getItem('records')){
      this._records = JSON.parse(localStorage.getItem('records')!);
    };

    if(localStorage.getItem('results')){
      this.results = JSON.parse(localStorage.getItem('results')!);
    };
  }

  SearchGifs( query:string ){
    query = query.trim().toLowerCase();

    if(!this._records.includes( query)){
      this._records.unshift( query );
      this._records = this._records.splice(0,10);
      localStorage.setItem('records', JSON.stringify(this._records));
      
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=Xv9SMX8ZKs9or6mrmnleFG8cUKS4M1kk&q=${query}}&limit=8&offset=0&rating=g&lang=en`).subscribe( (resp : any)=>{
      console.log(resp.data);
      console.log(this._records);
      this.results = resp.data;
      localStorage.setItem('results', JSON.stringify(this.results));
    });
    
    
  }
}
