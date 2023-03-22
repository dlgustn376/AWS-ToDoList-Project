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

  addEventToggleClick() {
    const toggleButtons = document.querySelectorAll(".toggle-button");
  
    toggleButtons.forEach((toggleButton, index) => {
      const toggleContent = document.querySelectorAll(".toggle-content")[index];
      toggleButton.onclick = () => {
        const toggleIcon = toggleButton.querySelector("i");
        
        if (toggleContent.style.display === "none") {
          toggleContent.style.display = "block";
          toggleIcon.classList.remove("fa-toggle-off");
          toggleIcon.classList.add("fa-toggle-on");
        } else {
          toggleContent.style.display = "none";
          toggleIcon.classList.add("fa-toggle-off");
          toggleIcon.classList.remove("fa-toggle-on");
        }
      };
    });
  }

  addEventAddToggleClick() {
    const addToggleButtons = document.querySelectorAll(".add-toggle-button");
  
    addToggleButtons.forEach((addToggleButton, index) => {
      addToggleButton.onclick = () => {
        const toggleInput = document.querySelectorAll(".toggle-input")[index];
  
        if (toggleInput.value.trim() === "") {
          return;
        }
  
        const newToggleContent = toggleInput.value;
        const newToggleContentIndex = TodoService.getInstance().todoList[index].toggleContents.length;
  
        TodoService.getInstance().todoList[index].toggleContents.push(newToggleContent);
        localStorage.setItem("todoList", JSON.stringify(TodoService.getInstance().todoList));
  
        const toggleContentMain = document.createElement('div');
        toggleContentMain.className = 'toggle-content-main';
  
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.className = 'checkbox-input checkbox-hidden';
  
        const contentLabel = document.createElement('label');
        contentLabel.htmlFor = 'toggle-input';
        contentLabel.className = `c${newToggleContentIndex + 1}`;
        contentLabel.innerText = newToggleContent;
  
        const modifyButton = document.createElement('button');
        modifyButton.type = 'button';
        modifyButton.className = 'modify-button m-button';
        modifyButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  
        toggleContentMain.appendChild(checkboxInput);
        toggleContentMain.appendChild(contentLabel);
        toggleContentMain.appendChild(modifyButton);
  
        const toggleContentContainer = document.querySelectorAll('.toggle-content-container')[index];
        toggleContentContainer.insertBefore(toggleContentMain, toggleContentContainer.querySelector('.toggle-content-footer'));
  
        toggleInput.value = "";
  
        this.addEventToggleContentComplete();
        this.addEventToggleContentModify();
      };
    });
  }

  addEventAddToggleKeyUp() {
    const toggleInputs = document.querySelectorAll(".toggle-input");
  
    toggleInputs.forEach((toggleInput, index) => {
      toggleInput.onkeyup = (event) => {
        if (event.keyCode == 13) {
          const addToggleButtons = document.querySelectorAll(".add-toggle-button");
          addToggleButtons[index].click();
        }
      };
    });
  }

  addEventToggleContentComplete() {
    const checkboxInputs = document.querySelectorAll(".checkbox-input");
  
    checkboxInputs.forEach((checkboxInput) => {
      checkboxInput.onclick = () => {
        const isChecked = checkboxInput.checked;
        const contentLabel = checkboxInput.nextElementSibling;
        contentLabel.style.textDecoration = isChecked ? "line-through" : "none";
      };
    });
  }
  
  addEventToggleContentModify() {
    const modifyButtons = document.querySelectorAll(".m-button");
  
    modifyButtons.forEach((modifyButton) => {
      modifyButton.onclick = () => {
        const contentLabel = modifyButton.previousElementSibling;
        const currentContent = contentLabel.innerText;
        const newContent = prompt("Edit content:", currentContent);
  
        if ((newContent === null || newContent.trim() === "")) {
          return;
        }
  
        contentLabel.innerText = newContent;
        const toggleContentMain = modifyButton.closest(".toggle-content-main");
        const toggleIndex = Array.from(toggleContentMain.parentElement.children).indexOf(toggleContentMain) - 1;
        const todoIndex = Array.from(toggleContentMain.closest('.content-list-container').parentElement.children).indexOf(toggleContentMain.closest('.content-list-container'));
        TodoService.getInstance().editToggleContent(todoIndex, toggleIndex, newContent);
      };
    });

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
    const toggleContents = toggleInput && toggleInput.value.trim() !== "" ? [toggleInput.value] : [];
    const todoObj = {
      todoContent: todoInput.value,
      toggleContents: toggleContents
    };
  
    this.todoList.push(todoObj);
    this.updateLocalStorage();
  }
  
  editToggleContent(todoIndex, toggleContentIndex, newContent) {
    if (!this.todoList[todoIndex]) return;
  
    this.todoList[todoIndex].toggleContents[toggleContentIndex] = newContent;
    this.addTodo();
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
            <button type="button" class="modify-button m-button"><i class="fa-solid fa-pen-to-square"></i></button>
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
            </div>
          </div>
        </li>
      `;
    });
    todoContentList.innerHTML = todoContentListHtml;

    TodoEvent.getInstance().addEventToggleClick();
    TodoEvent.getInstance().addEventAddToggleClick();
    TodoEvent.getInstance().addEventRemoveTodoClick();
    TodoEvent.getInstance().addEventAddToggleKeyUp();

    TodoEvent.getInstance().addEventToggleContentComplete(); 
    TodoEvent.getInstance().addEventToggleContentModify();

  }
  
}