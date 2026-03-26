import { User } from "./modules/userModule.js";

let emailInput = document.querySelector("#emailInput");
let passInput = document.querySelector("#passInput");
let registerBtn = document.querySelector("#registerBtn");
let loginBtn = document.querySelector('#loginBtn');

let userId = 1;
let allUsers = JSON.parse(localStorage.getItem('users')) || [];
User.users = allUsers;
console.log(allUsers);

function addNewUser() {
    let userRole;
    if (emailInput.value === "sara@gmail.com") {
        userRole = "admin";
        userId = 1;
    } else {
        userRole = "user";
    }

    if (User.users.find(user => user.userEmail === emailInput.value)){
        alert("Registered");
        return;
    }

    if (User.users.length > 0) {
        userId = User.users[User.users.length - 1].userId + 1;
    }

    if(emailInput.value === "" || passInput.value === "" ){
        alert("enter data");
        return;
    }

    let user = new User(userId, emailInput.value, passInput.value, userRole);

    User.users.push(user);
    console.log(User.users)

    localStorage.setItem("users", JSON.stringify(User.users));
    console.log(User.users);
   
    return user;
}


function login(){
    const foundUser = User.users.find(user => user.userEmail === emailInput.value && user.userPassword === passInput.value);
    
    if (foundUser && foundUser.userRole == 'admin'){
        window.location.href = `admin.html?email=${foundUser.userEmail}&userId=${foundUser.userId}` 
    }
    else if (foundUser && foundUser.userRole == 'user'){
        window.location.href = `user.html?email=${foundUser.userEmail}&userId=${foundUser.userId}` ;
    }
    else{
        alert('user not found');
    }

}

loginBtn.addEventListener('click' , login);

registerBtn.addEventListener("click", () => {
    let user = addNewUser();
    if(!user) return;
  
    if (user.userRole === "admin") {
        window.location.href = `admin.html?email=${user.userEmail}&userId=${user.userId}`;
    } else {
        window.location.href = `user.html?email=${user.userEmail}&userId=${user.userId}`;
    }

});