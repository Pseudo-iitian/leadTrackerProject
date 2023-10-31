let myLead = []
// let myLead = ["https://www.google.com/", "www.epiclead.com", "www.greatlead.com"]
// myLead = JSON.parse(myLead) // parese into array
// myLead.push("https://monkeytype.com")
// myLead = JSON.stringify(myLead)
// console.log(typeof myLead)

const button = document.getElementById('input-btn')
const input = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
const deleteButton = document.getElementById("delete-btn")
const saveTabButton = document.getElementById('tab-btn')

if (leadsFromLocalStorage) {
  myLead = leadsFromLocalStorage
  renderLeads(myLead)
}

saveTabButton.addEventListener("click", function () {
  // save the url
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let content = tabs[0].url
    if (content != "" && !(myLead[myLead.length - 1] === content)) {
      myLead.push(content);
      localStorage.setItem("myLead", JSON.stringify(myLead))
      renderLeads(myLead)
    }
  });
});

function renderLeads(leads) {
  let listItem = ""
  for (let i = 0; i < leads.length; ++i) {
    listItem += `
    <li>
      <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
      </a>
    </li>
    `
  }
  ulEl.innerHTML = listItem
}
// localStorage.setItem("myLead","www.google.com")
// console.log(localStorage.getItem("myLead"))

// Note********************
// let names = []
//json.stringify() and json.parse()
// localStorage.setItem("names",JSON.stringify(names))
// var storedNames = JSON.parse(localStorage.getItem("names"))
// null -> how you as a developer signalize emptiness
// undefined -> how JavaScript signalizes emptiness

button.addEventListener("click", function () {
  let content = input.value
  if (content != "" && !(myLead[myLead.length - 1] === content)) {
    // clear out the input field
    myLead.push(content);
    // empty the input field
    input.value = ""
    // pushing the input.value into mylead array  
    localStorage.setItem("myLead", JSON.stringify(myLead))
    renderLeads(myLead)
  }
});

deleteButton.addEventListener("click", function () {
  localStorage.clear()
  myLead = []
  renderLeads(myLead)
})
// create element
// const li = document.createElement("li");
// set text content
// li.textContent = myLead[i];
// append to ul 
// ulEl.append(li);



