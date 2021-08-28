const counterReducer = (state = true, action) =>{

    switch(action.type){
        case "activer":
            return !state;
        case "restart":
            return true;
        default:
            return state;
    }
}

export default counterReducer;