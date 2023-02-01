import todoStore, { Filters } from '../../store/todo.store';

let element;

/**
 * 
 * @param {String} elemntId 
 */
export const renderPending = (elemntId) => {

    if(!element)
        element = document.querySelector(elemntId);

    if(!element)
        throw new Error(`Element ${element} no exist`);

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}