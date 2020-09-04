const unitsLeft = document.querySelector('#units-left');
const mainsIn = document.querySelector('#mains-in');
const mainsOut = document.querySelector('#mains-out');
const meterNumber = document.querySelector('#meter-number');
const billingTarriff = document.querySelector('#billing-tarriff');
const unitPrice = document.querySelector('#unit-price');
const refresh = document.querySelector('#refresh');
const recharge = document.querySelector('#recharge');
const recharge = document.querySelector('#recharge');
const base = "https://smart-meter-api.herokuapp.com/";

var result;


const updateDeviceCommand = _ => {
  let xhr = new XMLHttpRequest();

  mainsOut.setAttribute('disabled', true);
  // mainsOut.classList.add('disallow');
  mainsOut.style.cursor = "not-allowed"
  setTimeout(_ => {
    mainsOut.removeAttribute('disabled');
    mainsOut.style.cursor = "pointer";
    location.reload();
  }, 4000) //make is 40000


  let json = JSON.stringify({
    meterNumber: "14241794702",
    state: localStorage.getItem('state') === 6 ? 5 : 6
  });

  xhr.open('POST', 'http://localhost/smart-meter/routes/user/meter_state/');

  xhr.responseType = 'json';

  xhr.send(json);
  
  
  xhr.onload = function() {
    if (xhr.status == 200) { // analyze HTTP status of the response
      let time = new Date();
      localStorage.setItem('tempState', localStorage.getItem('state') === 6 ? 5 : 6);
      localStorage.setItem('time', time.getTime());
    } else { // show the result
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found

      // let result = xhr.response;
      // console.log(result);

      // let e = document.createElement('div');
      // e.innerHTML = child( result.customers, 1 );

      // document.querySelector('#table').appendChild(e);
      
    }
  };


  xhr.onerror = function() {
    alert("Request failed");
  };
}

const recharge = _ => {
  let xhr = new XMLHttpRequest();

  let json = JSON.stringify({
    meterNumber: "14241794702",
    amount: 1000,
    stateholderId: localStorage.getItem('stakeholderId'),
    tarriff: localStorage.getItem('tarriff')
  });

  xhr.open('POST', 'http://localhost/smart-meter/routes/user/recharge/');

  xhr.responseType = 'json';

  xhr.send(json);
  
  
  xhr.onload = function() {
    if (xhr.status == 200) { 
      result = xhr.response;
      // alert()

      
      if (result.meterDetails.lastDeviceStatus.mainsIn === "on") {
        mainsIn.classList.remove('dashboard__summary-icon--bg-red');
        mainsIn.classList.add('dashboard__summary-icon--bg-green');
      } else {
        mainsIn.classList.remove('dashboard__summary-icon--bg-green');
        mainsIn.classList.add('dashboard__summary-icon--bg-red');
      }
      if (result.meterDetails.lastDeviceStatus.mainsOut === "on") {
        mainsOut.classList.remove('dashboard__summary-icon--bg-red');
        mainsOut.classList.add('dashboard__summary-icon--bg-green');
      } else {
        mainsOut.classList.remove('dashboard__summary-icon--bg-green');
        mainsOut.classList.add('dashboard__summary-icon--bg-red');
      } 
      unitsLeft.textContent = result.meterDetails.lastDeviceStatus.unitLeft;
      meterNumber.textContent = result.meterDetails.meterNumber;
      billingTarriff.textContent = result.meterDetails.tarriffCode.toUpperCase();
      unitPrice.textContent = result.meterDetails.tarriffUnitPrice;
      
      localStorage.setItem('state', result.meterDetails.lastDeviceStatus.mainsOut === 'on' ? 5 : 6);
      localStorage.setItem('stakeholderId', result.stateholderId);
      localStorage.setItem('tarriffPrice', result.meterDetails.tarriffUnitPrice);
      // alert(result.meterDetails.meterNumber);
      
    } else {
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    }
  };

  xhr.onprogress = function(event) {
    recharge.
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
    if (xhr.status == 200) { 
      result = xhr.response;
      // alert()

      
      if (result.meterDetails.lastDeviceStatus.mainsIn === "on") {
        mainsIn.classList.remove('dashboard__summary-icon--bg-red');
        mainsIn.classList.add('dashboard__summary-icon--bg-green');
      } else {
        mainsIn.classList.remove('dashboard__summary-icon--bg-green');
        mainsIn.classList.add('dashboard__summary-icon--bg-red');
      }
      if (result.meterDetails.lastDeviceStatus.mainsOut === "on") {
        mainsOut.classList.remove('dashboard__summary-icon--bg-red');
        mainsOut.classList.add('dashboard__summary-icon--bg-green');
      } else {
        mainsOut.classList.remove('dashboard__summary-icon--bg-green');
        mainsOut.classList.add('dashboard__summary-icon--bg-red');
      } 
      unitsLeft.textContent = result.meterDetails.lastDeviceStatus.unitLeft;
      meterNumber.textContent = result.meterDetails.meterNumber;
      billingTarriff.textContent = result.meterDetails.tarriffCode.toUpperCase();
      unitPrice.textContent = result.meterDetails.tarriffUnitPrice;
      
      localStorage.setItem('state', result.meterDetails.lastDeviceStatus.mainsOut === 'on' ? 5 : 6);
      // alert(result.meterDetails.meterNumber);
      
    } else {
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    }
  };
  
  
  xhr.onerror = function() {
    alert("Request failed");
  };
}

init();

mainsOut.addEventListener('click', updateDeviceCommand);

refresh.addEventListener('click', _ => location.reload());

recharge.addEventListener('click', recharge);