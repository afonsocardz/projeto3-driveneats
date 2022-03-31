
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
    

    

    //select one item

    const allDishes = document.querySelectorAll("#dishes li")
    const allDrinks = document.querySelectorAll("#drinks li")
    const allDiserts = document.querySelectorAll("#diserts li")


    window.addEventListener("click", function (e) {
        let selected = e.target;
        console.log(selected);
        altera(selected);
    });

    // Check if `child` is a descendant of `dishes`
    const isDescendant = function (parent, child) {
        let node = child.parentNode;
        while (node) {
            if (node === parent) {
                return true;
            }

            // Traverse up to the dishes
            node = node.parentNode;
        }

        // Go up until the root but couldn't find the `dishes`
        return false;
    };

    const altera = (target) => {
        const li = document.createElement("li");

        if (target.nodeName != li.nodeName) {
            target = target.parentNode;
            target = target.parentNode
        }
        if (isDescendant(allDishes[0].parentNode, target)) {
            allDishes.forEach(dish => {
                if (dish.classList.contains("active")) {
                    dish.classList.remove("active");
                }
            });
        }
        if (isDescendant(allDrinks[0].parentNode, target)) {
            allDrinks.forEach(drink => {
                if (drink.classList.contains("active")) {
                    drink.classList.remove("active");
                }
            });
        }
        if (isDescendant(allDiserts[0].parentNode, target)) {
            allDiserts.forEach(disert => {
                if (disert.classList.contains("active")) {
                    disert.classList.remove("active");
                }
            });
        }
        if (target.nodeName == li.nodeName){
            target.classList.add("active");
        }
        
    }

    //button active

    const buttonCheck = document.getElementById("order-button");

    const buttonActive = function () {
        
                buttonCheck.classList.add("active");
                
       
    };

    buttonCheck.addEventListener('click', buttonActive);
});
