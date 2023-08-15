const itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : []

document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (
    event.keyCode === 13 &&
    document.querySelector('.new-todo').value.length > 0
  ) {
    const item = document.querySelector('.new-todo')
    createItem(item)
  }
})

function displayItems() {
  let items = ''
  for (let i = 0; i < itemsArray.length; i++) {
    items += `    <div class="item">
                    <div class="input-controller">
                      <input class="toggle" type="checkbox" id="check_${i}" ${
      itemsArray[i].checked ? 'checked' : ''
    } />
                      <textarea disabled>${itemsArray[i].thing}</textarea>
                      <div class="edit-controller">
                        <div>
                          Prioridad
                          <select id="priority">
                            <option ${
                              itemsArray[i].priority === 'Alta'
                                ? 'selected'
                                : ''
                            }>Alta</option>
                            <option ${
                              itemsArray[i].priority === 'Media'
                                ? 'selected'
                                : ''
                            }>Media</option> 
                            <option ${
                              itemsArray[i].priority === 'Baja'
                                ? 'selected'
                                : ''
                            }>Baja</option> 
                          </select>
                        </div>
                        <div>
                          Categorías
                          <select id="category">
                              <option ${
                                itemsArray[i].category === 'Casa'
                                  ? 'selected'
                                  : ''
                              }>Casa</option> 
                              <option ${
                                itemsArray[i].category === 'Trabajo'
                                  ? 'selected'
                                  : ''
                              }>Trabajo</option> 
                              <option ${
                                itemsArray[i].category === 'Emprendimiento'
                                  ? 'selected'
                                  : ''
                              }>Emprendimiento</option> 
                            </select>
                        </div>
                        <i class="fa-solid fa-pen-to-square editBtn"></i>
                        <i class="fa-solid fa-x deleteBtn"></i>
                      </div>
                    </div>
                    <div class="update-controller">
                    <button class="saveBtn">Save</button>
                     <button class="cancelBtn">Cancel</button>
                    </div>
                  </div>`
  }
  document.querySelector('.todo-list').innerHTML = items
  activateCheckboxListeners()
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

function displayFooter() {
  let page = `      
     
      <footer class="footer">
       
        <span class="todo-count"><strong>${countPend()}</strong> pendiente(s)</span>
        
        <ul class="filters">
          <li>
            <a onclick="showAll() "class="selected filtro" href="#/">Todos</a>
          </li>
          <li>
            <a onclick="showPend()" class="filtro" href="#/active">Pendientes</a>
          </li>
          <li>
            <a onclick="showComp()" class="filtro" href="#/completed">Completados</a>
          </li>
        </ul>
        <button onclick="borrarCompletados()" id="clear-completed" class="clear-completed">Borrar completados</button>
      </footer>
    `
  document.querySelector('.footer').innerHTML = page
}

function activateCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.toggle')
  checkboxes.forEach((ch, i) => {
    ch.addEventListener('click', () => {
      itemsArray[i].checked = ch.checked
      localStorage.setItem('items', JSON.stringify(itemsArray))
    })
  })
}
//D

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll('.deleteBtn')
  deleteBtn.forEach((db, i) => {
    db.addEventListener('click', () => {
      deleteItem(i)
    })
  })
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll('.editBtn')
  const updateController = document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
  const prioritySelects = document.querySelectorAll(
    '.edit-controller select'
  )[0]
  const categorySelects = document.querySelectorAll(
    '.edit-controller select'
  )[1]

  editBtn.forEach((eb, i) => {
    eb.addEventListener('click', () => {
      updateController[i].style.display = 'block'
      inputs[i].disabled = false

      prioritySelects.value = itemsArray[i].priority
      categorySelects.value = itemsArray[i].category
    })
  })

  const selectP = document.querySelectorAll('#priority')
  selectP.forEach((s, i) => {
    s.addEventListener('change', (event) => {
      itemsArray[i].priority = event.target.value
      localStorage.setItem('items', JSON.stringify(itemsArray))
    })
  })

  const selectC = document.querySelectorAll('#category')
  selectC.forEach((s, i) => {
    s.addEventListener('change', (event) => {
      itemsArray[i].category = event.target.value
      localStorage.setItem('items', JSON.stringify(itemsArray))
    })
  })
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll('.saveBtn')
  const inputs = document.querySelectorAll('.input-controller textarea')
  saveBtn.forEach((sB, i) => {
    sB.addEventListener('click', () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll('.cancelBtn')
  const updateController = document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener('click', () => {
      updateController[i].style.display = 'none'
      inputs[i].disabled = true
      inputs[i].style.border = 'none'
    })
  })
}

function updateItem(text, i) {
  itemsArray[i].thing = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function deleteItem(i) {
  itemsArray.splice(i, 1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function createItem(item) {
  const newItem = {
    thing: item.value,
    checked: false,
    disabled: true,
    priority: 'Alta',
    category: 'Casa',
  }
  itemsArray.push(newItem)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function countPend() {
  let num = itemsArray.length
  localStorage.setItem('items', JSON.stringify(itemsArray))
  return num
}

function showPend() {
  const pendientes = document.querySelectorAll('.input-controller')
  pendientes.forEach((element) => {
    const check = element.querySelector('.toggle')
    if (check.checked) {
      element.style.display = 'none'
    }
    if (!check.checked) {
      element.style.display = ''
    }
  })
  localStorage.setItem('items', JSON.stringify(itemsArray))
}

function showComp() {
  const completados = document.querySelectorAll('.input-controller')
  completados.forEach((element) => {
    const check = element.querySelector('.toggle')
    if (!check.checked) {
      element.style.display = 'none'
    }
    if (check.checked) {
      element.style.display = ''
    }
  })
  localStorage.setItem('items', JSON.stringify(itemsArray))
}

function showAll() {
  const all = document.querySelectorAll('.input-controller')
  all.forEach((element) => {
    const check = element.querySelector('.toggle')
    element.style.display = ''
  })
  localStorage.setItem('items', JSON.stringify(itemsArray))
}

function borrarCompletados() {
  const completedTasks = itemsArray.filter((item) => item.checked === false)

  localStorage.setItem('items', JSON.stringify(completedTasks))
  location.reload()
}

displayItems()
displayFooter()
