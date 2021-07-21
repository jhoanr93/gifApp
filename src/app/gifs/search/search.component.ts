import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!:ElementRef<HTMLInputElement>;

  constructor (private gifsServices: GifsService){

  }

  Search(){
    const value = this.txtSearch.nativeElement.value;

    if (value.trim().length == 0){
      return;
    }

    this.gifsServices.SearchGifs( value );
    this.txtSearch.nativeElement.value = '';

  }
  

}
