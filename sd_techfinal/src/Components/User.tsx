import { user } from "../model/user";

const User = (function () {

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
    }

    const getIsLoggedIn = () =>{
        return User.isLoggedIn;
    }

    const getAccountType = () =>{
        return User.accountType;
    }

    const getName = () =>{
        return User.name
    }


    const setIsLoggedIn =() =>{
        User.isLoggedIn = !User.isLoggedIn;
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
    }


}) ();
export default User