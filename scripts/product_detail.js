"use strict"

window.onload = () =>{
    

    console.log("yurrrr details")

    const urlParams = new URLSearchParams(location.search);

    console.log(urlParams.get("categoryId"))

    if(urlParams.has("categoryId")){

        //if we have courseid display its details
        displayCourseDetails(urlParams.get("categoryId"))

    }else{
        //let them know we didnt have a valid course id and send them back to courses
        alert("no valid category id");
        window.location.href = "./index.html";
    }

    }

    async function displayCourseDetails(categoryId){

        //get the course details
        let productDetails = await getProductDetails(categoryId);
    
       console.log(productDetails)
    
       //get the div where we want to put the details for the course
       let productDetailsDiv = document.querySelector("#productDetails")
    
       //JSON stringify the output 
       productDetailsDiv.innerHTML = `
        <div>Id: ${productDetails.productId}</div>
        <div>Name: ${productDetails.productName}</div>
        <div>Price: ${productDetails.unitPrice}</div>
        <div>Stock: ${productDetails.unitsInStock}</div>
        <div>Category Id: ${productDetails.categoryId}</div>
         <div>Supplier: ${productDetails.supplier}</div>
          <div>Discontinued: ${productDetails.discontinued}</div>
       `
    }

    async function getProductDetails(categoryId){

        try{
    
        //use fetch to get the details for the specific course
        let response = await fetch("http://localhost:8081/api/products/" + categoryId)
    
        //deal with the response
        let data = await response.json();
    
        return data
    
    
    }catch(err) {
        console.log(err);
        throw new Error(err)
    }
    
    }