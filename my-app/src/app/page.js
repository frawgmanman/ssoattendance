'use client';

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import DateSelector from '../components/DateSelect.js';

function App() {
  const [yearMonthDay, setYearMonthDay] = useState("20250101");
  const [scanResult, setScanResult] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [studentName, setStudentName] = useState(false);

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

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        setScanResult(result);
        alert('QR Code submitted successfully!');
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert('Submission failed. Try again.');
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
  };

  return (
    <div className="App">
      <DateSelector setYearMonthDay={setYearMonthDay} />
      {scannerVisible && <div id="reader" />}
      <p>{scanResult}</p>
      <p>Selected Date: {yearMonthDay}</p>
      {buttonVisible && <button onClick={buttonClick} id = "button">Scan Again</button>}
      {/*<button onClick={buttonClick}>Scan Again</button>*/}
    </div>
  );
}

export default App;
