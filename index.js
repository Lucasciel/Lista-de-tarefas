


let tasks = [
    { id: 1, description: 'beber água', checked: false },
    { id: 2, description: 'passear com o cachorro', checked: false },
    { id: 3, description: 'fazer caminhada', checked: false }
]
//2-retorna as <li>. Coloca todas na <ul>
const createTaskListItem = (task, checkbox) => {
    const lista = document.getElementById('todo-list')         //pega o <UL> do documento
    const ToDo = document.createElement('li');               //cria um <li> para cada objeto da lista
    ToDo.id = task.id                                       //id <li> será a mesma que for criada
    ToDo.appendChild(checkbox);                         //adiciona a div para dentro da <li>
    lista.appendChild(ToDo);                                

    return ToDo;
}

//1-Retornar as <div> label e input dentro da div. cria quantas quiser.Todos input do tipo checkbox.
const getCheckboxInput = ({ id, description, checked }) => {
    const inputCheckbox = document.createElement('input');  //cria input
    const label = document.createElement('label');         //cria label (descrição do input)
    const div = document.createElement('div');             //cria div, juntar label e input

    inputCheckbox.type = 'checkbox';                      //input vira checkbox
    inputCheckbox.id = `${id}-checkbox`;                   //adiciona id e texto ao checkbox
    inputCheckbox.checked = checked || false;              //propriedade do input checkboxmarca ou desmarca

    label.textContent = description;                       //a descrição da label é a task
    label.htmlFor = `${id}-checkbox`;                      //label e input tem que ter o mesmo id, para corresponderem um ao outro

    div.className = 'checkbox-label-conteiner';           //identificador de classe á div para estilizar todos

    div.appendChild(inputCheckbox);                       //adiciona input na div
    div.appendChild(label);                               //adiciona label na div

    return div;
}

//ao adicionar tarefa, cria id novo, somando com ultimo id
const criarIdcadaTarefa = () => {
    const ultimoId = tasks[tasks.length - 1]?.id;
    return ultimoId ? ultimoId + 1 : 1
}


//ao clicar no botão submit, pega a descrição da tarefa e cria um id novo
const getNewTask = (event) => {
    const description = event.target.elements.description.value;
    const id = criarIdcadaTarefa();

    return { description, id }
}

//previne que ao acionar o submit,a tela mude de endereço url, e pega o que usuario escreveu
const createTask = (event) => {
    event.preventDefault();
    const newTask = getNewTask(event)
    const checkbox = getCheckboxInput(newTask)
    createTaskListItem(newTask, checkbox);
    tasks = [
        ...tasks,
        {id: getNewTask.id, description: getNewTask.description, checked: false}
    ]
}

//quando o navegador carregar, executa a função
window.onload = function () {
    const form = document.getElementById('create-todo-form')   //<form> do html, o botão criado faz submit
    form.addEventListener('submit', createTask)                //faz recarregar a pagina mas não muda o endereço

    tasks.forEach((task) => {                           //executa para cada item da lista
        const checkbox = getCheckboxInput(task);   //toda criação de label, input e div
        createTaskListItem(task, checkbox);
    })
}