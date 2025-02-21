import axios from './Api' ;

export const registerUser = async(userData) =>{
    const response = await axios.post('/user/register' , userData);
    return response;
}

export const loginUser = async(userData) =>{
    const response = await axios.post('/user/login' , userData);
    return response;
}

export const addTransaction = async( transactionData ) =>{
    const response = await axios.post('/transaction/add' , transactionData);
    return response;
}

export const getTransaction = async() =>{
    const response = await axios.get('/transaction/get');
    return response;
}

export const addBudget = async( budgetData ) =>{
    const response = await axios.post('/budget/add' , budgetData);
    return response;
}

export const getBudget = async( ) =>{
    const response = await axios.get('/budget/get');
    return response;
}
