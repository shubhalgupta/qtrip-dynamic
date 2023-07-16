import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
   let userReservations = await fetch(config.backendEndpoint + `/reservations`);
   let reserveData = await userReservations.json();
   return reserveData;
  }
  catch(error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  console.log(reservations);
  if(reservations.length > 0 ) {
    document.getElementById("no-reservation-banner").style.display = "none" ;
    document.getElementById("reservation-table-parent").style.display = "block" ;
  }
  else {
    document.getElementById("no-reservation-banner").style.display = "block" ;
    document.getElementById("reservation-table-parent").style.display = "none" ;
  }
  reservations.forEach((key) => {
    const options = {

      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    let reservationTable = document.getElementById("reservation-table");
    let tabletr = document.createElement("tr");

    const date = new Date(key.date);
    const formattedDate = date.toLocaleDateString("en-IN");


    const time = new Date(key.time);
    const formattedTime = time.toLocaleDateString("en-IN", options).replace(' at ', ', ');//console.log(part)
    tabletr.innerHTML = `<td>${key.id}</td>
    <td>${key.name}</td>
    <td>${key.adventureName}</td>
    <td>${key.person}</td>
    <td>${formattedDate}</td>
    <td>${key.price}</td>
    <td>${formattedTime}</td>
    <td id=${key.id}><a class="reservation-visit-button" type="button" href="../detail/?adventure=${key.adventure}">Visit Adventure</a></td>`
    reservationTable.append(tabletr);
  });   
}

export { fetchReservations, addReservationToTable };