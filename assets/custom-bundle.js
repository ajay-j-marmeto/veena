// let bundleBuyButton = document.querySelector("#custom-add-to-cart");
// console.log(bundleBuyButton);

// bundleBuyButton.addEventListener("click", (e) => {
//   let bundleProducts = document.querySelectorAll(
//     ".custom-bundle__checkbox-input:checked"
//   );
//   console.log(bundleProducts);

//   let allProducts = [];
//   bundleProducts.forEach((each) => {
//     allProducts.push({ id: each.dataset.bundleProduct });
//   });

//   fetch("cart/add.js", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       items: allProducts,
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     }),
//     console.log(allProducts);
// });

// if (document.querySelector("#customAtcBtn")) {
//   document.querySelector("#customAtcBtn").addEventListener("click", (event) => {
//     let customButton = event.target;
//     const variantId = customButton.dataset.variantId;
//     const quantity = customButton.dataset.quantity;
//     const cart =
//       document.querySelector("cart-drawer") ||
//       document.querySelector("cart-notification");
//     console.log(variantId);
//     console.log(quantity);
//     console.log(cart);
//     let formData = {
//       items: [
//         {
//           id: variantId,
//           quantity: quantity,
//         },
//       ],
//       sections: cart.getSectionsToRender().map((section) => section.id),
//     };
//     fetch("/cart/add.js", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((jsonData) => {
//         cart.renderContents(jsonData);
//       })
//       .catch((error) => {
//         console.log("Error:", error);
//       });
//   });
// }

//custom add to cart button with id customAtcBtn end

// let items = [];
document.querySelector("#custom-add-to-cart").addEventListener("click", () => {
  let productItems = [];
  let mainProductId = document.querySelector("#custom-add-to-cart").dataset
    .mainProduct;
  let mainProductqty = document.querySelector("#custom-add-to-cart").dataset
    .mainProductQuantity;
  console.log("updated main product", mainProductId, mainProductqty);

  document
    .querySelectorAll(".custom-bundle__checkbox-input:checked")
    .forEach((item) => {
      if (item.checked) {
        productItems.push({
          id: item.dataset.productId,
          quantity: 1,
        });
      }
    });
  productItems.push({ id: mainProductId, quantity: mainProductqty });

  console.log(productItems);

  const cart =
    document.querySelector("cart-notification") ||
    document.querySelector("cart-drawer");
  console.log(cart);

  let formData = {
    items: productItems,
    sections: cart.getSectionsToRender().map((section) => section.id),
  };
  console.log(formData);

  fetch(window.Shopify.routes.root + "cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      cart.renderContents(res);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});



// let btns = document.querySelectorAll(".custom-color-family-btn")
// btns.forEach(each=>{
  
//   each.addEventListener("click",()=>{
//     let subColorsContainer = document.querySelector(".sub-colors-family")

//     subColorsContainer.innerHTML = ""

//     let dataObj = JSON.parse(each.dataset.colorObj);
//     let colorProductsData = JSON.parse(each.dataset.colorFamilyProducts);
//     console.log(colorProductsData);
    
//     let products = dataObj.color_products
//     let subColors = dataObj.sub_colors
//     console.log(products,subColors);
//     for(let i=0; i<products.length; i++){
//       subColorsContainer.innerHTML+=`
//       <a href="/products/full-sleeve-high-neck-t-shirt?variant=43818439999696">
//         <div style="background-color:${subColors[i]};" class="color-family">
//         </div>
//       </a>
//       `
//     }
//     // subColors.forEach(eachColor=>{
//     //   subColorsContainer.innerHTML+=`
//     //   <a href="/products/full-sleeve-high-neck-t-shirt?variant=43818439999696">
//     //     <div style=" background-color:${eachColor}; width:50px; height:50px; border-radius:50%; display:inline-block;">
//     //     </div>
//     //   </a>
//     //   `

//     // })
    
//   })
// })


// let btns = document.querySelectorAll(".custom-color-family-btn")
// btns.forEach(each => {
//   each.addEventListener("click", () => {
//     let subColorsContainer = document.querySelector(".sub-colors-family")
//     subColorsContainer.innerHTML = ""
    
//     let dataObj = JSON.parse(each.dataset.colorObj);
//     let colorProductsData = JSON.parse(each.dataset.colorFamilyProducts);

    
//     let products = dataObj.color_products;
//     let subColors = dataObj.sub_colors;
    
//     for (let i = 0; i < products.length; i++) {

//       subColorsContainer.innerHTML += `
//         <a href="/products/${colorProductsData[i].handle}">
//           <div style="background-color:${subColors[i]};" class="color-family">
//           </div>
//         </a>
//       `;
//     }
//   });
// });


// class CustomColorFamily extends HTMLElement {
//   constructor() {
//       super();
//       this.addEventListener("click",()=>{
//         let subColorsContainer = this.querySelector(".sub-colors-family")
//         subColorsContainer.innerHTML = ""
        
//         let dataObj = JSON.parse(this.dataset.colorObj);
//         let colorProductsData = JSON.parse(this.dataset.colorFamilyProducts);
    
        
//         let products = dataObj.color_products;
//         let subColors = dataObj.sub_colors;
        
//         for (let i = 0; i < products.length; i++) {
    
//           subColorsContainer.innerHTML += `
//             <a href="/products/${colorProductsData[i].handle}">
//               <div style="background-color:${subColors[i]};" class="color-family">
//               </div>
//             </a>
//           `;
//         }
//       });

//   }

// }

// customElements.define("custom-color-family", CustomColorFamily)