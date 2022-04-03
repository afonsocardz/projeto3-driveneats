document.addEventListener('DOMContentLoaded', function () {
    const eles = document.querySelectorAll('#list');
    let pos = { left: 0, x: 0 };
    eles.forEach(ele => {
        const mouseDownHandler = function (e) {
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';
            pos = {
                left: ele.scrollLeft,

                // Get the current mouse position
                x: e.clientX,
            };
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);

        };

        const mouseMoveHandler = function (e) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;

            // Scroll the element
            ele.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function () {
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Attach the handler
        ele.addEventListener('mousedown', mouseDownHandler);

    });
});


function selectedItem(elemento) {
    let isSelected;
    let parent = elemento.parentElement;
    let classSelection = `.${parent.className} > .active`;
    let checkIcon = elemento.querySelector(".item-box img:last-child");

    isSelected = document.querySelector(classSelection);

    //possivel selecionar e deselecionar
    elemento.classList.add("active");
    checkIcon.classList.add("active");
    
    if (isSelected !== null) {
        checkIcon = isSelected.querySelector(".item-box img:last-child");
        isSelected.classList.remove("active");
        checkIcon.classList.remove("active");
    }
    checkOrder();
}

const checkOrder = () => {
    const isAllCheck = document.querySelectorAll("li.active").length;
    const buttonCheck = document.getElementById("order-button");
    if (isAllCheck === 3) {
        buttonCheck.classList.add("active");
        buttonCheck.textContent = "Fechar Pedido!";
    } else {
        buttonCheck.textContent = "Selecione os 3 itens para fechar o pedido";
        buttonCheck.classList.remove("active");
    }
}

function createRow (table,row, text){
    let coluna = document.createElement("td");
    coluna.textContent = text;
    row.append(coluna);
    table.append(row);
}

const removeOrder = () =>{
    let tbody = document.querySelectorAll("tbody tr");
    tbody.forEach(element => {
        if (element.rowIndex !== 0){
            element.remove();
        }
    });
}

const makeOrder = () => {
    let valores = [];
    let valorTotal = 0;
    let pedido = [];
    const choosedElements = document.querySelectorAll("li.active .item-box");
    const table = document.querySelector("table tbody")
    let rowTotal = document.createElement("tr");

    choosedElements.forEach(element => {
        let row = document.createElement("tr");
        let pName = element.children[1].outerText;
        let pValue = element.children[3].outerText;
        let valor = element.children[3].outerText.replace("R$", "");

        let arrayKey = element.parentElement.parentElement.className;
        
        pedido[arrayKey] = pName;
        
        valor = valor.replace(",", ".");
        valor = Number(valor);
        valores.push(valor);

        createRow(table, row, pName);
        createRow(table, row, pValue );
    });

    valores.forEach(valor => {
        valorTotal += valor;
    });

    valorTotal = valorTotal.toFixed(2);
    valorTotal = valorTotal.toString().replace(".",",");
    valorTotal = `R$${valorTotal}`;
    createRow(table, rowTotal, "Total");
    createRow(table, rowTotal, valorTotal);

    pedido['total'] =  valorTotal;

    return pedido;
}

const finishOrder = (order, name, address) =>  {
    
    const number = "5515991642276";
    const message = encodeURIComponent(`Olá, gostaria de fazer o pedido:\n- Prato: ${order.dishes}\n- Bebida: ${order.drinks}\n- Sobremesa: ${order.diserts}\nTotal: ${order.total}\n\nNome: ${name}\nEndereço: ${address}`);
    console.log("aqui");
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;

    window.open(url,'_blank');
}

function isEmpty(value){
    return (typeof value !== 'undefined' && value);
}

let orderArray = [];

const buttonHandler = (element) => {
    const modal = document.querySelector(".modal");
    if(element.classList.contains("confirm")){
        const nome = prompt("Qual é o seu nome?");
        const endereco = prompt("Qual é o seu endereço?");
        console.log("finaliza pedido");
        if (isEmpty(nome) && isEmpty(endereco) ){
            finishOrder(orderArray, nome, endereco);
            return
        }
        alert("Por favor! Informar nome e endereço!")
    }
    if(modal.classList.contains("active")){
        removeOrder();
        modal.classList.remove("active");        
    }
    if(element.classList.contains("active")){
        orderArray = makeOrder();
        console.log("Criou pedido");
        modal.classList.add("active");
    }    
}
