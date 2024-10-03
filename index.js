










//retirar do localstorage e volta a ser objeto 
const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem('tasks')) //nome do banco que colocamos a lista
    return localTasks ? localTasks: []
}

//add ao localstorage
const setTasksFromLocalStorage = (tasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
}


//remove uma tarefa pelo botão X
const removeTask = (taskId) => {
    const tasks = getTasksFromLocalStorage()
    const updatedTasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId));
    setTasksFromLocalStorage(updatedTasks);

    document
        .getElementById("todo-list")
        .removeChild(document.getElementById(taskId)); 
}

//ao clicar no botão, remove do array os que estão checados e remove da tela tmb
const removeDoneTasks = () => {
    const tasks = getTasksFromLocalStorage()
    const tasksToRemove = tasks              //pega todos os id dos itens da lista com checked true
    .filter(({ checked }) => checked)
    .map(({id})=> id)

    const updatedTasks = tasks.filter(({checked})=> !checked); //a lista fica apenas com os objetos que nao estão checados
    setTasksFromLocalStorage(updatedTasks)

    tasksToRemove.forEach((tasksToRemove)=> { //apaga a <li> lista que te o mesmo id que a lista
        document
        .getElementById("todo-list")
        .removeChild(document.getElementById(tasksToRemove)) 
    })
}

//2-retorna as <li>. Coloca todas na <ul>
const createTaskListItem = (task, checkbox) => {
    //chechbox = <div>input+label<div>    task sao cada objeto da lista

    const lista = document.getElementById('todo-list')        //<UL>
    const ToDo = document.createElement('li');               //cria um <li> para cada objeto da lista

    const BotãoQueApaga = document.createElement('button')  //criamos um botão
    BotãoQueApaga.textContent = 'X'                         //texto dele
    BotãoQueApaga.ariaLabel = 'remover tarefa'              //descrição dele

    BotãoQueApaga.onclick = () => removeTask(task.id);      //botão aciona o apagar

    ToDo.id = task.id                                   //id <li> será a mesma do laço de repetição
    ToDo.appendChild(checkbox);                         //div => <li>
    ToDo.appendChild(BotãoQueApaga)                     //adiciona o botão na li depois da div
    lista.appendChild(ToDo);                            //li => <ul>

    return ToDo; //retorna <li> div </li>
}


//precisamos Alterar a o ckecked da lista. ao clicar no elemento, pegamos o id pelo target
//o id tem texto:"1-checkbox", entao usamos o split('-') para separar em array
//o numero fica no indice [0] e tento no [1]
const onCheckboxClick = (event) => {
    const [id] = event.target.id.split('-');
    const tasks = getTasksFromLocalStorage()

    const updatedTasks = tasks.map((task) => {
        return parseInt(task.id) === parseInt(id)
            ? { ...task, checked: event.target.checked } //se o checked clicado for true, o do array tmb será
            : task
    })
    setTasksFromLocalStorage(updatedTasks)
}

//1-Retornar as <div> label e input dentro da div. cria quantas quiser.Todos input do tipo checkbox.
const getCheckboxInput = ({ id, description, checked }) => { //{} significa que os parametros são as 3 chaves
    const inputCheckbox = document.createElement('input');  //cria input
    const label = document.createElement('label');         //cria label (descrição do input)
    const div = document.createElement('div');             //cria div, juntar label e input

    inputCheckbox.type = 'checkbox';                      //input vira checkbox
    inputCheckbox.id = `${id}-checkbox`;                   //adiciona id e texto ao checkbox
    inputCheckbox.checked = checked || false;              //propriedade do input checkboxmarca ou desmarca
    inputCheckbox.addEventListener('change', onCheckboxClick) //

    label.textContent = description;                       //a descrição da label é a task
    label.htmlFor = `${id}-checkbox`;                      //label e input tem que ter o mesmo id, para corresponderem um ao outro

    div.className = 'checkbox-label-conteiner';           //identificador de classe á div para estilizar todos

    div.appendChild(inputCheckbox);                       //adiciona input na div
    div.appendChild(label);                               //adiciona label na div

    return div; //retorna <div> input  label </div>
}

//Retorna ID novo baseado no ultimo. 
const criarIdcadaTarefa = () => {
    const tasks = getTasksFromLocalStorage()
    const ultimoId = tasks[tasks.length - 1]?.id;
    return ultimoId ? ultimoId + 1 : 1; //a lista está vazia? se nao, +1, se sim, 1
}


//Retorna Nome da Tarefa + ID
const getNewTask = (event) => {
    const description = event.target.elements.description.value;   //descrição do input tipo texto
    const id = criarIdcadaTarefa();                                //retorna um ID

    return { description, id }
}

//Retorna nova lista de objeto com: Nome tarefa + Id
const createTask = (event) => {
    event.preventDefault();            //previne que mude a url ao acionar o botão submit
    const newTaskData = getNewTask(event)  //constante guarda id e descrição que usuario digitou
    
    const checkbox = getCheckboxInput(newTaskData) //<div>input+label<div> criada pelo usuario
    createTaskListItem(newTaskData, checkbox);     //retorna constante que guarda id e descrição
    
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = [                      //adiciona a nova task com a descrição e id do usuario
        ...tasks, //adiciona em ultimo
        { id: newTaskData.id, description: newTaskData.description, checked: false }
    ]
    setTasksFromLocalStorage(updatedTasks)
}

//ao carregar a pagina, mostra na tela as listas ja criada e Botão submit aciona todas as funções.
window.onload = function () {
    const form = document.getElementById('create-todo-form')   //<form> do html, o botão criado faz submit nele
    form.addEventListener('submit', createTask)                //boão adicionar tarefa aciona varias funções
    
    const tasks = getTasksFromLocalStorage();

    //para cada array, crie uma nova lista começando do indice 0
    tasks.forEach((task) => {                           //Passa por todos Objetos/chaves da lista
        const checkbox = getCheckboxInput(task);        //a criação da div, recebe as 3 chaves de cada objeto
        createTaskListItem(task, checkbox);             //acionamos 
    })
}