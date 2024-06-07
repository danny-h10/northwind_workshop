"use strict"

window.onload = () =>{
    
    console.log("yurr")

    populateTable();

}


async function populateTable(){

    let products = await getProducts();

    let tbody = document.querySelector("#searchPage")

    products.forEach((course) =>{
        buildRow(tbody, course)

})
}



async function buildRow(someTableBody, someData){

    let row = someTableBody.insertRow();

    let productIdCell = row.inserCell();
    productIdCell.innerHTML = someData.productId

    let productName = row.inserCell();
    productName.innerHTML = someData.productName

    let productPrice = row.inserCell();
    productPrice.innerHTML = someData.unitPrice

    let productDetails = row.inserCell();
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