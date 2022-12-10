//main array that holds object (exercise cards)
let exArray = [];

//exercise card factory function
function createExCard(img, exercise, category, summary){
    return{
        img, 
        exercise, 
        category, 
        summary, 
        card: createElement("div", "card"),
    }
};


//function to create elements 
function createElement(el, cls, inText){
    let element = document.createElement(el);
    if (cls != undefined){
        element.classList.add(cls);
    }
    if (inText != undefined){
        element.innerText = inText;
    }
    return element;
}

//push to array function
function add(name){
    exArray.push(name);
}


// <---------------library of exercise cards------------------->

let digiFlex = createExCard("Images/digiflex.jpg", "DigiFlex", "hand", "Hold arm by side with elbow @ 90 degree angle");
add(digiFlex);

let theraPutty = createExCard("Images/putty.jpg", "TheraPutty", "hand", "");
add(theraPutty);

let xTrainer = createExCard("Images/xtrainer.jpg", "X-Trainer", "hand", "")
add(xTrainer);

let xtwist = createExCard("Images/xtwist.jpg", "X-Twist", "hand", "");
add(xtwist);

//console log array
console.log(exArray);

//function to create and render exercise cards
function displayExerciseCards(array){
    const container = document.querySelector(".exercises");
        array.forEach(function(item){
            //card item creation
            let title = createElement("h2","card-header", item.exercise);
            let image = createElement("img", "card-img");
            image.src = item.img;
            let summary = createElement("p", "summary", item.summary);
            let sumTab = createElement("a", "sum-tab", "Summary...");

            //event listener to display summary
            sumTab.addEventListener("click", function(){
                summary.classList.toggle("on");
            });

            //appending items to card
            item.card.appendChild(title);
            item.card.appendChild(image);
            item.card.appendChild(sumTab);
            item.card.appendChild(summary);
            container.appendChild(item.card);
            
            
        })

}
displayExerciseCards(exArray);

//search functionality
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", () => {
        let value = searchInput.value.toLowerCase();
        exArray.forEach(function(item){
        const visable = item.exercise.toLowerCase().includes(value);
        if (value == "" || value == " "){
            item.card.classList.remove("hide");
        }
        else if(!visable && value !=""){
            item.card.classList.add("hide");
        }
        else if(visable && value !="")
            item.card.classList.remove("hide");
        })
    }   

        )