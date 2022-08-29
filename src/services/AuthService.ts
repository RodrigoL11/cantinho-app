import { AuthData, SignUpPropsData } from '../hooks/auth'
import { database } from '../config/Firebase'
import { addDoc, collection, DocumentData, getDocs } from 'firebase/firestore'

async function signIn(email: string, password: string): Promise<AuthData> {
    const users: DocumentData[] = []

    const querySnapshot = await getDocs(collection(database, "Users"));
    querySnapshot.forEach((doc) => {
        users.push(doc.data())
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(element => element.email.trim().toLowerCase() === email.trim().toLowerCase());

            if (user?.password === password.trim()) {
                resolve({
                    token: user.token,
                    email: user.email,
                    name: user.name,
                })
            } else {
                reject(new Error('Credenciais Inválidas'));
            }
        }, 500);
    });
}

const formats = {
    email: {
        regx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        msg: "Email inválido!"
    },
    name: {
        regx: /^[A-Za-z]+$/,
        msg: "Nome só aceita letras!"
    },
    password: [
        {
            regx: /[0-9]/,
            msg: "Senha precisa de um número no mínimo."
        },
        {
            regx: /[A-Z]/,
            msg: "Senha precisa de uma letra em caixa alta no mínimo."
        },
        {
            regx: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
            msg: "Senha precisa de um caractere especial no mínimo."
        },
    ]
}

async function formValidation(data: SignUpPropsData) {
    let errorMsg: string = '';
    const fName = data.name.replace(/\s/g, '')
    const fEmail = data.email.trim().toLowerCase()
    const fPassword = data.password.trim()

    //VERIFICANDO SE HÁ UM EMAIL IGUAL
    const querySnapshot = await getDocs(collection(database, "Users"));
    querySnapshot.forEach((doc) => {
        if (fEmail === doc.data().email.trim().toLocaleLowerCase()) errorMsg = "E-mail já cadastrado"
    });

    //VERIFICANDO SE HÁ UM CAMPO EM BRANCO
    Object.entries(data).forEach(([key, value]) => {
        if (!value && key !== 'id' && !errorMsg) errorMsg = `Campo ${key} em branco!`
    });

    //REGEX PARA O NOME
    //SE O NOME NÃO CONTER SOMENTE LETRAS E NÃO TIVER NENHUM ERRO ANTERIOR ELE ALTERA A MSG DE ERRO
    !fName.match(formats["name"].regx) && !errorMsg ? errorMsg = formats["name"].msg : 0;

    //VERIFICANDO TAMANHO DO NOME
    fName.length < 3 && !errorMsg ? errorMsg = "Nome precisa ter no mínimo 3 letras!" : 0;
    fName.length > 15 && !errorMsg ? errorMsg = "Nome pode ter no máximo 15 letras!" : 0;

    //REGEX PARA O EMAIL
    !fEmail.match(formats["email"].regx) && !errorMsg ? errorMsg = formats["email"].msg : 0;

    //VERIFICANDO TAMANHO DA SENHA
    fPassword.length < 8 && !errorMsg ? errorMsg = "Senha precisa ter 8 digítos no mínimo." : 0;
    fPassword.length > 15 && !errorMsg ? errorMsg = "Senha pode ter 15 digítos no máximo." : 0;

    //REGEX PARA A SENHA
    for (let i = 0; i < formats["password"].length; i++)
        if(!fPassword.match(formats["password"][i].regx) && !errorMsg) errorMsg = formats["password"][i].msg

    return errorMsg;
}

async function signUp(data: SignUpPropsData): Promise<AuthData> {
    const errorMsg = await formValidation(data);

    return new Promise(async (resolve, reject) => {
        if (!errorMsg) {
            const docRef = await addDoc(collection(database, 'Users'), data);
            console.log("Document written with ID: ", docRef.id);

            resolve({
                token: data.token,
                email: data.email,
                name: data.name,
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