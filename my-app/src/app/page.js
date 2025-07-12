//import Html5QrcodePlugin from '../components/Html5QrcodePlugin.js';
'use client';

import { Html5QrcodeScanner } from "html5-qrcode";
import {useEffect,useState} from "react";
import DateSelector from '../components/DateSelect.js';


function App (){
  const [yearMonthDay, setYearMonthDay] = useState("01012025"); // initial value
  const [scanResult, setScanResult] = useState(null);
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyUdOpiQ8ss-wI2VuN8finY89AHmd4b6lKdR5LUGi2efwkrPlWoYkGF2yjDUmjuWwfJUQ/exec';
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
        console.log(yearMonthDay);
        setScanResult(result);
        
      }
      function error(){
        console.warn(err);
      }

  })

  return(
    <>
      <div className = "App">
        <DateSelector setYearMonthDay={setYearMonthDay}/>
        <div id = "reader"></div>
        <p>{scanResult}</p>
        <p>Selected Date: {yearMonthDay}</p>
      </div>
    </>
  )
}

export default App;