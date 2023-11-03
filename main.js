const students = [
  {
    id: 1,
    name: "Harry Potter",
    house: "Gryffindor",
    imageUrl: ""
  },
  {
    id: 2,
    name: "Draco Malfoy",
    house: "Slytherin",
    imageUrl: ""
  },
  {
    id: 3,
    name: "Cedric Diggery",
    house: "Hufflepuff",
    imageUrl: ""
  },
  {
    id: 4,
    name: "Cho Chang",
    house: "Ravenclaw",
    imageUrl: ""
  },
  {
    id: 5,
    name: "Neville Longbottom",
    house: "Gryffindor",
    imageUrl:""
  },
  {
    id: 6,
    name: "Luna Lovegood",
    house: "Ravenclaw",
    imageUrl:""
  }
]

const expelledStudents = []

const app = document.querySelector("#app")
const hiddenApp = document.querySelector("#hiddenApp")
const houseButtons = document.querySelector("#house-buttons")
const form = document.querySelector("form")

document.querySelector("#show").style.display="block"
function sortFirst() {
  document.querySelector("#sort").style.display = "";
}

const renderToDom = (array) => {
  const studentsDomString = students.map(student => {
    return `<div class="card mb-3" style="max-width: 540px;">
    <div class="col-md-4">
    <div class="${student.house}" class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${student.house}</h6>
    <a href="#" class="btn btn-danger" id="expel--${student.id}">Expel</a>
        </div>
      </div>
    </div>
  </div>`
})
  app.innerHTML = studentsDomString
}


app.addEventListener("click", (event) => {
  if(event.target.id.includes("expel")){

    const [, id] = event.target.id.split("--")

    const index = students.findIndex(student => student.id === Number(id))

    students.splice(index, 1)

    renderToDom(students)

    expelledStudents.push(...students.splice(index, 1))
    
    renderToDarkDom(expelledStudents) 
  }
})


const renderToDarkDom = (array) => {
 const expelledStudentsDomString = expelledStudents.map(expelledStudent => {
  return `<div>
  <div class="card" style="width: 18rem;">
  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/DeathEaters.jpg/340px-DeathEaters.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">And so <b>${expelledStudent.name}</b> was lost to the temptations of the dark</p>
  </div>
</div>
  </div>`
})
  hiddenApp.innerHTML = expelledStudentsDomString
}



const filter = (house) => {
  const houseArray = []
  
  students.filter(house => {
    if (students.house === house) {
      houseArray.push(house)
    }
  })
 renderToDom(houseArray)
}


houseButtons.addEventListener("click", (event) => {
  const id = event.target.id
  const possibleHouses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"]

  if(id === "All"){
    renderToDom(students)
    } else if (possibleHouses.includes(id)){
      filter(id)
    }
})

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const randomHouse = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"]

  const newStudent ={
    id: students.length + 1,
    name: document.querySelector("#studentName").value,
    house: randomHouse[Math.floor(Math.random() * randomHouse.length)],
  }
  students.push(newStudent)
  renderToDom(students)
  form.reset()
})
