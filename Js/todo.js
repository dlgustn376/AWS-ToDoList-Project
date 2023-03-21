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
          TodoService.getInstance().todoList.splice(index, 1);
          TodoService.getInstance().updateLocalStorage();
          TodoService.getInstance().loadTodoList();
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

    if (!addToggleButton) return;

    addToggleButton.onclick = () =>{
      TodoService.getInstance().addTodo();
      const toggleInput = document.querySelector(".toggle-input");
      toggleInput.value = "";
    }
  }



  addEventAddToggleClick() {
    const addToggleButtons = document.querySelectorAll(".add-toggle-button");
  
    addToggleButtons.forEach((addToggleButton, index) => {
      addToggleButton.onclick = () => {
        const toggleInput = document.querySelectorAll(".toggle-input")[index];
        // 다시 불러와서 toggle-content가 닫히는 현상.
        if (toggleInput.value.trim() === ""){
          return;
        } 
        TodoService.getInstance().addToggleContent(index, toggleInput.value);
        toggleInput.value = "";
      };
    });
  }

  // addEventModifyClick(){

  // }

  

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
  
  addToggleContent(todoIndex, toggleContent) {
    if (!this.todoList[todoIndex]) return;
    this.todoList[todoIndex].toggleContents.push(toggleContent);
    this.updateLocalStorage();
  }

  addTodo() {
    const todoInput = document.querySelector(".todo-input");
    
    if (!todoInput.value) {
      return;
    }
    
    const toggleInput = document.querySelector(".toggle-input");
    const toggleContents = toggleInput ? [toggleInput.value] : [""];
    const todoObj = {
      todoContent: todoInput.value,
      toggleContents: toggleContents
    };

  
    this.todoList.push(todoObj);
    this.updateLocalStorage();
  }
  

  loadTodoList() {
    const todoContentList = document.querySelector(".todo-content-list");
  
    let todoContentListHtml = "";
  
    this.todoList.forEach((todoObj) => {
      const toggleContents = todoObj.toggleContents || [];
  
      let toggleContentsHtml = "";
      
      toggleContents.forEach((toggleContent, index) => {
        toggleContentsHtml += `
          <div class="toggle-content-main">
            <input type="checkbox" class="checkbox-input checkbox-hidden">
            <label for="toggle-input" class="c${index + 1}">${toggleContent}</label>
          </div>
        `;
      });
  
      todoContentListHtml += `
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
              ${toggleContentsHtml}
              <div class="toggle-content-footer">
                <button type="button" class="modify-button m-button"><i class="fa-solid fa-pen-to-square"></i></button>
              </div>
            </div>
          </div>
        </li>
      `;
    });
    todoContentList.innerHTML = todoContentListHtml;

    TodoEvent.getInstance().addEventToggleClick();
    TodoEvent.getInstance().addEventAddToggleClick();
    TodoEvent.getInstance().addEventRemoveTodoClick();

  }
  
}