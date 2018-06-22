import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router} from '@angular/router';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Auth implements HttpInterceptor{
    constructor( private cookieService: CookieService,  private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            setHeaders:{
                Authorization: 'Client-ID '+ environment.access_key,
                Accept: 'application/json;odata=verbose',
                'Accept-Version': 'v1'
            }
        });
        return next.handle(authReq).map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
               return event;
            }
        })
        .catch((error: any) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status == 401) {
                }
                else{
                    // server error
                    return Observable.throw(error);
                }
            } else {
                return Observable.throw(error);
            }
        })
    }

}