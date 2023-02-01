(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function l(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=l(o);fetch(o.href,n)}})();const C=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesitas crear?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filter" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filter" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filter" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let b;const L=new Uint8Array(16);function S(){if(!b&&(b=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!b))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return b(L)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function E(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:A};function k(e,t,l){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const d=e.random||(e.rng||S)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=d[o];return t}return E(d)}class m{constructor(t){this.id=k(),this.description=t,this.done=!1,this.createAt=new Date}}const c={All:"all",Completed:"completed",Pending:"pending"},i={todos:[new m("Anillo recuerdo"),new m("Anillo vida"),new m("Anillo espejo"),new m("Anillo realidad"),new m("Anillo tiempo")],filter:c.All},P=()=>{v(),console.log("InitStore 🍫")},v=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));i.todos=e,i.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(i))},I=(e=c.All)=>{switch(e){case c.All:return[...i.todos];case c.Completed:return i.todos.filter(t=>t.done);case c.Pending:return i.todos.filter(t=>!t.done);default:throw new Error(`Filter ${e} is not defined`)}},x=e=>{if(!e)throw new Error("Description is required");i.todos.push(new m(e)),h()},U=e=>{i.todos=i.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},q=e=>{i.todos=i.todos.filter(t=>t.id!==e),h()},D=()=>{i.todos=i.todos.filter(e=>!e.done),h()},F=(e=c.All)=>{if(!Object.values(c).includes(e))throw new Error(`Filter ${e} is not defined`);i.filter=e,h()},M=()=>i.filter,a={addTodo:x,deleteCompleted:D,deleteTodo:q,getCurrentFilter:M,getTodos:I,initStore:P,loadStore:v,saveStateToLocalStorage:h,setFilter:F,toogleTodo:U},H=e=>{if(!e)throw new Error("A todo is required");const{id:t,description:l,done:d}=e,o=`
                <div class="view">
                    <input class="toggle" type="checkbox" ${d?"checked":"unchecked"}>
                    <label>${l}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",t),d&&n.classList.add("completed"),n};let f;const O=e=>{if(f||(f=document.querySelector(e)),!f)throw new Error(`Element ${f} no exist`);f.innerHTML=a.getTodos(c.Pending).length};let y;const V=(e,t=[])=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML="",t.forEach(l=>{y.append(H(l))})},p={ClearCompleted:".clear-completed",TodoFilters:".filter",TodoInput:".new-todo",TodoList:".todo-list",PendingCount:"#pending-count"},$=e=>{const t=()=>{O(p.PendingCount)},l=()=>{const r=a.getTodos(a.getCurrentFilter());V(p.TodoList,r),t()};(()=>{const r=document.createElement("div");r.innerHTML=C,document.querySelector(e).append(r),l()})();const d=document.querySelector(p.TodoList),o=document.querySelector(p.TodoInput),n=document.querySelector(p.ClearCompleted),u=document.querySelectorAll(p.TodoFilters);o.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(a.addTodo(r.target.value),r.target.value="",l())}),d.addEventListener("click",r=>{const g=r.target.closest("[data-id]");a.toogleTodo(g.getAttribute("data-id")),l()}),d.addEventListener("click",r=>{const g=r.target.className==="destroy",w=r.target.closest("[data-id]");!g||!w||(a.deleteTodo(w.getAttribute("data-id")),l())}),n.addEventListener("click",()=>{a.deleteCompleted(),l()}),u.forEach(r=>{r.addEventListener("click",()=>{switch(u.forEach(g=>g.classList.remove("selected")),r.classList.add("selected"),r.text){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completados":a.setFilter(c.Completed);break}l()})})};a.initStore();$("#app");
