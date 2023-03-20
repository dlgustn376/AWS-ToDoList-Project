class TodoEvent{
  static #instance = null;
  static getInstance() {
      if(this.#instance == null) {
          this.#instance = new TodoEvent();
      }
      return this.#instance;
  }

  addEventToggleClick(){
    const toggleButtons = document.querySelectorAll('.toggle-button');
    
    toggleButtons.forEach((toggleButton, index) =>{
      const toggleContent = document.querySelectorAll('.toggle-content')[index];
      toggleButton.onclick = () =>{
        if (toggleContent.style.display === 'none') {
          toggleContent.style.display = 'block';
        } else {
          toggleContent.style.display = 'none';
        }
      }
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
}
