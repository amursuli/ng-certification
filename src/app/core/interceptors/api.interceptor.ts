import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
      url: req.url,
      params: req.params.set('appid', '5a4b2d457ecbef9eb2a71e480b947604'),
    });
    return next.handle(cloneReq);
  }
}
