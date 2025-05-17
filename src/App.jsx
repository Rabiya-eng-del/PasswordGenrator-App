import React, { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  const[length , setLenght] = useState(8)
  const[numberAllow , setNumberAllow] = useState(false)
  const[chractorAllow , setChractorAllow] = useState(false)
  const[password , setPassword] = useState('')

  const passwordRef = useRef(null)
  
  const passwordGenrator = useCallback(()=>{
    let pass=""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllow) str +="0123456789"
    if(chractorAllow) str += "!@#$%^&*()_+[]{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  },[length,numberAllow,chractorAllow,setPassword])



  useEffect(()=>{
    passwordGenrator()
  },[length,numberAllow,chractorAllow,passwordGenrator])

  const copypasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  
    // Show toast
    toast.success('Password copied!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
  }, [password]);

  return (
    <div className="wrapper">
      <div className="app-card">
        <h1>Password Generator 🔐</h1>

        <input type="text" readOnly ref={passwordRef} id='password' value={password} />
        <button onClick={copypasswordToClipboard}>Copy</button>

        <div className="range-group">
          <label>Password Length {length}</label>
          <input type="range" min={5} max={100}  value={length} onChange={(e)=>{setLenght(e.target.value)}}/>
        </div>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" defaultChecked={numberAllow} id='numberinput' onChange={()=>{setNumberAllow((prev) =>!prev)}}/> Include Numbers
          </label>
          <label>
            <input type="checkbox" defaultChecked={chractorAllow} id='chractorinput' onChange={()=>{setChractorAllow((prev)=>!prev)}}/> Include Characters
          </label>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
