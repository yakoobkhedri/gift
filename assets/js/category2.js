const cartProducts = document.getElementById("cartProducts");
const productLength = document.getElementById("productLength");
let products;
function inDeincreaseValue(isSet, id, value, isInc, input = null) {
  let pcs = "";
  if (Number(value) && value)
    if (isInc) {
      products.forEach((item) => {
        if (id === item.id) {
          if (!isSet) item.pcs += Number(value);
          else item.pcs = Number(value);
          if (item.pcs < 1) item.pcs = 1;
        }
      });
    } else {
      products.forEach((item) => {
        if (item.pcs > 1 && id === item.id) {
          if (!isSet) item.pcs -= Number(value);
          else item.pcs = Number(value);
        } else {
          item.pcs = 1;
        }
      });
    }
  localStorage.setItem("products", JSON.stringify(products));
  console.log(pcs);
  if (input) {
    if (pcs && pcs !== Number(input.value)) {
      if (pcs) input.value = pcs;
      else input.value = 1;
    }
  }

  return pcs;
}
function clickHandInDeinc(element, id, value, isInc = true) {
  inDeincreaseValue(false, id, value, isInc);
  createProductsCart();
}
function removeProductItem(id) {
  products = products.filter((item) => item.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  createProductsCart();
}
function createProductsCart() {
  productLength.textContent = 0;
  if (!localStorage.getItem("products")) {
    cartProducts.style =
      "display:flex;align-items:center;justify-content:center;";
    cartProducts.textContent = "سبد خرید شما خالی است";
    return;
  }
  products = JSON.parse(localStorage.getItem("products"));
  if (products.length > 0) {
    cartProducts.style = "";
    cartProducts.textContent = "";
  } else {
    cartProducts.style =
      "display:flex;align-items:center;justify-content:center;";
    cartProducts.textContent = "سبد خرید شما خالی است";
    return;
  }
  productLength.textContent = products.length;

  products.forEach((product) => {
    let item = `    <div class="row g-3 mx-0 font-weight-bold py-2 border-bottom">
                    <div class="col-12">
                      <div class="d-flex flex-row align-items-center gap-2">
                        <div
                          class="d-flex align-items-center w-100 gap-2 position-relative"
                        >
                          <a
                          onclick="removeProductItem(${product.id})"
                            class="btnUnRemoveClass m-1 position-absolute top-0 cursor-pointer flex-shrink-0 w-24 h-24 rounded-2 btn-pink d-flex align-items-center justify-content-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#ff6377"
                              class="bi bi-x"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                              />
                            </svg>
                          </a>
                          <img
                            alt="img"
                            src="assets/images/06-34-55_640752978217b.png"
                            class="w-61 h-61 d-block rounded-3"
                          />
                        </div>
                        <div class="d-flex align-items-center gap-2">
                          <p class="font-weight-bold fs-12">
                           ${product.dsc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12 d-flex align-items-center justify-content-between gap-2"
                    >
                      <p class="font-weight-bold">تعداد</p>
                      <div
                        class="quantity gap-2 d-flex align-items-center justify-content-center"
                      >
                        <button
                         onclick="clickHandInDeinc(this,${product.id},1)"
                          class="btnUnRemoveClass btn btn-icon btn-default"
                          type="button"
                        >
                          <i class="fa fa-plus"></i>
                        </button>
                        <input
                          type="text"
                          value="${product.pcs}"
                          class="numeric mb-0"
                          min="1"
                          max="25"
                          title="تعداد"
                          oninput="inDeincreaseValue(true,${
                            product.id
                          },this.value,true,this)"
                          onblur=" createProductsCart();"
                        />
                        <button
                         onclick="clickHandInDeinc(this,${product.id},1,false)"
                          class="btnUnRemoveClass btn btn-icon btn-default"
                          type="button"
                        >
                          <i class="fa fa-minus"></i>
                        </button>
                      </div>
                    </div>
                    <div
                      class="col-12 mt-3 fs-18 font-weight-bold text-center d-flex align-items-center justify-content-between gap-2"
                    >
                      <p class="font-weight-bold">قیمت واحد</p>
                      <p>${product.price} ${product.currency}</p>
                    </div>
                    <div
                      class="col-12 text-center fs-18 font-weight-bold text-success2 d-flex align-items-center justify-content-between gap-2"
                    >
                      <p class="font-weight-bold">جمع کل</p>
                      <p class="fs-18 font-weight-bold">${Number(
                        Number(product.price.replace(/\,/g, "")) * product.pcs
                      ).toLocaleString()} ${product.currency}</p>
                    </div>
                  </div>`;
    cartProducts.innerHTML += item;
  });
}
createProductsCart(true);
