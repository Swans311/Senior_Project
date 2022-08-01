import { OrganizationUser } from "../model/OrganizationUser";

const organizationUser = (function () {

    let organizationUser: OrganizationUser = {
        oname:'',
        acname:'',
        taxID:'',
        email:'',
        password:'',
        isLoggedIn:false,
    }

    const setOrg = (org: OrganizationUser) => {
        organizationUser.oname=org.oname
        organizationUser.acname=org.acname
        organizationUser.taxID=org.taxID
        organizationUser.email = org.email
        organizationUser.password= org.password
        organizationUser.isLoggedIn = true;
    }


    const logout = () => {
        organizationUser.oname = ''
        organizationUser.acname=''
        organizationUser.taxID=''
        organizationUser.email = ''
        organizationUser.password= ''
        organizationUser.isLoggedIn = false
    }

    const getIsLoggedIn = () =>{
        return organizationUser.isLoggedIn;
    }

    const getName = () =>{
        return organizationUser.acname
    }

    const getOName = () =>{
        return organizationUser.oname;
    }


    const getEmail = () =>{
        return organizationUser.email;
    }

    return {
        getOName : getOName,
        getEmail:getEmail,
        getIsLoggedIn : getIsLoggedIn,
        getName: getName,
        logout:logout,
        setOrg: setOrg,
    }


}) ();
export default organizationUser