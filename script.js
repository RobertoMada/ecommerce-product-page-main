const imageCarrousel = ["image-product-1.jpg", "image-product-2.jpg", "image-product-3.jpg", "image-product-4.jpg"]

function Product(name, price, quantity){
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}

const imageDisplay = document.getElementById("image-display");
const galaryMainImage= document.getElementById("gallery-image");
const previuosButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const navToggle = document.querySelector('.mobile-nav-toggle');
const closeButton = document.querySelector('.close-button'); 
const primaryNav = document.querySelector('.primary-navigation');
const shoppingCartButton = document.querySelector('.shopping-cart');
const cartContainer = document.querySelector('.cart-container');
const secondaryImages = Array.from(document.querySelector('.secondary-image').getElementsByTagName('div')); 
const minusQuantity = document.querySelector('.minus');
const plusQuantity = document.querySelector('.plus');
const displayedQuantity = document.querySelector('.quantity');
const imageGallery = document.querySelector('.image-gallery');
const closeGalleryBtn = document.querySelector('.close-gallery');
const previousGallery = document.querySelector('.previous-gallery');
const nextGallery = document.querySelector('.next-gallery');
const addButton = document.querySelector('.add-button');

let quantity  = parseInt(displayedQuantity.textContent);
let index = 0;
let shoppingCart = [];

function toggleNavigation (){
  primaryNav.classList.toggle('opened');
}

function toggleCart (){
  cartContainer.classList.toggle('opened');
}


function nextImage(){
  if(index === imageCarrousel.length - 1){
    index = 0;
  }else{
    index++;
  }
  changeImage();
}

function previousImage(){
  if(index === 0){
    index = imageCarrousel.length - 1;
  }else{
    index--;
  }
  changeImage();
}

function changeImage(){
  imageDisplay.src = `images/${imageCarrousel[index]}`;
  galaryMainImage.src = `images/${imageCarrousel[index]}`;
}

function minus(){
  if(quantity !== 0){
    quantity--;
    displayedQuantity.textContent = quantity.toString();
  }
}

function plus(){
  if(quantity < 10){
    quantity++;
    displayedQuantity.textContent = quantity.toString();
  }
}

function openGallery(){
  if(window.innerWidth >= 800){
    imageGallery.classList.toggle('opened');
  galaryMainImage.src = `images/${imageCarrousel[index]}`;
  }
}

function closeGallery(){
  imageGallery.classList.toggle('opened');
}

nextButton.onclick = nextImage;
previuosButton.onclick = previousImage;
navToggle.onclick = toggleNavigation;
closeButton.onclick = toggleNavigation;
shoppingCartButton.onclick = toggleCart;
minusQuantity.onclick = minus;
plusQuantity.onclick = plus;
imageDisplay.onclick = openGallery;
closeGalleryBtn.onclick = closeGallery;
previousGallery.onclick = previousImage;
nextGallery.onclick = nextImage;
addButton.onclick = addToCart;

secondaryImages.forEach(image => {
  image.addEventListener('click', function(e){
    document.querySelector('.selected').classList.remove('selected');
    index = e.target.id;
    changeImage();
    
    e.target.parentElement.classList.add('selected');
  });
});


/* Shopping Cart Logic */

function addToCart(){
  if(quantity > 0){
    const newProduct = createProduct();
    const product = newProduct.name;
    if(checkProductInCart(product) === -1){
      shoppingCart.push(newProduct);
      displayProduct(newProduct);
    }else{
      shoppingCart[checkProductInCart(product)].quantity += newProduct.quantity;

    } 
  }
}

function createProduct(){
  const name = document.getElementById('product-title').innerText;
  const price = document.getElementById('price').innerText.split(' ')[0];
  return new Product(name, price, quantity);
}

function checkProductInCart (name){
  return shoppingCart.findIndex((product) => product.name === name);
}

function displayProduct(product){
  const gridCart = document.querySelector('.grid-cart');
  const textEmpty = document.querySelector('.cart-products')
  gridCart.removeChild(textEmpty);
  const flexCart = document.createElement('div');
  const productImage = document.createElement('img');
  const productDescription = document.createElement('div');
  const productName = document.createElement('p');
  const productPrice = document.createElement('p')
  const productQuantity = document.createElement('span');
  const productTotal = document.createElement('span');
  const deleteButton = document.createElement('button');
  const checkoutButton = document.createElement('button');
  deleteButton.classList.add('delete');
  checkoutButton.classList.add('checkout');
  checkoutButton.textContent = 'Checkout';
  productTotal.classList.add('fw-bold');
  productTotal.classList.add('text-neutral-black');
  productImage.setAttribute('src', 'images/image-product-1-thumbnail.jpg');
  flexCart.classList.add('flex-cart');
  gridCart.appendChild(flexCart);
  flexCart.appendChild(productImage);
  flexCart.appendChild(productDescription);
  flexCart.appendChild(deleteButton);
  gridCart.appendChild(checkoutButton);
  productQuantity.innerText = product.quantity;
  productDescription.appendChild(productName);
  productDescription.appendChild(productPrice);
  productPrice.textContent = `${product.price} x ${product.quantity}`;
  productName.textContent = product.name;  
  deleteButton.addEventListener('click', function(){
    gridCart.removeChild(flexCart);
    gridCart.removeChild(checkoutButton);
    shoppingCart.pop();
    gridCart.appendChild(textEmpty);
  })
}
