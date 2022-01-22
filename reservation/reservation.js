
// responsive
const menuBtn = document.querySelector('.menu-btn')
const navlinks = document.querySelector('.nav-links')

menuBtn.addEventListener('click',()=>{
  navlinks.classList.toggle('mobile-menu')
})




// select
const vehiclesType = document.querySelector("#vehicle");
const form = document.querySelector("form");
const formDiv = form.querySelector("#content");
const main = document.querySelector("main");
const nmbrDays = document.querySelector("#day");


// global let
let vehicleType = "";
let carburantType = "";
let boxVitssType = "";



//  creation result popup
const popup = document.createElement("div");
popup.classList.add("popup");




// creation boite vitesse
const boxVitss = document.createElement("div")
const boxVitssSpan = document.createElement("span")
boxVitssSpan.innerText = "Boite à vitesse"
boxVitss.appendChild(boxVitssSpan);
const boxVitssData = document.createElement("span");
boxVitssData.classList.add("data");



// type de boite à vitesse
const vehiclesBoxVitss = {
  motorcycle: "aucun",
  citadine: "manuelle",
  compact: "manuelle",
  berline: "automatique",
  utility: "manuelle",
  contructionMachine: "manuelle",
  truck: "automatique",
}


// Bonus of type of carburant
const vehicleBonus = {
  automatique: 19,
  electrique: 5,
  hybride: 9,
  essence: 14,
  diesel: 21,
}


const vehiclesPrix = {
  motorcycle: 10,
  citadine: 12,
  compact: 14,
  berline: 20,
  utility: 16,
  contructionMachine: 900,
  truck: 250,
}

const carbrtTypes = {
  motorcycle: ["electrique", "essence"],
  citadine: ["electrique", "hybride", "essence", "diesel"],
  compact: ["hybride", "essence", "diesel"],
  berline: ["hybride", "essence", "diesel"],
  utility: ["diesel"],
  contructionMachine: ["essence", "diesel"],
  truck: ["diesel"],
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
  const boxVitssPercentage = (vehicleBonus[boxVitssType] || 0) / 100;
  const carburantPercentage = (vehicleBonus[carburantType] || 0) / 100;
  const nmbrOfDays = nmbrDays.value
  const vehiclePrix = vehiclesPrix[vehicleType]

  let prix = vehiclePrix + (vehiclePrix * boxVitssPercentage) + (vehiclePrix * carburantPercentage)
  prix = prix * nmbrOfDays;
  createResultPopup(nmbrOfDays, prix, carburantPercentage, boxVitssPercentage);
})



// creation de carburant
const carburantLabel = document.createElement("label");
const carburantSpan = document.createElement("span")
carburantSpan.innerText = "Carburant Type";
carburantLabel.appendChild(carburantSpan)
const carburantTypesSelect = document.createElement("select");
carburantLabel.appendChild(carburantTypesSelect)
carburantTypesSelect.classList.add("case")


carburantTypesSelect.addEventListener("change", () => {
  carburantType = carburantTypesSelect.value;
})






function createCarburant() {
  carburantTypesSelect.innerHTML = "";
  const carbrtType = carbrtTypes[vehicleType]

  const options = carbrtType.map(function (v) {
    return `<option value="${v}">${v}</option>`
  })
  carburantType = carbrtType[0];
  carburantTypesSelect.innerHTML = options.join("")


  if (!formDiv.contains(carburantLabel)) {
    formDiv.appendChild(carburantLabel)
  };
}




function createBoxVitss() {
  const typeBoxVitss = vehiclesBoxVitss[vehicleType];
  boxVitssData.innerText = typeBoxVitss;
  boxVitssType = typeBoxVitss;
  if (!formDiv.contains(boxVitss)) {
    formDiv.appendChild(boxVitss);
    boxVitss.appendChild(boxVitssData)
  }
}

const handleSelectChange = () => {
    vehicleType = vehiclesType.value
    createCarburant();
    createBoxVitss();
  };
  handleSelectChange();
  vehiclesType.addEventListener("change", handleSelectChange)

const btn = document.createElement("button")
btn.classList.add("btn")
btn.innerText = "close"
btn.addEventListener("click", () => {
  popup.remove()
})


function createResultPopup(nombreDeJour, prix, carbPercentage, bvPercentage) {

  popup.innerHTML = `
    <p>Your Vehicle Reserved</p>
    <p>Vehicle Type: ${vehicleType}</p>
    <p>Type boite à vitesse: ${boxVitssType} (${bvPercentage * 100}%)</p>
    <p>Carburant Type: ${carburantType} (${carbPercentage * 100}%)</p>
    <p>Price: ${prix}£ for ${nombreDeJour} days</p>
    `

  popup.prepend(btn);
  main.appendChild(popup)


}