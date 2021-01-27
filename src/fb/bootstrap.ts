import firebase from 'firebase';
import { configObject } from './configObject';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp(configObject);

export type FBUser = firebase.User | null;
export type FBProfile = null;

export type FBEmail = [emailAddress: string, isVerified: boolean];

interface ApplicationState {
    currentUser: FBUser;
}

const defaultState: ApplicationState = {
    currentUser: null
}

const authHandler = (user: FBUser) => {
    
}
app.auth().onAuthStateChanged()