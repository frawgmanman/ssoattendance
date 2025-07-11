//import Html5QrcodePlugin from '../components/Html5QrcodePlugin.js';
'use client';
import { Html5QrcodeScanner } from "html5-qrcode";
import {useEffect,useState} from "react";
function App (){

  const [scanResult, setScanResult] = useState(null);
  useEffect(() =>{
    const scanner = new Html5QrcodeScanner('reader',
      {qrbox: {
        width:250,
        height:250,
      },
      fps: 5,
      }, 
      false)
  
      scanner.render(success, error);
  
      function success(result) {
        scanner.clear();
        setScanResult(result);
  
      }
      function error(){
        console.warn(err);
      }

  })

  return(
    <>
      <div className = "App">
        <div id = "reader">

        </div>
      </div>
    </>
  )
}

export default App;