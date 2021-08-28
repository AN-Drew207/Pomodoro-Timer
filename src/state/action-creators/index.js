export const increment = (a) =>{
    return (dispatch)=>{
        dispatch({ 
            type:"increment",
            payload : 1,
        })
    }
}

export const decrement = () =>{
    return (dispatch)=>{
        dispatch({ 
            type:"decrement",
            payload : 1,
        })
    }
}

export const incrementer = (a) =>{
    return (dispatch)=>{
        dispatch({ 
            type:"incrementer",
            payload : 1,
        })
    }
}

export const decrementer = () =>{
    return (dispatch)=>{
        dispatch({ 
            type:"decrementer",
            payload : 1,
        })
    }
}

export const activer = () =>{
    return (dispatch)=>{
        dispatch({ 
            type:"activer",
        })
    }
}

export const restart = () =>{
    return (dispatch)=>{
        dispatch({ 
            type:"restart",
        })
    }
}
