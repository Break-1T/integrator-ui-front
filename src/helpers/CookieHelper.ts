import app from '@/main';

export default class CookieHelper {
    //#region private fields

    private static REFRESH_TOKEN_COOKIE: string = 'RefreshToken';
    private static ACCESS_TOKEN_COOKIE: string = 'IdentityToken';

    //#endregion private fields

    //#region public methods

    public static getRefreshTokenCookie(): string {
        return this.get(this.REFRESH_TOKEN_COOKIE);
    }

    public static getAccessTokenCookie(): string {
        return this.get(this.ACCESS_TOKEN_COOKIE);
    }

    public static setRefreshTokenCookie(value: string) {
        return this.set(this.REFRESH_TOKEN_COOKIE, value);
    }

    public static setAccessTokenCookie(value: string) {
        return this.set(this.ACCESS_TOKEN_COOKIE, value);
    }

    public static removeRefreshTokenCookie(): boolean {
        return this.remove(this.REFRESH_TOKEN_COOKIE);
    }

    public static removeAccessTokenCookie(): boolean {
        return this.remove(this.ACCESS_TOKEN_COOKIE);
    }

    //#endregion public methods

    //#region private methods

    private static set(name: string, value: string) {
        return app.config.globalProperties.$cookies.set(name, value);
    }

    private static get(name: string): string {
        return app.config.globalProperties.$cookies.get(name);
    }

    private static remove(name: string): boolean {
        return app.config.globalProperties.$cookies.remove(name);
    }

    //#endregion private methods
}