const child => `<div class="row navbar-default" style="margin-bottom: 10px;">
            <div class="col-md-12">
                    <table class="table" style="margin-bottom: 0;">
                        <thead>
                            <tr>
                                <td class="text-center" style="width:5%">01</td>
                                <td class="text-center" style="width:15%">Qwe1</td>
                                <td class="text-center" style="width:10%"><span class="label label-success">Normal</span></td>
                                <td class="text-center" style="width:10%"><span class="label label-warning">Normal</span></td>
                                <td class="text-center" style="width:12.5%">25</td>
                                <td class="text-center" style="width:12.5%">2</td>
                                <!-- <td class="text-center" style="width:5%">198</td> -->
                                <!-- <td class="text-center" style="width:5%">50</td> -->
                                <td class="text-center" style="width:10%"><span class="label label-info">Normal</span></td>
                                <!-- <td class="text-center" style="width:5%">50</td> -->
                                <td class="text-center" style="width:10%">10:20 pm</td>
                                <td class="text-center" style="width:5%" id="headingOne">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <i class="material-icons">keyboard_arrow_down</i>
                                    </a>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" style="border-top: 1px solid red;">
                        <div class="panel-body">
                          Add more details here...
                        </div>
                    </div>
            </div>
        </div>`

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
      // console.log(result);

      let e = document.createElement('div');
      e.innerHTML = child

      document.querySelector('#table').appendChild(e);
      
    }
  };


  xhr.onerror = function() {
    alert("Request failed");
  };
}

init();