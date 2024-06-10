"use strict"

window.onload = () =>{
    
    console.log("yurr")

    populateTable();

}

function hideShowRadio(event) {

    if (event.target.value === "Type") {
        showElement("#typeDropdown")
        hideElement("#locationDropdown")
    } else {
        showElement("#locationDropdown")
        hideElement("#typeDropdown")
    }
}


async function populateTable(){

    let products = await getProducts();

    let tbody = document.querySelector("#productTableBody")

    products.forEach((course) =>{
        buildRow(tbody, course)

})
}



async function buildRow(someTableBody, someData){

    let row = someTableBody.insertRow();

    let productIdCell = row.insertCell();
    productIdCell.innerHTML = someData.productId

    let productName = row.insertCell();
    productName.innerHTML = someData.productName

    let productPrice = row.insertCell();
    productPrice.innerHTML = someData.unitPrice

    let productDetails = row.insertCell();
    productDetails.innerHTML = `<a href="./product_details.html?categoryId=${someData.categoryId}">Show Details</a>`

}


async function getProducts(){

    try{
    let response = await fetch("http://localhost:8081/api/products")

    let products = await response.json();

    return products
    }catch(err){
    console.log(err)
    throw new Error(err)
}

}


function hideElement(someSelector) {
    let el = document.querySelector(someSelector);
    el.style.display = "none";
}


function showElement(someSelector) {
    let el = document.querySelector(someSelector);
    el.style.display = "block";
}