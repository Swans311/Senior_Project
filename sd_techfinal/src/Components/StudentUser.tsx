import { StudentUser } from "../model/StudentUser";

const studentUser = (function () {

    let studentUser: StudentUser = {
        fname:'',
        lname:'',
        email:'',
        password:'',
        isLoggedIn:false,
    }

    const setStudent = (newStudent: StudentUser) => {
        studentUser.fname = newStudent.fname;
        studentUser.lname = newStudent.lname;
        studentUser.email = newStudent.email;
        studentUser.password = newStudent.password;
        studentUser.isLoggedIn = newStudent.isLoggedIn;
    }

    const logout = () => {
        studentUser.fname = '';
        studentUser.lname = '';
        studentUser.email = '';
        studentUser.password = '';
        studentUser.isLoggedIn = false;
    }

    const getIsLoggedIn = () =>{
        return studentUser.isLoggedIn;
    }

    const getName = () =>{
        return studentUser.fname+" "+studentUser.lname
    }

    const getFName = () =>{
        return studentUser.fname
    }
    const getLName = () =>{
        return studentUser.lname;
    }

    const setIsLoggedIn =() =>{
        studentUser.isLoggedIn = !studentUser.isLoggedIn;
    }

    const getEmail = () =>{
        return studentUser.email;
    }

    return {
        getEmail:getEmail,
        getLName: getLName,
        getFName:getFName,
        getIsLoggedIn : getIsLoggedIn,
        getName: getName,
        logout:logout,
        setStudent : setStudent,
        setIsLoggedIn : setIsLoggedIn,
    }


}) ();
export default studentUser