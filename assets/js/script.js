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
    let classSelection = `.${parent.className} .active`;

    isSelected = document.querySelector(classSelection);

    //possivel selecionar e deselecionar
    elemento.classList.add("active");


    if (isSelected !== null) {
        isSelected.classList.remove("active");
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


const makeOrder = () => {
    let valores = [];
    let item = [];
    let totalPedido = 0;
    const choosedElements = document.querySelectorAll("li.active .item-box");
    const table = document.querySelector("table tbody")
    let linhaTotal = document.createElement("tr");
    let colunaTotal = document.createElement("td");
    let colunaSoma = document.createElement("td");

    console.log("fora")

    choosedElements.forEach(element => {
        let colunaName = document.createElement("td");
        let colunaValue = document.createElement("td");
        let linha = document.createElement("tr");
        console.log("dentro")
        item.push(element.children[1].outerText);
        item.push(element.children[3].outerText);
        let valor = item[1].replace("R$", "");
        valor = valor.replace(",", ".");
        valor = Number(valor);
        valores.push(valor);

        //criar colunas e linha
        //add product name column
        colunaName.textContent = item[0];
        linha.append(colunaName);

        //add value column
        colunaValue.textContent = item[1];
        linha.append(colunaValue);

        table.append(linha);

    });

    valores.forEach(valor => {
        totalPedido = totalPedido + valor;
    });

    colunaTotal.textContent = "Total";
    
    totalPedido = totalPedido.toFixed(2);
    totalPedido = totalPedido.toString().replace(".",",");
    colunaSoma.textContent = `R$${totalPedido}`;
    linhaTotal.append(colunaTotal);
    linhaTotal.append(colunaSoma);
    table.append(linhaTotal);
}
const button = document.getElementById("order-button");

button.addEventListener("click", () =>{
    const modal = document.querySelector(".modal");
    console.log("aqui")
    if(button.classList.contains("active")){
        makeOrder();
        modal.classList.add("active");
    }else{
        console.log("nope")
    }
})
