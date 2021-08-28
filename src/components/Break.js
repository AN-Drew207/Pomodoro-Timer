import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actionCreators} from '../state/index'

const Break = () =>{
    const active = useSelector(state => state.active)
    const state = useSelector(state => state.breaker)
    const dispatch = useDispatch();
    const {increment, decrement} = bindActionCreators(actionCreators, dispatch)

    return(
        <div id="break-container" className="d-flex align-items-center flex-column mx-2">
            <h4 id="break-label" >Break Length</h4>
            {
                active ?
                <div className="d-flex flex-row">
                    <button className="btn btn-warning mx-1" onClick={decrement}><i class="bi bi-arrow-down"></i></button>
                    <h2 className="px-2">{state}</h2>
                    <button className="btn btn-warning mx-1" onClick={increment}><i class="bi bi-arrow-up"></i></button>
                </div>
                :
                <div className="d-flex flex-row">
                    <button className="btn btn-warning mx-1"><i class="bi bi-arrow-down"></i></button>
                    <h2 className="px-2">{state}</h2>
                    <button className="btn btn-warning mx-1"><i class="bi bi-arrow-up"></i></button>
                </div>
            }
        </div>
    )
}

export default Break