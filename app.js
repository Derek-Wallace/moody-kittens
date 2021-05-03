/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5,
    hide: ""
  }
  kittens.push(kitten)
  form.reset()
  saveKittens()
  }

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens()
  let template=""
  kittens.forEach(kitten => { 
  template +=`
  <div class="card">
          <p id="img" class="kitten ${kitten.mood} img">
            <img src="https://robohash.org/
            ${kitten.name}
            ?set=set4">
          </p>
          <h2 class="text-center">${kitten.name}</h2>
          <p class="d-flex">Mood: ${kitten.mood}</p>
          <p class="d-flex">Affection: ${kitten.affection}</p>
          <button id="buttons" class="${kitten.hide}" type="button" onclick="pet('${kitten.id}')">Pet</button>
          <button id="buttons"class="${kitten.hide}" type="button" onclick="feed('${kitten.id}')">Feed</button>
          <button type="button" class="btn-cancel" onclick="removeKitten('${kitten.id}')">Release</button>
        </div>
  `
  })
  document.getElementById("kittens").innerHTML = template
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
return kittens.find(kitten => kitten.id === id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = kittens.find(kitten => kitten.id === id);
  let love = Math.random()
  if (love > .7){
    kitten.affection++;
  }
  else {kitten.affection--;}
  setKittenMood(kitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function feed(id) {
  let kitten = kittens.find(kitten => kitten.id === id);
  kitten.mood="Tolerant"
  kitten.affection="5"
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 6){
    kitten.mood="Happy";
    document.getElementById("img").classList.replace("Tolerant", "Happy")
  }
  if (kitten.affection <= 5){
    kitten.mood = "Tolerant"
    document.getElementById("img").classList.replace("Happy", "Tolerant")
    document.getElementById("img").classList.replace("Angry", "Tolerant")
  }
  if (kitten.affection <= 3){
    kitten.mood = "Angry"
    document.getElementById("img").classList.replace("Tolerant", "Angry")
  }
  if (kitten.affection <= 0){
    kitten.mood="Gone"
    kitten.hide ="hidden"
    document.getElementById("img").classList.replace("Angry", "Gone");
  }
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
  document.getElementById("kittens").classList.remove("hidden");
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function removeKitten(id){
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1) {
    throw new Error("Invalid Kitten")
  }
  kittens.splice(index, 1)
  saveKittens()
}