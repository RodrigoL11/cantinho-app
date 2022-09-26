import { AuthData } from '@hooks/auth'
import api from './api'
import { IAddress, IPhone, IUser } from '@interfaces/main'

async function signIn(email: string, password: string): Promise<AuthData> {
    const response = await api.get('users');
    const { results } = response.data;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = results.find((element: IUser) => element.email.trim().toLowerCase() === email.trim().toLowerCase());

            if (user?.senha === password.trim()) {
                resolve({
                    id: user.id,
                    token: user.token,
                    email: user.email,
                    name: user.nome,
                })
            } else {
                reject(new Error('Credenciais Inválidas'));
            }
        }, 500);
    });
}

function isValidCPF(cpf: any) {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('').map((el: any) => +el)
    const rest = (count: number) => (cpf.slice(0, count - 12)
        .reduce((soma: number, el: number, index: number) => (soma + el * (count - index)), 0) * 10) % 11 % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
}

async function userValidation(data: IUser) {
    const name = data.nome
    const password = data.password
    const login = data.login
    const email = data.email.toLowerCase()
    const cpf = data.cpf
    
    //VERIFICANDO SE HÁ UM CAMPO EM BRANCO
    const ordem = [{nome: name}, {cpf: cpf}, {email: email}, {login: login}, {senha: password}] 

    let msgVazio = ""

    ordem.forEach((obj) => {
        const key = Object.keys(obj)[0]
        const value = obj[key as keyof typeof obj]
        
        if (!value && !msgVazio) msgVazio = `Campo ${key} em branco!`
    });
    
    if (msgVazio != "") return msgVazio;
    
    //VALIDANDO CPF
    if (!isValidCPF(cpf)) return "CPF inválido!"
    
    //REGEX PARA O EMAIL
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) return "Formato de E-mail inválido";
    
    //REGEX PARA O NOME
    //SE O NOME NÃO CONTER SOMENTE LETRAS E NÃO TIVER NENHUM ERRO ANTERIOR ELE ALTERA A MSG DE ERRO
    if (!name.match(/^[A-Za-z\s]*$/)) return "Nome só aceita letras!"
    
    //VERIFICANDO TAMANHO DO NOME
    if (name.length < 3) return "Nome precisa ter no mínimo 3 letras!";
    if (name.length > 50) return "Nome pode ter no máximo 50 letras!";
    
    //VERIFICANDO TAMANHO DO LOGIN
    if (login.length < 3) return "Login precisa ter no mínimo 3 letras!";
    if (login.length > 15) return "Login pode ter no máximo 15 caracteres!";
    
    //VERIFICANDO TAMANHO DA SENHA
    if (password.length < 8) return "Senha precisa ter 8 digítos no mínimo.";
    if (password.length > 15) return "Senha pode ter 15 digítos no máximo.";
    
    //REGEX PARA A SENHA
    if (!password.match(/[0-9]/)) return "Senha precisa de um número no mínimo.";
    if (!password.match(/[A-Z]/)) return "Senha precisa de uma letra em caixa alta no mínimo.";
    if (!password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) return "Senha precisa de um caractere especial no mínimo.";

    const response = await api.get('users/wholeData');
    const { results } = response.data;
    
    //VERIFICANDO SE HÁ UM EMAIL IGUAL
    results.forEach((doc: IUser) => {
        if (email === doc.email.trim().toLocaleLowerCase()) return "E-mail já cadastrado"
        if (login === doc.login.trim().toLocaleLowerCase()) return "Login já cadastrado"
        if (cpf === doc.cpf.trim().toLocaleLowerCase()) return "Já existe um usuário com este CPF!"
    });
}

async function signUp(data: IUser): Promise<AuthData> {
    //Removendo possíveis espaços nos finais de cada campo
    Object.keys(data).forEach((key) => data[key as keyof IUser].trim())

    //Verificando se há algum erro
    const errorMsg = await userValidation(data);

    return new Promise(async (resolve, reject) => {
        if (errorMsg == undefined) {

            await api.post('users', {
                data: data
            }).then(response => {
                console.log(response)
            })

            
        } else {
            reject(new Error(errorMsg));
        }
    });
}

export const authService = {
    signIn,
    signUp
};