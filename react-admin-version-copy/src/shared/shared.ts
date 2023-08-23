class Shared{
    public getToken(): string{
        return localStorage.getItem('token') || '';
    }
    public setToken(token: string): void{
        localStorage.setItem('token', token || '');
    }

    public goHome=(): void=>{
        console.log('goHome used app-base');
    }
}

class SharedModule {
    static shared = new Shared();
    static overloadShared(shared: any): void{
        SharedModule.shared = shared;
    }
    static getShared(){
        return SharedModule.shared;
    }

    public goHome = (): void => {
        return SharedModule.shared.goHome();
    }
}

export default SharedModule;





