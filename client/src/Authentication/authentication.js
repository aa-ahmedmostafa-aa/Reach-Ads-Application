class Auth
{
    constructor()
    {
        this.athenticated = false;
    }

    logIn(callback)
    {
        this.athenticated =true;
        callback();
    }
    logOut(callback)
    {
        this.athenticated =false;
        callback();
    }
    isAthunticated()
    {
        return this.athenticated;
    }
}


export default new Auth();