
document.addEventListener('DOMContentLoaded', function () {
    const ele = document.getElementById('list');

    let pos = { left: 0, x: 0};

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

    //select one item

    let allChecked = false;
    const dishes = document.getElementById("dish");
    let hasDishes = false;
    let drinks = false;
    let diserts = false;

    const links = document.querySelectorAll('#dishes > ul li');

    links.forEach((link) => {
        link.addEventListener('click', () => {
            const notClickedLinks = Array.from(links).filter((notClickedLink) => {
                return notClickedLink !== link;
            });

            notClickedLinks.forEach((notClickedLink) => {
                notClickedLink.classList.remove('active');
            });

            link.classList.add('active');

            hasDishes =  dishes.classList.contains('active');

            if(hasDishes){
                allChecked = true;
            }

            
        });
    });

    //button active

    const element = document.getElementById("order-button");

    const buttonActive = function () {
        element.classList.add("active");
    };

    element.addEventListener('click', buttonActive);
});
