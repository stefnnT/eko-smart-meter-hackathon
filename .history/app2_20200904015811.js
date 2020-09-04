const mains = document.querySelector('#toggle_mains');

const updataState = _ => {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'http://localhost/smart-meter/routes/disco/get_customers/');

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

mains.addEventListener('click', function() {
  alert();
})