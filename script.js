document.addEventListener('DOMContentLoaded', fetchdata);
function fetchdata()
{
    fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448")
    .then(response=>response.json())
    .then(data=>{
        displayproduct(data.product)
    })
    .catch(error=>
        {
            console.log(error);
        })
}

function displayproduct(product)
{
    document.getElementById("vendor").textContent = product.vendor;
    document.getElementById("title").textContent = product.title;
    document.getElementById("price").textContent = product.price;
    document.getElementById("compare_at_price").textContent = product.compare_at_price;
    document.getElementById("desc").innerHTML = product.description;

    const counterElement = document.getElementById('counter');
    const increaseButton = document.getElementById('increaseBtn');
    const decreaseButton = document.getElementById('decreaseBtn');
    let percentageDifferenceElement = document.getElementById("percentage_difference");
    let price  =product.price;
    let priceWithoutDollarSign = price.replace("$", "");
    let priceAsInt = parseInt(priceWithoutDollarSign);
    let compareAtPrice = product.compare_at_price;
    let compareAtPriceWithoutDollarSign = compareAtPrice.replace("$", "");
let compareAtPriceAsInt = parseInt(compareAtPriceWithoutDollarSign);
    let absoluteDifference = Math.abs(priceAsInt - compareAtPriceAsInt);
    var percentageDifference = (absoluteDifference / priceAsInt) * 100;
    percentageDifferenceElement.textContent =  percentageDifference.toFixed(2) + "%" + " Off";
    const colorContainer = document.getElementById('color-container');
    colorContainer.innerHTML = ''; 
    
    const container = document.getElementById('color-container');
    product.options.forEach(option => {
    option.values.forEach((value, index) => {
        const colorName = Object.keys(value)[0];
        const colorCode = value[colorName];
        const colorDiv = document.createElement('div');
        colorDiv.className ='color-item';
        colorDiv.style.backgroundColor = colorCode;
        container.appendChild(colorDiv);
       
    })
});

    const sizeOptions = product.options.find(option => option.name === "Size");
    const sizeValues = sizeOptions.values;

    const sizecontainer = document.getElementById('product-options');
    sizeValues.forEach((size) => {
        const sizeDiv = document.createElement('div');
        sizeDiv.textContent = `${size}`;
        sizeDiv.className = 'size-item';
        sizecontainer.appendChild(sizeDiv);
    });

    let count = 0;
    function updateCount() {
        counterElement.textContent = count;
      }

      increaseButton.addEventListener('click', function() {
        count++;
        updateCount();
      });

      decreaseButton.addEventListener('click', function() {
        count--;
        updateCount();
      });
      const cart_display = document.getElementById('cart')
      cart_display.addEventListener('click',function()
      {
        const cart = document.getElementById('cart-display')
        cart.textContent = "Your " +  `${product.title}` + "  added";
        cart.className = 'cart'
      })
}