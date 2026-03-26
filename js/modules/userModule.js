class User{
    static users = [];
    constructor(userId, userEmail , userPassword , userRole){
        this.userEmail = userEmail,
        this.userPassword = userPassword;
        this.userRole = userRole,
        this.userId = userId;
    }

}

export {User};