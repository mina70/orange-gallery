import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls:['./search.component.scss'],
    providers: [ ApiService ]
})
export class SearchComponent implements OnInit {

    result: any = [];
    perPage: number;
    page: number;
    search: string;
    searchResult: any = [];

    constructor(private api: ApiService, private router: Router, private activeRouter: ActivatedRoute) { }

    ngOnInit() {
        this.perPage = 10;
        this.page = 1;

        this.activeRouter.params.subscribe(params => {
            this.search = params['keyword'];
            this.searchTxt(this.search);
        });
    }

    searchTxt(txt){
        this.api.getSearchResult(txt, this.perPage, this.page).subscribe(
            (res: Response) =>{
               this.result = res;
                if(this.result.length > 0){
                    for(var i=0; i<this.perPage; i++){
                        this.searchResult.push(this.result[i]) ;
                    }
                }
            }
        )
    }
    photosScroll(){
        this.page += 1;
        this.searchTxt(this.search);
    }
}