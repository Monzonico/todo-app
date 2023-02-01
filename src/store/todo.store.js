import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('Anillo recuerdo'),
        new Todo('Anillo vida'),
        new Todo('Anillo espejo'),
        new Todo('Anillo realidad'),
        new Todo('Anillo tiempo')
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🍫');
}

const loadStore = () => {
    if(!localStorage.getItem('state'))
    return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state',JSON.stringify(state));
}

/**
 * 
 * @param {Filters} filter 
 * @returns {Todo[]}
 */
const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Filter ${filter} is not defined`);
    }
}

const addTodo = (description) => {
    if(!description)
    throw new Error('Description is required');

    state.todos.push(new Todo(description));
    
    saveStateToLocalStorage();
}

/**
 * Function to toogle todo's
 * @param {String} todoId 
 */
const toogleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId)
        todo.done = !todo.done;

        return todo;
    });
    saveStateToLocalStorage();
}

/**
 * Function to delete todo by id
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

/**
 * Function to delete completed todo's
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * Function to set new Filter
 * @param {Filters} newFilter Example : Filter.All
 */
const setFilter = (newFilter = Filters.All) => {
    if(!Object.values(Filters).includes(newFilter))
    throw new Error(`Filter ${newFilter} is not defined`);

    state.filter = newFilter;

    saveStateToLocalStorage();
}

/**
 * Function to return the current Filter
 * @returns {Filters} Return current Filter
 */
const getCurrentFilter = () => {
    return state.filter;
}



export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    saveStateToLocalStorage,
    setFilter,
    toogleTodo,
}