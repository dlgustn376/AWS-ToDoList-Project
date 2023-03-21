window.onload = () =>{
    TodoEvent.getInstance().addEventAddTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    // TodoEvent.getInstance().addEventToggleClick();

    TodoService.getInstance();
}