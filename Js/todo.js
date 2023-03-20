class TodoEvent{
  static #instance = null;
  static getInstance() {
      if(this.#instance == null) {
          this.#instance = new TodoEvent();
      }
      return this.#instance;
  }
  addEventAddTodoClick() {
    const addTodoButton = document.querySelector(".add-todo-button");
    addTodoButton.onclick = () => {
        TodoService.getInstance().addTodo();
        const todoInput = document.querySelector(".todo-input");
        todoInput.value = "";
    }
  }

  addEventAddTodoKeyUp() {
    const todoInput = document.querySelector(".content-input .todo-input");
    todoInput.onkeyup = () => {
      if(window.event.keyCode == 13) {
          const addTodoButton = document.querySelector(".add-todo-button");
          addTodoButton.click();
      }
    }
  }

  addEventRemoveTodoClick() {
    const removeButtons = document.querySelectorAll(".content-todo .remove-button");
    removeButtons.forEach((removeButton, index) => {
        removeButton.onclick = () => {
            ModalService.getInstance().showRemoveModal(index);
        }
    }); 
  }

  addEventToggleClick(){
    const toggleButtons = document.querySelectorAll(".toggle-button");
    // const toggleIcon = document.querySelector(".toggle-button.fa-solid");
    
    toggleButtons.forEach((toggleButton, index) =>{
      const toggleContent = document.querySelectorAll(".toggle-content")[index];
      toggleButton.onclick = () =>{
        if (toggleContent.style.display === "none") {
          toggleContent.style.display = "block";
          // toggleIcon.classList.remove("fa-toggle-off");
          // toggleIcon.classList.add("fa-toggle-on");
        } else {
          toggleContent.style.display = "none";
          // toggleIcon.classList.add("fa-toggle-off");
          // toggleIcon.classList.remove("fa-toggle-on");
        }
      }
    });
  }

  addEventAddToggleClick(){
    const addToggleButton = document.querySelector(".add-toggle-button");

    addToggleButton.onclick = () =>{
      const checkboxInput = document.querySelector(".checkbox-input");
      checkboxInput.classList.remove("checkbox-hidden");
    }
  }


}

class TodoService{

  static #instance = null;
  static getInstance() {
      if(this.#instance == null) {
          this.#instance = new TodoService();
      }
      return this.#instance;
  }

  todoList = null;

  constructor(){
    if(localStorage.getItem("todoList") == null){
      this.todoList = new Array();
    }else{
      this.todoList = JSON.parse(localStorage.getItem("todoList"));
    }
    this.loadTodoList();
  }

  updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    this.loadTodoList();
  }
  
  addTodo() {
        const todoInput = document.querySelector(".todo-input");
        const toggleInput = document.querySelector(".toggle-input");
        const todoObj = {
            todoContent: todoInput.value,
            toggleContent : toggleInput.value
        }

        
        this.todoList.push(todoObj);
        this.updateLocalStorage();
  }

  loadTodoList() {
    const todoContentList = document.querySelector(".todo-content-list");
    // todoContentList.innerHTML = ``;

    this.todoList.forEach((todoObj,index) => {
        todoContentList.innerHTML += `
            <li class="content-list-container">
                <div class="content-todo">
                    <button type="button" class="toggle-button"><i class="fa-solid fa-toggle-off"></i></button>
                    <label for="todo-input">${todoObj.todoContent}</label>
                    <button type="button" class="remove-button"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="toggle-content">
                      <div class="toggle-content-container">
                          <div class="toggle-content-header">
                              <input type="text" class="toggle-input" placeholder="세부내용을 입력하시오">
                              <button type="button" class="add-toggle-button"><i class="fa-solid fa-computer-mouse"></i></button>
                          </div>
                          <div class="toggle-content-main">
                              <input type="checkbox" class="checkbox-input checkbox-hidden">
                              <label for="c1">${todoObj.toggleContent}</label>
                          </div>
                          <div class="toggle-content-footer">
                              <button type="button" class="modify-button m-button"><i class="fa-solid fa-pen-to-square"></i></button>
                          </div>
                      </div>
                </div>

            </li>
        `;
    });
    TodoEvent.getInstance().addEventAddToggleClick();
    // TodoEvent.getInstance().addEventModifyTodoClick();
    TodoEvent.getInstance().addEventRemoveTodoClick();

  }
}


/*<!-- 이곳 사이에 innerHTML --> */