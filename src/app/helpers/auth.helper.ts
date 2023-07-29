import { AutenticarResponseModel } from "../models/autenticar.response.model";
import { getData, removeData, saveData } from "./storage.helper";

//chave para salvar os dados de autenticação
const authUser: string = 'auth-user';

//função para autenticar o usuário
export function signIn(model: AutenticarResponseModel): void {
    saveData(authUser, model);
}

//função para logout
export function signOut(): void {
    removeData(authUser);
}

//função para ler os dados do usuário autenticado
export function getAuthData(): AutenticarResponseModel | null {
    //lendo os dados gravados na local storage
    let data = getData(authUser);
    //verificando se não está vazio    
    if (data != null) {
        let model = JSON.parse(data) as AutenticarResponseModel;        
        //verificando se o token não está vazio
        if (model.accessToken != null) {
            //verificar se o token ainda é válido
            let dataAtual = new Date();
            let dataExpiracao = new Date(model.dataHoraExpiracao as Date);
            if (dataAtual <= dataExpiracao) {
                return model; //retornar os dados do usuário autenticado
            }
        }
    }
    
    return null;
}