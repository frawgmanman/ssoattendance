//import Html5QrcodePlugin from '../components/Html5QrcodePlugin.js';
'use client';

import { Html5QrcodeScanner } from "html5-qrcode";
import {useEffect,useState,useRef} from "react";
import DateSelector from '../components/DateSelect.js';


function App (){
  const [yearMonthDay, setYearMonthDay] = useState("20250101"); // initial value
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);
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
      scannerRef.current = scanner;
  
      scanner.render(success, error);
  
      function success(result) {
        scanner.pause();
        //console.log(yearMonthDay);
        setScanResult(result);
        const formData = new FormData();
        formData.append('date', yearMonthDay); //you might need to turn this into an int(?) also append might need to get put somewhere where it updates when states update
        formData.append('student-id', scanResult);
        fetch(scriptURL, {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          alert('QR Code submitted successfully!');
      
        })
        .catch(error => {
          console.error('Error!', error.message);
          alert('Submission failed. Try again.');
        });
        
      }
      function error(){
        console.warn(err);
      }


  })
  const buttonClick = () => {
    if (scannerRef.current) {
      scannerRef.current.resume();
    }
  };
  return(
    <>
      <div className = "App">
        <DateSelector setYearMonthDay={setYearMonthDay}/>
        <div id = "reader"></div>
        <p>{scanResult}</p>
        <p>Selected Date: {yearMonthDay}</p>
        <button onClick={buttonClick}>Scan Again</button>
      </div>
    </>
  )
}

export default App;