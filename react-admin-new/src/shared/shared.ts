class Shared {
    public getToken(): string {
        return localStorage.getItem('token') || '';
    }

    public setToken(token: string): void {
        localStorage.setItem('token', token || '');
    }
}

class SharedModule {
    static shared = new Shared();

    static overloadShared(shared: any): void {
        SharedModule.shared = shared;
    }

    static getShared(): Shared {
        return SharedModule.shared;
    }
}

export default SharedModule;