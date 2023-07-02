import axios from "axios";
const bcrypt = require('bcryptjs');
const API_URL = "https://crudcrud.com/api/0a4e65aec028469492fda5fe0cf70136/users/";



const register = (name, username, email, password) => {

  const passwordHash = bcrypt.hashSync(password, 10);
  const users = JSON.parse(localStorage.getItem('users'));   

  var promise = new Promise(function(resolve, reject) {
    const user = users.find(u => u.username === username && u.email === email);
    // validate
    if (user) {
      reject('Username and email already exist..!');
    }else{
      axios.post(API_URL, {
        name,
        username,
        email,
        passwordHash,
      }).then(res=>{
        if(res.data._id){
          resolve('Register Successfully...!')
        }
      }).catch(err=>reject('Something went wrong..!')); 
    }
 });
 return promise;
};

const registerUpdate = (name, username, email, password, id) => {

  const passwordHash = bcrypt.hashSync(password, 10);
  const users = JSON.parse(localStorage.getItem('users'));   

  var promise = new Promise(function(resolve, reject) {
    const AlluserswithoutThis = users.filter(u => u._id !== id);
    const user = AlluserswithoutThis.find(u => u.username === username && u.email === email);
    // validate
    if (user) {
      reject('Username and email already exist..!');
    }else{
      axios.put(API_URL+id, {
        name,
        username,
        email,
        passwordHash,
      }).then(res=>{
        if(res.status === 200){
          resolve('Updated Successfully...!')
        }
      }).catch(err=>reject('Something went wrong..!')); 
    }
 });
 return promise;
};

const loadAllusers = async () => {
  return axios
  .get(API_URL)
  .then((response) => {
    if (response.data) {
      localStorage.setItem("users", JSON.stringify(response.data));
    }

    return response;
  });
}

const login = async (username, password) => {
    // const users = JSON.parse(localStorage.getItem('users'));  
    const {data} = await loadAllusers();

    var promise = new Promise(function(resolve, reject) {
      const user = data.find(u => u.username === username);
      // validate
      if (!user) {
        reject('User not found');
      }else if (!(user && (bcrypt.compareSync(password, user.passwordHash)))) {
        reject('Username or password is incorrect');
      }else{
        localStorage.setItem("user", JSON.stringify(user));
        resolve('Login successfully..!')
      }
   });
   return promise;
};

const logout = () => {
  localStorage.removeItem("user");
};

const deleteAllusers = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("users");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};



const deleteuser = (id) => {
  
  var promise = new Promise(function(resolve, reject) {
    axios.delete(API_URL+id).then(res=>{
        resolve('Deleted Successfully...!')
    }).catch(err=>reject('Something went wrong..!')); 
     
 });
 return promise;
};

const AuthService = {
  register,
  registerUpdate,
  login,
  logout,
  getCurrentUser,
  loadAllusers,
  deleteuser,
  deleteAllusers
}

export default AuthService;
