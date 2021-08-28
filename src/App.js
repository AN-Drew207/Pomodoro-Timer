import React from 'react'
import Break from './components/Break'
import Session from './components/Session';
import Counter from './components/Counter'


function App() {
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{height:"100vh", backgroundColor:"black", color:"white"}}>    
      <h1 className="text-center">25+5 Clock</h1>
      <div className="d-flex flex-row justify-content-center p-5">
        <Break/>
        <Session/>
      </div>
      <div className="d-flex flex-column ">
        <Counter/>
      </div>
      <div className="d-flex my-3">
        <h6>Coded by <a className="text-decoration-none text-warning" href="https://github.com/AN-Drew207">Andrés Contreras</a></h6>
      </div>
    </div>
  );
}

export default App;
