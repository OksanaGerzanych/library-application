const initialData = [
    

]


const root = document.querySelector('#root');
console.log(root);

const leftDiv = document.createElement('div')
leftDiv.classList.add("left")

const rightDiv = document.createElement('div')
rightDiv.classList.add("right")

root.append(leftDiv, rightDiv);
console.log(root)

const title = document.createElement("h1");
title.textContent = "LIBRARY";
title.classList.add("title");
const list = document.createElement('ul');
list.classList.add("list");
const button = document.createElement("button");
button.textContent = "ADD"
button.classList.add("button");


leftDiv.append(title, list, button);

