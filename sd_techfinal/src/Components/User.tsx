import { user } from "../model/user";

const User = (function () {

    let anyUser:any = {};
    const setAnyUser = (any:any) => {
        anyUser=any;
    }
    const getAnyUser = () =>{
        return anyUser;
    }
    let isLoggedIn:boolean = false;

    let User: user = {
        name:'',
        email:'',
        password:'',
        accountType:'',
        isLoggedIn:false,
    }

    const setUser = (user: user) => {
        User.name = user.name;
        User.accountType = user.accountType;
        User.email = user.email;
        User.password = user.password;
        User.isLoggedIn = user.isLoggedIn;
    }

    const logout = () => {
        User.name = '';
        User.accountType = '';
        User.email = '';
        User.password = '';
        User.isLoggedIn = false;
        anyUser = null;
    }

    const getIsLoggedIn = () =>{
        return isLoggedIn;
    }

    const getAccountType = () =>{
        return User.accountType;
    }

    const getName = () =>{
        return User.name
    }


    const setIsLoggedIn = (torf:boolean) =>{
        isLoggedIn = torf;
    }

    const getEmail = () =>{
        return User.email;
    }

    return {
        getEmail:getEmail,
        getAccountType: getAccountType,
        getIsLoggedIn : getIsLoggedIn,
        getName: getName,
        logout:logout,
        setUser : setUser,
        setIsLoggedIn : setIsLoggedIn,
        setAnyUser : setAnyUser,
        getAnyUser : getAnyUser,
    }


}) ();
export default User