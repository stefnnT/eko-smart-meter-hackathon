const mains = document.querySelector('#toggle_mains');

const updataDeviceCommand = _ => {
  let xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://localhost/smart-meter/routes/user/meter_state/');

  xhr.responseType = 'json';

  xhr.send();
  
  
  xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      let result = xhr.response;
      // console.log(result);

      let e = document.createElement('div');
      e.innerHTML = child( result.customers, 1 );

      document.querySelector('#table').appendChild(e);
      
    }
  };


  xhr.onerror = function() {
    alert("Request failed");
  };
}

const init = _ => {
  let xhr = new XMLHttpRequest();

  let json = JSON.stringify({
    meterNumber: "14241794702"
  });

  xhr.open('POST', 'http://localhost/smart-meter/routes/disco/get_customer/');

  xhr.responseType = 'json';

  xhr.send(json);
  
  
  xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      let result = xhr.response;
      
      const unitsLeft = document.querySelector('#units-left');
      const mainsIn = document.querySelector('#mains-in');
      const mainsOut = document.querySelector('#mains-out');
      const meterNumber = document.querySelector('#meter-number');
      const billingTarriff = document.querySelector('#billing-tarriff');
      const unitPrice = document.querySelector('#unit-price');

      if result.meterDetails.mains
      unitsLeft.textContent = result.meterDetails.unitLeft;
      meterNumber.textContent = result.meterDetails.meterNumber;
      billingTarriff.textContent = result.meterDetails.tarriffCode;
      unitPrice.textContent = result.meterDetails.tarriffUnitPrice;
      
      // alert(result.meterDetails.meterNumber);
      
    }
  };
  
  
  xhr.onerror = function() {
    alert("Request failed");
  };
}

mains.addEventListener('click', updataDeviceCommand);

const refresh = document.querySelector('#refresh');
// refresh.addEventListener('click', init);


init();