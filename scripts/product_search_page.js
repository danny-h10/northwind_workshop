"use strict"

window.onload = () => {

    console.log("yurr")

    let allDropdown = document.querySelector("#productSearchDDL")

    allDropdown.addEventListener("change", populateTable)


    initCatDrop();

    let catdropdown = document.querySelector("#categorySearchDDL")
    catdropdown.classList.add("d-none")
    catdropdown.addEventListener("change", loadCatTable)

}

async function populateTable(event) {

    let products = await getProducts();

    let catdropdown = document.querySelector("#categorySearchDDL")
    catdropdown.classList.add("d-none")

    let tbody = document.querySelector("#productTableBody")

    tbody.innerHTML = ""

    let selectedSearch = event.target.value


    if (selectedSearch === "viewAll") {
        products.forEach((product) => {
            buildRow(tbody, product)
        })
    }else{
        catdropdown.classList.remove("d-none")
    }
}

async function initCatDrop() {

    let categories = await getCategories();

    let dropDown = document.querySelector("#categorySearchDDL")

    let defaultOption = document.createElement("option")

    defaultOption.textContent = "Choose a Category"
    defaultOption.value = ""

    dropDown.appendChild(defaultOption)

    categories.forEach((data) => {
        let newOption = document.createElement("option");

        newOption.value = data.categoryId

        newOption.textContent = data.name

        dropDown.appendChild(newOption);

    })
}


async function loadCatTable(event) {

    let selectedCategory = event.target.value

    let products = await getFilteredProducts(selectedCategory);


    let tbody = document.querySelector("#productTableBody")

    tbody.innerHTML = ""

    products.forEach((product) => {
        buildRow(tbody, product)

    })

}


async function buildRow(someTableBody, someData) {

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


async function getProducts() {

    try {
        let response = await fetch("http://localhost:8081/api/products")

        let products = await response.json();

        return products
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

}

async function getFilteredProducts(categoryId) {

    try {
        let response = await fetch("http://localhost:8081/api/products/bycategory/" + categoryId)

        let products = await response.json();

        return products
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

}

async function getCategories() {

    try {
        let response = await fetch("http://localhost:8081/api/categories")

        let categories = await response.json();

        return categories
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

}