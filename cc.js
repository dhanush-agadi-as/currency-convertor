const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const drop = document.querySelectorAll(".dropdown select");
let amt = document.querySelector(".amount input");
const fromCu = document.querySelector(".from select");
const toCu = document.querySelector(".to select");
const butt = document.querySelector("form button");
const mess = document.querySelector(".final_mess p");

document.addEventListener("load" , () => {
    update();
})

for(let select of drop){
    for(let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }    
    select.addEventListener("change" , (evt) => {
        changeFlag(evt.target);
    })
}


const changeFlag =  (elem) => {
    let cuuCode = elem.value;
    let conCode = countryList[cuuCode];
    let image = `https://flagsapi.com/${conCode}/flat/64.png`;
    let img = elem.parentElement.querySelector("img");
    img.src = image;
}

butt.addEventListener("click", (evt) => {
    evt.preventDefault();
    update();
    });

const update = async () => {
    if(amt.value === "" || amt.value < 1) {
        amt.value = "1";
    }
    let url = `${baseUrl}/${fromCu.value.toLowerCase()}.json`;
    let res = await fetch(url);
    let data = await res.json();
    let rate = data[fromCu.value.toLowerCase()][toCu.value.toLowerCase()];
    let final_amt = (amt.value * rate).toFixed(4);
    mess.innerText = `${amt.value} ${fromCu.value} = ${final_amt} ${toCu.value}`;

}