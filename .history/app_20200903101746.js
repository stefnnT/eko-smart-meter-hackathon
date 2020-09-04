const child = (details, index) => `<div class="row navbar-default form-row">
            <div class="col-md-12">
                    <table class="table" style="margin-bottom: 0;">
                        <thead>
                            <tr>
                                <td class="text-center" style="width:5%">${index}</td>
                                <td class="text-center" style="width:15%">${details[0].meterDetails.meterNumber}</td>
                                <td class="text-center" style="width:10%">
                                  <span class="label ${details[0].meterDetails.lastDeviceStatus.mainsIn === 'on' ? 'label-success' : 'label-warning'}">
                                    ${details[0].meterDetails.lastDeviceStatus.mainsIn === 'on' ? 'on' : 'off'}
                                  </span>
                                </td>
                                <td class="text-center" style="width:10%">
                                  <span class="label ${details[0].meterDetails.lastDeviceStatus.mainsOut === 'on' ? 'label-success' : 'label-warning'}">
                                    ${details[0].meterDetails.lastDeviceStatus.mainsOut === 'on' ? 'on' : 'off'}
                                  </span>
                                </td>
                                <td class="text-center" style="width:12.5%">${details[0].meterDetails.lastDeviceStatus.unitLeft}</td>
                                <td class="text-center" style="width:12.5%">${details[0].meterDetails.lastDeviceStatus.currentConsumption}</td>
                                <!-- <td class="text-center" style="width:5%">198</td> -->
                                <!-- <td class="text-center" style="width:5%">50</td> -->
                                <td class="text-center" style="width:10%">
                                  <span class="label ${details[0].meterDetails.lastDeviceStatus.tamperState === 'normal' ? 'label-info' : 'label-rose'}">
                                    ${details[0].meterDetails.lastDeviceStatus.tamperState === 'normal' ? 'normal' : 'bypassed'}
                                  </span>
                                </td>
                                <!-- <td class="text-center" style="width:5%">50</td> -->
                                <td class="text-center" style="width:10%">10:20 pm</td>
                                <td class="text-center" style="width:5%" id="headingOne">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${index}" aria-expanded="true" aria-controls="collapseOne">
                                        <i class="material-icons">keyboard_arrow_down</i>
                                    </a>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <div id="collapse${index}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" style="border-top: 1px solid red;">
                        <div class="panel-body">
                          <div class="more-details">
                            <div class="details">
                                <div>
                                    <div class="detail-title">User Data</div>
                                </div>
                                <div>
                                    <div class="detail-label">Name:</div>
                                    <div class="detail">${details[0].subscriberBiodata.firstName }</div>
                                </div>
                                <div>
                                    <div class="detail-label">Address:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Phone:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                            </div>
                            <div class="details">
                                <div>
                                    <div class="detail-title">Meter Information</div>
                                </div>
                                <div>
                                    <div class="detail-label">Meter no.:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Tarriff:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Unit cost:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Last recharge:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                            </div>
                            <div class="details">
                                <div>
                                    <div class="detail-title">Technical Details</div>
                                </div>
                                <div>
                                    <div class="detail-label">Voltage:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Frequency:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Temprature:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Potential loss:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                            </div>
                            <div class="details">
                                <div>
                                    <div class="detail-title">Consumption History</div>
                                </div>
                                <div>
                                    <div class="detail-label">Today:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Last 7 days:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                                <div>
                                    <div class="detail-label">Last 30 days:</div>
                                    <div class="detail">Adegun Adeogun</div>
                                </div>
                            </div>
                        </div>
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
      e.innerHTML = child( result.customers, 1 );

      document.querySelector('#table').appendChild(e);
      
    }
  };


  xhr.onerror = function() {
    alert("Request failed");
  };
}

init();