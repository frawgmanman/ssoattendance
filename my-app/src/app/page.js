'use client';

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import DateSelector from '../components/DateSelect.js';
import Header from '../components/Header.js';
function App() {
  const [yearMonthDay, setYearMonthDay] = useState("20250101");
  const [scanResult, setScanResult] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [studentName, setStudentName] = useState(false);
  const [erro, setError] = useState(false);
  const [succes, setSuccess] = useState(false);

  const scannerRef = useRef(null);
  const dateRef = useRef(yearMonthDay);
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyUdOpiQ8ss-wI2VuN8finY89AHmd4b6lKdR5LUGi2efwkrPlWoYkGF2yjDUmjuWwfJUQ/exec';

  useEffect(() => {
    dateRef.current = yearMonthDay;
  }, [yearMonthDay]);

  const success = (result) => {

    const formData = new FormData();
    formData.append('date', dateRef.current);
    formData.append('student-id', result);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    //no delays here
    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        setScanResult(result);
        setSuccess(true);
        //it seems to take a while for
      })
      .catch(error => {
        console.error('Error!', error.message);
      });

    if (scannerRef.current) {
      scannerRef.current.clear()
        .then(() => {
          scannerRef.current = null;
          setScannerVisible(false); 
          setButtonVisible(true);
        })
        .catch(err => console.error("Clear failed:", err));
    }
  };

  const error = (err) => {
    console.warn(err);
  };

  // Initialize scanner only when visible
  useEffect(() => {
    if (scannerVisible) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: { width: 250, height: 250 },
        fps: 5
      }, false);

      scannerRef.current = scanner;
      scanner.render(success, error);
    }
  }, [scannerVisible]); // re-initialize when scannerVisible becomes true

  const buttonClick = () => {
    setScannerVisible(true); // trigger re-render and re-init
    setScanResult(null); 
    setButtonVisible(false);
    setSuccess(false);
    setError(false);
  };

  return (
    <div className="App">
      <Header />
      <div className = "p-5">
      <DateSelector setYearMonthDay={setYearMonthDay} />
      {scannerVisible && <div id="reader" />}
      {succes && <p>Scan successful!</p>}
      {erro && <p>Scan failed, please try again</p>}
      <p>{scanResult}</p>
      {/*<p>Selected Date: {yearMonthDay}</p>*/}
      {buttonVisible && <button onClick={buttonClick} id = "button" className = 'bg-red-800 text-white rounded-3xl p-2'>Scan Again</button>}
      {/*<button onClick={buttonClick}>Scan Again</button>*/}
      </div>
    </div>
  );
}

export default App;
