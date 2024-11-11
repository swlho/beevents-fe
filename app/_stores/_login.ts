import {observable} from "@legendapp/state";

interface StaffLogin {
    loggedIn: boolean,
    // setLoggedIn: () => void,
    staff: {
        email: string | undefined,
    }
}

export const hasLoggedIn$ = observable<StaffLogin>({
    loggedIn: false,
    // setLoggedIn: () => {
    //     return hasLoggedIn$.loggedIn.toggle},
    staff:{
        email: undefined,
    }
})