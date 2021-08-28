import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {bindActionCreators} from 'redux'
import {actionCreators} from '../state/index'
import beep from '../audio/alarma_2.mp3'

const Counter = () =>{

    const sessionInterval =useRef(null)
    const breakInterval = useRef(null)
    
    const {active, breaker, session}= useSelector(state=>state)

    const [timeSession, setTimeSession]=useState(session*100);
    const [minSession, setMinSession]=useState(session);
    const [secSession, setSecSession]=useState(0);
    const [timeBreak, setTimeBreak]=useState(breaker*100);
    const [minBreak, setMinBreak]=useState(breaker);
    const [secBreak, setSecBreak]=useState(timeBreak%100);
    const [sessionBreak, setSessionBreak]=useState(true)

    const dispatch = useDispatch();
    const {activer, restart} = bindActionCreators(actionCreators, dispatch)

    useEffect(()=>{
        setTimeSession(()=>session*100)
        setMinSession(()=>session)
        setSecSession(()=>0)
    },[session])

    useEffect(()=>{
        setTimeBreak(breaker*100)
        setMinBreak(breaker)
        setSecBreak(0)
    },[breaker])

    useEffect(()=>{
        if(!active){
            if(sessionBreak){
                sessionInterval.current = setInterval(setingIntervalSession,1000);
            }else{
                breakInterval.current = setInterval(setingIntervalBreak,1000);
            }
        }
    },[sessionBreak])


    const restarter = () =>{
        restart();
        document.getElementById('counter').classList.remove('text-danger')
        if(sessionInterval.current!==null){
            clearInterval(sessionInterval.current)
        }
        if(breakInterval.current!==null){
            clearInterval(breakInterval.current)
        }
        setSessionBreak(()=>true)
        setTimeBreak(breaker*100)
        setMinBreak(breaker)
        setSecBreak(0)
        setTimeSession(session*100);
        setMinSession(session)
        setSecSession(0)
    }

    const setingIntervalSession = () =>{
            if(minSession===0&&secSession===0){
                setTimeSession(session*100);  
                setTimeBreak(breaker*100);                      
            }else{
                setTimeSession((prev)=>{
                    if(prev%100>=1){
                        if((prev-1)%100===0&&Math.floor((prev-1)/100)===0){
                            setMinSession(()=>session);
                            setSecSession(()=>0);
                            setSessionBreak(()=>false);
                            setTimeBreak(breaker*100)
                            setMinBreak(breaker)
                            setSecBreak(0)
                            document.getElementById('counter').classList.remove('text-danger')
                            document.getElementById('beep').play();
                            clearInterval(sessionInterval.current)
                        }else{
                            if(Math.floor((prev-1)/100)===0){
                                 document.getElementById('counter').classList.add('text-danger')
                            }
                            setMinSession(()=>Math.floor((prev-1)/100));
                            setSecSession(()=>(prev-1)%100);
                        }
                        return (prev-1);
                    }else{
                        setMinSession(()=>Math.floor((prev-41)/100));
                        setSecSession(()=>(prev-41)%100);
                        return (prev-41);
                    }
                });
            }
        
    }

    const activadorSession = () =>{
        activer();
        sessionInterval.current = setInterval(setingIntervalSession,1000)
    }

    const setingIntervalBreak=()=>{
        if(minBreak===0&&secBreak===0){
            setTimeBreak(breaker*100);  
            setTimeSession(session*100);                      
        }else{
            setTimeBreak((prev)=>{
                if(prev%100>=1){
                    if((prev-1)%100===0&&Math.floor((prev-1)/100)===0){
                        setMinBreak(()=>breaker);
                        setSecBreak(()=>0);
                        setSessionBreak(()=>true);
                        setTimeSession(session*100)
                        setMinSession(session)
                        setSecSession(0)
                        document.getElementById('counterBreak').classList.remove('text-danger')
                        document.getElementById('beep').play();
                        clearInterval(breakInterval.current)
                    }else{
                        if(Math.floor((prev-1)/100)===0){
                            document.getElementById('counterBreak').classList.add('text-danger')
                        }
                        setMinBreak(()=>Math.floor((prev-1)/100));
                        setSecBreak(()=>(prev-1)%100);
                    }
                    return (prev-1);
                }else{
                    setMinBreak(()=>Math.floor((prev-41)/100));
                    setSecBreak(()=>(prev-41)%100);
                    return (prev-41);
                }
            });
        }
    }

    const activadorBreak = () =>{
        activer();
        breakInterval.current = setInterval(setingIntervalBreak,1000)
    }

    const desactivadorSession=()=>{
        activer();
        clearInterval(sessionInterval.current);
    }

    const desactivadorBreak=()=>{
        activer();
        clearInterval(breakInterval.current);
    }


    const sessionPrint = 
    secSession >= 10 && minSession >= 10 ?
    <div>
        <h4 className="text-center">Session</h4>
        <h1 id="counter" className="text-center" style={{fontSize:'100px'}}>{minSession}:{secSession}</h1>
    </div>
    :
    secSession >= 10 ?
    <div>
        <h4 className="text-center">Session</h4>
        <h1 id="counter" className="text-center" style={{fontSize:'100px'}}>0{minSession}:{secSession}</h1>
    </div>
    :
    minSession >= 10 ?
    <div>
        <h4 className="text-center">Session</h4>
        <h1 id="counter" className="text-center" style={{fontSize:'100px'}}>{minSession}:0{secSession}</h1>
    </div>
    :
    <div>
        <h4 className="text-center">Session</h4>
        <h1 id="counter" className="text-center" style={{fontSize:'100px'}}>0{minSession}:0{secSession}</h1>
    </div>
    ;

    const breakPrint =
    secBreak >= 10 && minBreak  >= 10 ?
    <div>
        <h4 className="text-center">Break</h4>
        <h1 id="counterBreak" className="text-center" style={{fontSize:'100px'}}>{minBreak }:{secBreak}</h1>
    </div>
    :
    secBreak >= 10 ?
    <div>
        <h4 className="text-center">Break</h4>
        <h1 id="counterBreak" className="text-center" style={{fontSize:'100px'}}>0{minBreak }:{secBreak}</h1>
    </div>
    :
    minBreak >= 10 ?
    <div>
        <h4 className="text-center" >Break</h4>
        <h1 id="counterBreak" className="text-center" style={{fontSize:'100px'}}>{minBreak }:0{secBreak}</h1>
    </div>
    :
    <div>
        <h4 className="text-center">Break</h4>
        <h1 id="counterBreak" className="text-center" style={{fontSize:'100px'}}>0{minBreak }:0{secBreak}</h1>
    </div>
    ;

    const buttons=
        active ?
            sessionBreak ?
            <div className="d-flex flex-row align-items-center justify-content-center">
                <button className="btn btn-warning mx-1" onClick={activadorSession}><i className="bi bi-play-fill"></i></button>
                <button className="btn btn-warning mx-1" onClick={restarter}><i className="bi bi-arrow-counterclockwise"></i></button>
            </div>
            :
            <div className="d-flex flex-row align-items-center justify-content-center">
                <button className="btn btn-warning mx-1"  onClick={activadorBreak}><i className="bi bi-play-fill"></i></button>
                <button className="btn btn-warning mx-1" onClick={restarter}><i className="bi bi-arrow-counterclockwise"></i></button>
            </div>
        :
            sessionBreak ?
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <button className="btn btn-warning mx-1" onClick={desactivadorSession}><i className="bi bi-pause-fill"></i></button>
                    <button className="btn btn-warning mx-1" onClick={restarter}><i className="bi bi-arrow-counterclockwise"></i></button>
                </div>
            :
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <button className="btn btn-warning mx-1" onClick={desactivadorBreak}><i className="bi bi-pause-fill"></i></button>
                    <button className="btn btn-warning mx-1" onClick={restarter}><i className="bi bi-arrow-counterclockwise"></i></button>
                </div>
    ;

    return(
        <div style={{borderRadius:'25px', border:'solid 2px yellow', padding:'25px'}}>
            {
                sessionBreak ?
                sessionPrint
                :
                breakPrint
            }
            {
                buttons
            }
            <audio id="beep" className="audio-element">
                 <source src={beep}></source>
            </audio>
        </div>
    )
}

export default Counter