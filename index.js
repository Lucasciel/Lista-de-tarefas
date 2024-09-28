


let tasks = [
    {id: 1, description: 'beber água', cheked: false},
    {id: 2, description: 'passear com o cachorro', cheked: false},
    {id: 3, description: 'fazer caminhada', cheked: false}
]

//cria label e input e div, coloca dentro da div. transforma input em checkbox.
const getCheckboxInput = ({id,description,checked}) => {     
    const inputCheckbox = document.createElement('input');  //cria input
    const label = document.createElement('label');         //cria label (descrição do input)
    const div = document.createElement('div');             //cria div, juntar label e input

    inputCheckbox.type = 'checkbox';                      //input vira checkbox
    inputCheckbox.id = `${id}-checkbox`;                   //adiciona id e texto ao checkbox
    inputCheckbox.checked = checked;                   //marca ou desmarca o checkbox

    label.textContent = description;                 //a descrição da label é a task
    label.htmlFor = `${id}-checkbox`;                      //label e input tem que ter o mesmo id, para corresponderem um ao outro
    
    div.className = 'checkbox-label-conteiner';              //identificador de classe á div
    
    div.appendChild(inputCheckbox);                       //adiciona input na div
    div.appendChild(label);                              //adiciona label na div

    return div;
}

window.onload = function() {                            //quando o navegador carregar, executa a função
    const lista = document.getElementById('todo-list')  //pega o UL do documento

    tasks.forEach((tasks)=> {                           //executa para cada item da lista
        const inputCheckbox = getCheckboxInput(tasks);   //toda criação de label, input e div

        const ToDo= document.createElement('li');       //cria um <li> para cada objeto da lista
        ToDo.appendChild(inputCheckbox)                 //adiciona texto dentro da lista, a description
        ToDo.id = tasks.id
        
        lista.appendChild(ToDo);                        //coloca as li dentro da ul
    })
}