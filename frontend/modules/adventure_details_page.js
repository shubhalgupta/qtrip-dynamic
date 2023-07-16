import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let urlSearch = new URLSearchParams(search);
  let adventureId = urlSearch.get("adventure");
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let detailUrl = await fetch(
      config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}` 
    );
    let adventureDetails = await  detailUrl.json();
    return adventureDetails;
  }
  catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let costHead = document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  let heading =  document.getElementById("adventure-name").textContent = adventure.name;
  let subtitle =  document.getElementById("adventure-subtitle").textContent = adventure.subtitle ;
  let slide = document.getElementById("photo-gallery");
  slide.innerHTML = "";
  adventure.images.forEach((imageurl) => {
    let imageSection = document.createElement("div");
    imageSection.setAttribute("id","carouselExampleCaptions");
    let imageElement = document.createElement("img");
    imageElement.classList.add("activity-card-image");
    imageElement.src = imageurl ;
    imageSection.append(imageElement);
    slide.appendChild(imageSection);
  });
  let description = document.getElementById("adventure-content").textContent = adventure.content ;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
 //console.log(images);
  let slider = document.getElementById("photo-gallery").innerHTML=`
 <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
//console.log(images);
let carouselInner = document.getElementsByClassName("carousel-inner")[0];
images.forEach((url,index) => {
let carouselItem = document.createElement("div");
carouselItem.classList.add("carousel-item");
if(index === 0) {
  carouselItem.classList.add("active");
}
let sildeimage = document.createElement("img");
sildeimage.src = url;
sildeimage.classList.add("d-block","w-100");
carouselItem.appendChild(sildeimage);
carouselInner.appendChild(carouselItem);
});

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
   console.log(adventure);
   if(adventure.available === true) {
    document.getElementById("reservation-panel-sold-out").style.display = "none" ;
    document.getElementById("reservation-panel-available").style.display = "block" ;
    const reservecost = document.getElementById("reservation-person-cost");
    reservecost.innerHTML = adventure.costPerHead ;
   }
   else {
    document.getElementById("reservation-panel-sold-out").style.display = "block" ;
    document.getElementById("reservation-panel-available").style.display = "none" ;
   }
}

//Implementation of reservation cost calculation based on persons

function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead = adventure.costPerHead;
  let totalCost =  (persons * costPerHead );
  document.getElementById("reservation-cost").textContent =  totalCost;
  //document.getElementById("person").addEventListener("keyup",onPersonsChange);
}
//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const formData = document.getElementById("myForm");
  formData.addEventListener('submit',async(event) => {
    event.preventDefault();
    const name = formData.elements['name'].value;
    const date = formData.elements['date'].value;
    const person = formData.elements['person'].value ;
    const data = {
      name: name,
      date: date,
      person : person,
      adventure : adventure.id
    };
    const options  = {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body : JSON.stringify(data),
    } ;
    const url = `${config.backendEndpoint}/reservations/new` ;
    try {
      let reservedata = await fetch(url,options);
      alert("Success!");
      return reservedata ;
    }
    catch(error) {
      alert("failed") ;
    }

  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
 if(adventure.reserved === true) {
  document.getElementById("reserved-banner").style.display = 'block' ;
 }
 else {
  document.getElementById("reserved-banner").style.display = 'none' ;
 }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
