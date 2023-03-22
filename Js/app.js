window.onload = () =>{
    AdageEvent.getInstance().addEventAdageAddClick();
    AdageEvent.getInstance().addEventAddAdageKeyUp();
    AdageEvent.getInstance().addEventAdageModifyClick();
    AdageService.getInstance();
    
    TodoEvent.getInstance().addEventAddTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    // TodoEvent.getInstance().addEventAddToggleClick();
    // TodoEvent.getInstance().addEventAddToggleKeyUp();
    
    TodoService.getInstance();
}