import { Observable } from "rxjs";
import { EstoquesPostRequestModel } from "../models/estoques-post.request.model";
import { EstoqueGetResponseModel } from "../models/estoques-get.response.model";
import { EstoquesPutRequestModel } from "../models/estoques-put.request.model";
import axios, { AxiosResponse } from "axios";
import { environment } from "src/environments/environment";
import { getAuthData } from "../helpers/auth.helper";
import { downloadFile } from "../helpers/download.helper";

const urlEstoques = `${environment.apiEstoque}/api/estoques`;

//cadastro de estoques
export function postEstoque(request: EstoquesPostRequestModel): Observable<EstoqueGetResponseModel> {
    const config = {
        method: 'post',
        url: urlEstoques,
        data: request
    }

    return makeRequest<EstoqueGetResponseModel>(config);
}

//edição de estoques
export function putEstoque(request: EstoquesPutRequestModel): Observable<EstoqueGetResponseModel> {
    const config = {
        method: 'put',
        url: urlEstoques,
        data: request
    }

    return makeRequest<EstoqueGetResponseModel>(config);
}

//exclusão de estoques
export function deleteEstoque(id: string): Observable<EstoqueGetResponseModel> {
    const config = {
        method: 'delete',
        url: `${urlEstoques}/${id}`
    }

    return makeRequest<EstoqueGetResponseModel>(config);
}

//consulta de estoques
export function getEstoques(): Observable<EstoqueGetResponseModel[]> {
    const config = {
        method: 'get',
        url: urlEstoques
    }

    return makeRequest<EstoqueGetResponseModel[]>(config);
}

//consulta de estoque por id
export function getEstoqueById(id: string): Observable<EstoqueGetResponseModel> {
    const config = {
        method: 'get',
        url: `${urlEstoques}/${id}`
    }

    return makeRequest<EstoqueGetResponseModel>(config);
}

//consulta do relatório es estoque em PDF 
export function getPdfEstoque() { 
    return new Observable((observer) => { 
        axios.get(`${urlEstoques}/relatorio-pdf`, 
        { responseType: 'arraybuffer' }) 
        .then(response => { 
            downloadFile(response.data, 'pdf', 'relatorio-estoques'); 
            observer.next(); 
            observer.complete(); 
        }) 
        .catch(error => { observer.error(error) }) 
    }); 
} 

//consulta do relatório es estoque em Excel 
export function getExcelEstoque() { 
    return new Observable((observer) => { 
        axios.get(`${urlEstoques}/relatorio-excel`, 
        { responseType: 'arraybuffer' }) 
        .then(response => { 
            downloadFile(response.data, 'excel', 'relatorio-estoques'); 
            observer.next(); 
            observer.complete();
            }) 
            .catch(error => { observer.error(error) }) 
    }); 
}

//interceptor para enviar o token nas requisições
axios.interceptors.request.use(
    config => {
        //verificando se a requisição é para o endpoint de estoques
        if (config.url?.includes(urlEstoques)) {
            let auth = getAuthData();
            if (auth != null) {
                //enviando o TOKEN no cabeçalho da requisição
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`
            }
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

//função para construir a requisição para a API
function makeRequest<T>(config: any): Observable<T> {
    return new Observable<T>(observer => {
        axios(config)
            .then(response => handleResponse(observer, response))
            .catch(error => handleError(observer, error));
    })
}

//função para capturar o retorno de sucesso da API
function handleResponse<T>(observer: any, response: AxiosResponse<T>) {
    observer.next(response.data);
    observer.complete();
}

//função para capturar o retorno de erro da API
function handleError(observer: any, error: any) {
    observer.error(error);
}