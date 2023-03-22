class AdageEvent{
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
          this.#instance = new AdageEvent();
      }
      return this.#instance;
  }

    addEventAdageModifyClick() {
        const adageModifyButton = document.querySelector(".modify-button");
        
        adageModifyButton.onclick = () => {
            const addAdageButton = document.querySelector(".add-adage-button");
            const adageInput = document.querySelector(".content-adage-input");
            const adageLabel = document.querySelector(".content-text-label");
            addAdageButton.classList.remove("button-hidden");
            adageModifyButton.classList.add("button-hidden");
            adageInput.classList.remove("input-hidden");
            adageLabel.classList.add("label-hidden");
        }
    }
    
    addEventAdageAddClick() {
        const addAdageButton = document.querySelector(".add-adage-button");
        addAdageButton.onclick = () => {
            AdageService.getInstance().addAdage();
            const adageModifyButton = document.querySelector(".modify-button");
            adageModifyButton.classList.remove("button-hidden");
                
            addAdageButton.classList.add("button-hidden");
            const adageInput = document.querySelector(".content-adage-input");
            adageInput.classList.add("input-hidden");
            const adageLabel = document.querySelector(".content-text-label");
            adageLabel.classList.remove("label-hidden");
                
            // Set the value of adageMessage to the value entered in the adageInput
            const adageMessage = adageInput.value;
            AdageService.getInstance().adageMessage = adageMessage;
            localStorage.setItem("adageMessage", JSON.stringify(adageMessage));
            adageInput.value="";
        }
    }
    addEventAddAdageKeyUp() {
        const adageInput = document.querySelector(".content-adage-input");
        adageInput.onkeyup = () => {
          if(window.event.keyCode == 13) {
              const addAdageButton = document.querySelector(".add-adage-button");
              addAdageButton.click();
          }
        }
      }

}

class AdageService{
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
          this.#instance = new AdageService();
      }
      return this.#instance;
  }

  adageMessage = JSON.parse(localStorage.getItem("adageMessage"));

  addAdage(){
    this.adageMessage = JSON.parse(localStorage.getItem("adageMessage"));
    if(this.adageMessage == null){
        return;
    }
    
    // 현재 입력된 adageMessage 값으로 수정
    this.adageMessage = document.querySelector(".content-adage-input").value.trim();
    this.loadAdage();
    }
    
  loadAdage() {
    if (this.adageMessage == null) {
      return;
    }
    const contentAdage = document.querySelector(".content-header-text .content-text-label");
    let contentAdageMessage = "나의 상태: "
    contentAdage.textContent =  contentAdageMessage + this.adageMessage;

    AdageEvent.getInstance().addEventAdageAddClick();
    AdageEvent.getInstance().addEventAdageModifyClick();
  }
  

}