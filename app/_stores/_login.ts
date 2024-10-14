import {observable} from "@legendapp/state";

interface Login {
    loggedIn: boolean,
    setLoggedIn: () => void,
    user: {
        uuid: string,
        firstName: string,
        lastName: string,
        email: string
    }
}

export const hasLoggedIn$ = observable<Login>({
    loggedIn: false,
    setLoggedIn: () => {
        return hasLoggedIn$.loggedIn.toggle},
    user:{
        uuid: "",
        firstName: "",
        lastName: "",
        email: "",
    }
})