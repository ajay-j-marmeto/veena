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
