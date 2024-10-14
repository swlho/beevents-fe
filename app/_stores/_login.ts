import {observable} from "@legendapp/state";

interface Login {
    loggedIn: boolean,
    setLoggedIn: (bool:boolean) => void;
}

export const hasLoggedIn$ = observable<Login>({
    loggedIn: false,
    setLoggedIn: () => {
        hasLoggedIn$.loggedIn.set((b)=>b=true)
    }
})