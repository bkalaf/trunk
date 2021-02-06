import firebase from 'firebase/app';
import { configObject } from './configObject';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const app = firebase.initializeApp(configObject);

export type FBUser = firebase.User | null;
export type FBProfile = null;

export type FBEmail = [emailAddress: string, isVerified: boolean];
