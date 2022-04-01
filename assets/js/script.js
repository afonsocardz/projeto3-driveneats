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

    if (elemento === null) return
    isSelected.classList.remove("active");
}

const checkOrder = () => {
    const isAllCheck = document.querySelectorAll("li.active").length;
    const buttonCheck = document.getElementById("order-button");
    if (isAllCheck === 3) {
        buttonCheck.classList.add("active");
        buttonCheck.textContent = "Fechar Pedido!";
    }else{
        buttonCheck.textContent = "Selecione os 3 itens para fechar o pedido";
        buttonCheck.classList.remove("active");
    }
}

window.addEventListener("click", checkOrder);


