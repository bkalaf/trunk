import { FBUser, app } from './bootstrap';
import * as React from 'react';

type CURRENTUSER_CHANGED = 'CURRENTUSER_CHANGED';
type CURRENTUSER_CHANGING = 'CURRENTUSER_CHANGING';

export const initialState = {
    auth: {
        currentUser: null,
        isChanging: false
    }   
}

interface State {
    auth: {
        currentUser: FBUser;
        isChanging: boolean;
    }
}
interface Action<TKey extends string = string, T = unknown> {
    type: TKey;
    payload: T;
}
type Actions = Action<CURRENTUSER_CHANGED, FBUser> | Action<CURRENTUSER_CHANGING, boolean>;


export function reducerFunction(state: State, action: Actions): State {
    switch (action.type) {
        case 'CURRENTUSER_CHANGED':
            return { ...state, auth: { ...state.auth, currentUser: action.payload } };
        case 'CURRENTUSER_CHANGING':   
            return { ...state, auth: { ...state.auth, isChanging: action.payload }}
    }
}

export const FirebaseContext = React.createContext<{
    state: State,
    dispatch: React.Dispatch<Actions>   
} | null>(null);

export function FirebaseProvider(props: { initialState: State, reducer: typeof reducerFunction, children: React.ReactNode | React.ReactNode[] | null }) {
    const [state, dispatch] = React.useReducer(props.reducer, props.initialState);
    app.auth().onAuthStateChanged(authStateHandler(state, dispatch));
    return <FirebaseContext.Provider value={{ state, dispatch }}>{props.children}</FirebaseContext.Provider>
}

function authStateHandler(state: State, dispatch: React.Dispatch<Actions>) {
    return (user: FBUser) => {
        if (state.auth.currentUser !== user) {
            dispatch({ type: 'CURRENTUSER_CHANGED', payload: user });
            console.log(`CURRENTUSER_CHANGED: ${JSON.stringify(user)}`);
        }
        else {
            console.log('CURRENTUSER_CHANGED: currentUser === user');
        }
    };
}
