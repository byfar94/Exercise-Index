let exArray = [];

//exercise card factory function
function createExCard(img, exercise, category, summary, card){
    return{
        img, exercise, category, summary, card
    }
};

function createElement(el, cls){
    let element = document.createElement(el);
    element.classList.add(cls)
    return element;
}

//library of exercise cards
let digiFlex = createExCard("Images/digiflex.jpg", "DigiFlex", "hand", "Hold arm by side with elbow @ 90 degree angle", createElement("div", "card"));
add(digiFlex);
let theraPutty = createExCard("Images/putty.jpg", "TheraPutty", "hand", "", createElement("div", "card"));
add(theraPutty);
let xTrainer = createExCard("Images/xtrainer.jpg", "X-Trainer", "hand", "", createElement("div", "card"))
add(xTrainer);
let xtwist = createExCard("Images/xtwist.jpg", "X-Twist", "hand", "", createElement("div", "card"));
add(xtwist);

//push to array function
function add(name){
    exArray.push(name);
}

console.log(exArray);

//function to create and render exercise cards
function displayExerciseCards(array){
    const container = document.querySelector(".exercises");
        array.forEach(function(item){
            let title = document.createElement("h2");
            title.innerText = item.exercise;
            let image = document.createElement("img");
            image.src = item.img;
            let summary = document.createElement("p");
            summary.innerText = item.summary;
            summary.classList.add("summary");
            let sumTab = document.createElement("a");
            sumTab.innerText = "Summary..."
            sumTab.classList.add("sum-tab");
            sumTab.addEventListener("click", function(){
                summary.classList.toggle("on");
            });

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