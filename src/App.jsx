import React, { useCallback, useEffect, useState,useRef} from 'react'
const App = () => {
const[Length,SetLength]=useState(6)
const[NumberAllowed,SetNumberAllowed]=useState(false)
const[Character,SetCharacter]=useState(false)
const[password,SetPassword]=useState("")
const passwordRef = useRef(null)
const Passwordgenerator = useCallback(() => {
  let pass=""
  let str=
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(NumberAllowed) str += "0123456789" 
  if(Character) str += "!@#$%^&*()_+"
for( let i=0;i<Length;i++){
  let char =Math.floor(Math.random() * str.length )
pass  += str.charAt(char)
}
SetPassword(pass)

},
[Length,NumberAllowed,Character,SetPassword])
const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current.select();
  window.navigator.clipboard.writeText(password)
},[password])
useEffect( () => {
  Passwordgenerator();
}, [Length,NumberAllowed,Character,Passwordgenerator])
  return (
    <>
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-600 bg-gray-700'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
 <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white ">  
  <input
  type="text"
  value={password}
  className="outline-none w-full py-1 px-2"
  placeholder="Password"
  readOnly
  ref={passwordRef}/>
<button
onClick={copyPasswordToClipboard}
 className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>

 </div>
 <div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
    <input
     type="range"
    min={6}
    max={100}
    value={Length}
    className='cursor-pointer'
    onChange={(e) => {SetLength(e.target.value)}}
     />
     <label>Length:{Length}</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input
    type="checkbox"
    defaultChecked={NumberAllowed}
    id="numberInput"
    onChange= {() => {
      SetNumberAllowed((prev)=>!prev);
    }}/>
    <label htmlFor="numberInput">Numbers</label>
  </div>
    <div className="flex items-center gap-x-1">
        <input
    type="checkbox"
    defaultChecked={Character}
    id="CharacterInput"
    onChange= {() => {
      SetCharacter((prev)=>!prev);
    }}/>
    <label htmlFor="CharacterInput">Characters</label>
    </div>
 </div>

  </div>
  </>
  )
}

export default App
