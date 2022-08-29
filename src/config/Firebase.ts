import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBepw1KrGY13O3-x_IwnF2aNiggszaGXdU",
    authDomain: "notificacaolocal-fa281.firebaseapp.com",
    projectId: "notificacaolocal-fa281",
    storageBucket: "notificacaolocal-fa281.appspot.com",
    messagingSenderId: "213247706480",
    appId: "1:213247706480:web:580572db5b33c46d233bb5"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

