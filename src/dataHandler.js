import { renderDeletePopUp } from "./deletePopUp";
import { loadExCards } from "./excards";
export { deleteDataHandler };

// will loop through an array (array of exercise cards in excards.js) and will add event listen to both delete buttons on the exercises cards and event listerners on pop up buttons
async function deleteDataHandler(array) {
  try {
    let objArrray = await array;
    objArrray.forEach((obj) => {
      let btn = obj.dltBtn;
      btn.addEventListener("click", () => {
        let objID = obj.id;
        console.log(objID);
        let objTitle = obj.titleEl.innerText;
        let objImagePath = obj.imageEl.src;
        console.log(objTitle);
        let popUp = renderDeletePopUp();
        let popUpDltBtn = popUp.popUpD;
        let popUpCnlBtn = popUp.popUpC;
        let popUpcontainer = popUp.PopUpCon;
        const formData = {
          objTitle: objTitle,
          objImagePath: objImagePath,
        };
        console.log(formData);
        popUpDltBtn.addEventListener("click", async () => {
          const response = await fetch(`/exercise/${objID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            loadExCards();
            popUpcontainer.remove();
          } else {
            return console.log("reload error after attempting delete");
          }
          console.log("delete ran");
          console.log(response);
          const resData = await response.json(response);
          console.log(resData);
        });
        popUpCnlBtn.addEventListener("click", () => {
          console.log(popUpcontainer);
          popUpcontainer.remove();
        });
      });
    });
  } catch (err) {
    console.log(err.message);
  }
}
