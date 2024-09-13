const productsCont = document.querySelector(".productsCont");

let products = localStorage.getItem("products");
function removeProductItem(id) {
  products = products.filter((item) => item.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}
function inDeincreaseValue(isSet, id, value, isInc) {
  let pcs = 0;
  console.log(value);
  if (isInc) {
    products.forEach((item) => {
      if (id === item.id) {
        if (!isSet) item.pcs += value;
        else item.pcs = value;
        pcs = item.pcs;
      }
    });
  } else {
    products.forEach((item) => {
      if (id === item.id) {
        if (!isSet) item.pcs -= value;
        else item.pcs = value;
        pcs = item.pcs;
      }
    });
  }
  localStorage.setItem("products", JSON.stringify(products));
  return pcs;
}
function clickHandInDeinc(element, id, value, isInc = true) {
  let pcs = inDeincreaseValue(false, id, value, isInc);
  if (isInc) {
    element.nextElementSibling.value = pcs;
  } else {
    element.previousElementSibling.value = pcs;
  }
}
function renderProducts() {
  productsCont.innerHTML = "";
  let categoryItem = `  
  <div class="row g-3 d-none d-lg-flex mx-0 font-weight-bold border-bottom pb-3">
  <div class="col-6">محصول</div>
  <div class="col-2 text-center">تعداد</div>
  <div class="col-2 text-center">قیمت واحد</div>
  <div class="col-2 text-center">جمع کل</div>
  </div>`;

  productsCont.innerHTML += categoryItem;

  if (!products) return;
  if (typeof products !== "object") products = JSON.parse(products);
  products.forEach((item) => {
    let product = `
        <div  class="row gx-4 mx-0 font-weight-bold py-lg-3 border-bottom">
                        <div class="col-12 border-bottom border-bottom-lg-0 py-3 py-lg-0 col-lg-6">
                            <div class="d-flex align-items-center gap-3 ps-3">
                                <a
                                onclick="removeProductItem(${item.id})"
                                    class="pink-hover order-last order-lg-first cursor-pointer flex-shrink-0 w-24 h-24 rounded-2 btn-pink d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff6377"
                                        class="bi bi-x" viewBox="0 0 16 16">
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </a>
                                <img alt="img" src="assets/images/06-34-55_640752978217b.png"
                                    class="w-61 h-61 d-block rounded-3">
                                <div class="d-flex align-items-center gap-2 flex-wrap">
                                    <p class="font-weight-bold">
                                    ${item.dsc}
                                    </p>
                                    <img alt="img" src="assets/images/05-24-24_600a305055b6f.svg"
                                        class="w-18 h-18 d-block rounded-2">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-12 border-bottom border-bottom-lg-0 py-3 py-lg-0 d-flex align-items-center justify-content-between justify-content-lg-center gap-2">
                            <p class="d-lg-none">تعداد</p>
                            <div class="quantity gap-2 d-flex align-items-center justify-content-center">
                                <button onclick="clickHandInDeinc(this,${item.id},1)" class="btn btn-icon btn-default" type="button">
                                    <i class="fa fa-plus"></i>
                                </button>
                                <input oninput="inDeincreaseValue(true,${item.id},Number(this.value),false)" type="number" value="${item.pcs}" class="mb-0" min="1" max="25" title="تعداد">
                                <button onclick="clickHandInDeinc(this,${item.id},1,false)"class="btn btn-icon btn-default" type="button">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-2 col-12 border-bottom border-bottom-lg-0 py-3 py-lg-0 text-center fs-18 d-flex align-items-center justify-content-between justify-content-lg-center gap-2">
                            <p class="d-lg-none">قیمت واحد</p>
                            <p>  ${item.price} ${item.currency}</p>
                        </div>
                        <div
                            class="col-lg-2 col-12 py-3 py-lg-0 text-center text-success2 fs-20 d-flex align-items-center justify-content-between justify-content-lg-center gap-2">
                            <p class="d-lg-none">جمع کل</p>
                            <p>  ${item.price} ${item.currency}</p>
                        </div>
                    </div>`;
    productsCont.innerHTML += product;
  });
}
renderProducts();
