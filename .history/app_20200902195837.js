const init = _ => {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'http://localhost/smart-meter/routes/disco/get_customers/');

  xhr.responseType = 'json';

  xhr.send();
  
  
  xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      let result = xhr.response;
      console.log(result);

      alert(`Done, got ${xhr.response.length} bytes`); // response is the server
    }
  };


  xhr.onerror = function() {
    alert("Request failed");
  };
}

init();