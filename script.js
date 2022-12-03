let exArray = [];

//exercise card factory function
function createExCard(img, exercise, category, summary ){
    return{
        img, exercise, category, summary,
    }
};


let digiFlex = createExCard("Images/digiflex.jpg", "DigiFlex", "hand", "Hold arm by side with elbow @ 90 degree angle");
add(digiFlex);
let theraPutty = createExCard("Images/putty.jpg", "TheraPutty", "hand", "");
add(theraPutty);
let xTrainer = createExCard("Images/xtrainer.jpg", "X-Trainer", "hand", "")
add(xTrainer);
let xtwist = createExCard("Images/xtwist.jpg", "X-Twist", "hand", "");
add(xtwist);

//push to array function
function add(name){
    exArray.push(name);
}

console.log(exArray);

//function to create and render exercise cards
function displayExerciseCards(){
    const container = document.querySelector(".exercises");
        exArray.forEach(function(item){
            let div = document.createElement("div");
            let title = document.createElement("h2");
            title.innerText = item.exercise;
            let image = document.createElement("img");
            image.src = item.img;
            let summary = document.createElement("p");
            summary.innerText = item.summary;
            div.appendChild(title);
            div.appendChild(image);
            container.appendChild(div);

        })
}
displayExerciseCards();