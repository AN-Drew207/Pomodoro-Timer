const sessionReducer = (state = 25, action) =>{

    switch(action.type){
        case "incrementer":
            return state+action.payload;
        case "decrementer":
            if(state===1){
                return state;
            }
            return state-action.payload;
        case "restart":
            return 25;
        default:
            return state;
    }
}

export default sessionReducer;