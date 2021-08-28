const breakReducer = (state = 5, action) =>{

    switch(action.type){
        case "increment":
            return state+action.payload;
        case "decrement":
            if(state===1){
                return state;
            }
            return state-action.payload;
        case "restart":
            return 5;
        default:
            return state;
    }
}

export default breakReducer;