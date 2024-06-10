"use strict"

window.onload = () =>{
    
    console.log("yurr")

    // initViewAllDD();

    // let allDropdown = document.querySelector("#productSearchDDL")

    // allDropdown.addEventListener("change", populateTable)

    populateTable();

    initCatDrop();

    let catdropdown = document.querySelector("#categorySearchDDL")

    catdropdown.addEventListener("change", loadCatTable)

}

async function populateTable(){

    let products = await getProducts();

    let tbody = document.querySelector("#productTableBody")

    products.forEach((product) =>{
        buildRow(tbody, product)

})
}


async function initViewAllDD(){

   

}


async function initCatDrop(){

    let categories = await getCategories();

    let dropDown = document.querySelector("#categorySearchDDL")

    let defaultOption = document.createElement("option")

    defaultOption.textContent = "Choose a Category"
    defaultOption.value = ""

    dropDown.appendChild(defaultOption)

    categories.forEach((data) =>{
        let newOption = document.createElement("option");

        newOption.value = data.categoryId

        newOption.textContent = data.name

        dropDown.appendChild(newOption);

    })
}


async function loadCatTable(event) {

    let dropdown = event.target
    let tableBody = document.querySelector("#categoryTableBody")


    let selectedCats = event.target.value

    let products = await getProducts();

    let matchingCats = products.filter((data) => {

        return `${data.categoryId}` === selectedCats;
    })

    tableBody.innerHTML = ""

    matchingCats.forEach((data) => {
        buildCatRow(tableBody, data)
    })

}




async function buildCatRow(catTableBody, Catdata){

    let row = catTableBody.insertRow();

    let catIdCell = row.insertCell();
    catIdCell.innerHTML = Catdata.categoryId

    let catDescCell = row.insertCell();
    catDescCell.innerHTML = Catdata.productName
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
    productDetails.innerHTML = `<a href="./product_detail.html?categoryId=${someData.categoryId}">Show Details</a>`

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


async function getCategories(){

    try{
        let response = await fetch("http://localhost:8081/api/categories")

        let categories = await response.json();

        return categories
    }catch(err){
    console.log(err)
    throw new Error(err)
    }

}