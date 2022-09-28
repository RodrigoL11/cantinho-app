import { AuthData } from '@hooks/auth'
import api from './api'
import { IUser } from '@interfaces/main'

async function signIn(login: string, password: string): Promise<AuthData> {
    const response = await api.get('users');
    const { results } = response.data;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = results.find((element: IUser) => element.login.trim().toLowerCase() === login.trim().toLowerCase());

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

export function isValidCPF(cpf: any) {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('').map((el: any) => +el)
    const rest = (count: number) => (cpf.slice(0, count - 12)
        .reduce((soma: number, el: number, index: number) => (soma + el * (count - index)), 0) * 10) % 11 % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
}

export const authService = {
    signIn,
};