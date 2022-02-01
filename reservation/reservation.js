
// responsive
const menuBtn = document.querySelector('.menu-btn')
const navlinks = document.querySelector('.nav-links')

menuBtn.addEventListener('click',()=>{
  navlinks.classList.toggle('mobile-menu')
})



// select
const main = document.querySelector("main");
const form = document.querySelector("form");
const vehiclesType = document.querySelector("#vehicle");
const carburantDiv = form.querySelector("#carburantType");
const gearBoxDiv = form.querySelector("#gearBox");
const nmbrDays = document.querySelector("#day");



// declaration global let
let vehicleType = "";
let carburantType = "";
let boxVitssType = "";



// speed box type
const vehiclesBoxVitss = {
  motorcycle: "aucun",
  citadine: "manuelle",
  compact: "manuelle",
  berline: "automatique",
  utility: "manuelle",
  contructionMachine: "manuelle",
  truck: "automatique",
}



// Bonus
const vehicleBonus = {
  automatique: 19,
  electrique: 5,
  hybride: 9,
  essence: 14,
  diesel: 21,
}



// price
const vehiclesPrix = {
  motorcycle: 10,
  citadine: 12,
  compact: 14,
  berline: 20,
  utility: 16,
  contructionMachine: 900,
  truck: 250,
}



// carburant type
const carbrtTypes = {
  motorcycle: ["electrique", "essence"],
  citadine: ["electrique", "hybride", "essence", "diesel"],
  compact: ["hybride", "essence", "diesel"],
  berline: ["hybride", "essence", "diesel"],
  utility: ["diesel"],
  contructionMachine: ["essence", "diesel"],
  truck: ["diesel"],
}


// creation div of gear box
const boxVitss = document.createElement("div")
const boxVitssSpan = document.createElement("span")
boxVitssSpan.innerText = "Gear box"
boxVitss.appendChild(boxVitssSpan);
const boxVitssData = document.createElement("span");
boxVitss.appendChild(boxVitssData);
boxVitssData.classList.add("data");



// creation select of carburant type
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


  if (!carburantDiv.contains(carburantLabel)) {
    carburantDiv.appendChild(carburantLabel)
  };
}




function createBoxVitss() {
  const typeBoxVitss = vehiclesBoxVitss[vehicleType];
  boxVitssData.innerText = typeBoxVitss;
  boxVitssType = typeBoxVitss;
  if (!gearBoxDiv.contains(boxVitss)) {
    gearBoxDiv.appendChild(boxVitss);
  }
}

const handleSelectChange = () => {
    vehicleType = vehiclesType.value
    createCarburant();
    createBoxVitss();
  };
  handleSelectChange();
  vehiclesType.addEventListener("change", handleSelectChange)





//  creation result popup
const popup = document.createElement("div");
popup.classList.add("popup");


const overlay = document.createElement("div");
overlay.classList.add("overlay");



const btn = document.createElement("button")
btn.classList.add("btn")
btn.innerText = "close"
btn.addEventListener("click", () => {
  popup.remove()
  overlay.remove()
})



function createResultPopup(nombreDeJour, prix, carbPercentage, bvPercentage) {

  popup.innerHTML = `
    <p>Your Vehicle Reserved</p>
    <p>Vehicle Type: ${vehicleType}</p>
    <p>Type boite à vitesse: ${boxVitssType} (+${bvPercentage * 100}%)</p>
    <p>Carburant Type: ${carburantType} (+${carbPercentage * 100}%)</p>
    <p>Price: ${prix}£ for ${nombreDeJour} days</p>
    `

  popup.prepend(btn);
  main.appendChild(popup)
  main.appendChild(overlay)

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