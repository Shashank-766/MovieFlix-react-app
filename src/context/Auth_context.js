import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
const AuthContext = createContext();
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [SavedMovies, setSavedMovies] = useState([]);
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, "users", email), { savedShows: [] });
    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
        signOut(auth);
        setSavedMovies([]);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    });


    useEffect(() => {
        onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
            setSavedMovies(doc.data()?.savedShows);
        });
    }, [user?.email]);

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut,SavedMovies,setSavedMovies }}>
            {children}
        </AuthContext.Provider>
    );
}
export function UserAuth() {
    return useContext(AuthContext);
}
