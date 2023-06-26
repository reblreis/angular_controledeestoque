import { decrypt, encrypt } from "./crypto.helper";

/*
    Função para gravar dados na local storage
*/
export function saveData(key: string, data: any): void {
    let content = encrypt(JSON.stringify(data));
    localStorage.setItem(key, content);
}

/*
    Função para ler dados gravados na local storage
*/
export function getData(key: string): any | null {
    let data = localStorage.getItem(key) as string | null;
    if (data != null) {
        return decrypt(localStorage.getItem(key) as string);
    }
    else
        return null;
}