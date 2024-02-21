import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Cookie } from "./cookies";
import { inject } from "@angular/core";

export module Guard {
    export const isLogged: CanActivateFn = (
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) => {
            const router: Router = inject(Router);
            let cookie: Cookie = new Cookie();
            let login = cookie.getCookie('login');
            if (login) {
                return true;
            } else {
                return router.parseUrl('/');
            }
        }

}