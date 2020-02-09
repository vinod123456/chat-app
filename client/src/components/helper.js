//get jwt token from local storage 

export const jwt=()=> {
    return localStorage.getItem('jwt');
}
