import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Cookie } from "./cookies";
import { inject } from "@angular/core";

export module Guard {
    export const isLogged: CanActivateFn = (
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => {
        const router: Router = inject(Router);
        const cookie: Cookie = inject(Cookie);
        const currentTime: number = new Date().getTime();
        const currentLocalToken = cookie.getCookie('userToken');

        const tokenDB = JSON.parse(localStorage.getItem("tokens") as string) || [];

        if (currentLocalToken && tokenDB.length > 0 && tokenDB.filter((item: {userToken: string, expirationTime: number}) => {
                return item.userToken === currentLocalToken && item.expirationTime > currentTime
            })
        ) {
            console.log("token is valid");
            if (state.url === '/login' || state.url === '/register') {
                router.navigate(['/call']);
                return false;
            } else {
                return true;
            }
        } else {
            if (state.url == '/login' || state.url === '/register') {
                return true;
            } else {
                alert('Access Denied! Need authorization');
                router.navigate(['/login']);
                return false;
            }
        }
    }
}