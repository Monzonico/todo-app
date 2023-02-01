import html from './app.html?raw';
import todoStore, {Filters} from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filter',
    TodoInput: '.new-todo',
    TodoList:  '.todo-list',
    PendingCount: '#pending-count',
}

/**
 * 
 * @param {String} elemntId 
 */
export const App = (elemntId) =>{

    const updatePendingCount = () =>{
        renderPending(ElementIDs.PendingCount);
    }

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList,todos);
        updatePendingCount();
    }

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elemntId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const newDescriptionInput = document.querySelector(ElementIDs.TodoInput);
    const btnClearCompleted = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLi = document.querySelectorAll(ElementIDs.TodoFilters);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) =>{
        if(event.keyCode !== 13 ) 
        return;

        if(event.target.value.trim().length === 0)
        return;

        todoStore.addTodo(event.target.value);
        event.target.value = '';

        displayTodos();
    });

    todoListUL.addEventListener('click', (event) =>{
        const idElement = event.target.closest('[data-id]');
        todoStore.toogleTodo(idElement.getAttribute('data-id'));

        displayTodos();
    });

    todoListUL.addEventListener('click', (event) =>{

        const isDestroyElement = event.target.className === 'destroy';
        const idElement = event.target.closest('[data-id]');

        if(!isDestroyElement || !idElement)
        return;

        todoStore.deleteTodo(idElement.getAttribute('data-id'));
        displayTodos();  
    });

    btnClearCompleted.addEventListener('click', () =>{
        todoStore.deleteCompleted();
        displayTodos();  
    });

    filtersLi.forEach(filter => {
        
        filter.addEventListener('click', () =>{
            filtersLi.forEach(filter1 => filter1.classList.remove('selected'));
            filter.classList.add('selected');
            switch(filter.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;

                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();
        });
    });
}