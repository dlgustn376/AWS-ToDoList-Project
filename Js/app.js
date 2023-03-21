window.onload = () =>{
    AdageEvent.getInstance().addEventAdageAddClick();
    AdageEvent.getInstance().addEventAdageModifyClick();
    AdageEvent.getInstance().addEventAddAdageKeyUp();
    AdageService.getInstance().addAdage();
    
    TodoEvent.getInstance().addEventAddTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    TodoEvent.getInstance().addEventAddToggleClick();
    
    TodoService.getInstance();
}