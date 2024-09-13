$(document).ready(function () {
  // Description collapse button click handler
  $(".btn-toggle-description").on("click", function () {
    let topDescription = $(this).closest(".category-description");
    if (topDescription.hasClass("collapse")) {
      $(this).removeClass("collapse");
      topDescription.removeClass("collapse");
      $(this).text("پنهان کردن");
    } else {
      $(this).addClass("collapse");
      topDescription.addClass("collapse");
      $(this).text("اطلاعات بیشتر");
    }
  });

  function handelCategoryDescription(categoryId) {
    const selector = `#category-${categoryId} .category-description`;
    const categoryDescription = $(selector);
    if (categoryDescription.length) {
      topDescriptionHeight = document.querySelector(selector).clientHeight;
      if (topDescriptionHeight > 150) {
        categoryDescription.find(".btn-toggle-description").click();
      } else {
        categoryDescription.find(".btn-toggle-description").addClass("d-none");
      }
    }
  }

  if (typeof selectedCategoryId != "undefined") {
    handelCategoryDescription(selectedCategoryId);
  }

  var coupon = null;

  // Hover for dropdowns
  $(".dropdown, .dropdown-submenu").hover(
    function () {
      if ($(window).width() >= 1024) {
        $(this).addClass("show");
        $(this)
          .find("> .dropdown-menu")
          .addClass("show")
          .attr("data-bs-popper", "static");
        $(this)
          .find("> .dropdown-toggle")
          .addClass("show")
          .attr("aria-expanded", "true");
      }
    },
    function () {
      $(this).removeClass("show");
      $(this)
        .find("> .dropdown-menu")
        .removeClass("show")
        .removeAttr("data-bs-popper");
      $(this)
        .find("> .dropdown-toggle")
        .removeClass("show")
        .attr("aria-expanded", "false");
    }
  );

  $(".dropdown, .dropdown-submenu").click(function () {
    if ($(this).hasClass("show")) {
      $(this).removeClass("show");
      $(this)
        .find("> .dropdown-menu")
        .removeClass("show")
        .removeAttr("data-bs-popper");
      $(this)
        .find("> .dropdown-toggle")
        .removeClass("show")
        .attr("aria-expanded", "false");
    } else {
      $(this).addClass("show");
      $(this)
        .find("> .dropdown-menu")
        .addClass("show")
        .attr("data-bs-popper", "static");
      $(this)
        .find("> .dropdown-toggle")
        .addClass("show")
        .attr("aria-expanded", "true");
    }
  });

  // Define tooltip
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll(
      "[data-toggle='tooltip'], [rel='tooltip'], .has-tooltip"
    )
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Parallax effect controllers
  var svgRight =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="fill:#575757;enable-background:new 0 0 477.175 477.175;" xml:space="preserve"><g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
    svgLeft =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="fill:#575757;enable-background:new 0 0 477.175 477.175;" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>';

  // Owl carousels init for home carousel
  $("#owl-main").owlCarousel({
    rtl: true,
    loop: true,
    dots: true,
    nav: true,
    navText: [svgRight, svgLeft],
    autoplay: true,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    animateOut: "zoomOutTiny",
    animateIn: "zoomInTiny",
    margin: 0,
    items: 1,
  });

  // $("#owl-reviews").owlCarousel({
  //     items: 3,
  //     loop: true,
  //     margin: 10,
  //     autoplay: true,
  //     autoplayTimeout: 5000,
  //     autoplayHoverPause: true,
  //     responsive: {
  //         0: {
  //             items: 1
  //         },
  //         600: {
  //             items: 2
  //         },
  //         1000: {
  //             items: 3
  //         }
  //     }
  // });

  // Main scroll function
  function scrollTo(target, offset) {
    // Scroll to top
    $("html, body").animate(
      {
        scrollTop: target.offset().top - offset,
      },
      500
    );
  }

  function setProgressbar() {
    var currenttab = $("ul.tabs li.current").attr("data-tab");

    if (currenttab == "tab-1") {
      $(".tabs-box").attr("class", "tabs-box");
    } else if (currenttab == "tab-2") {
      $(".tabs-box").attr("class", "tabs-box half");
    } else {
      $(".tabs-box").attr("class", "tabs-box full");
      setColumnsHeight();
    }
  }

  $("ul.tabs li").click(function () {
    var tabId = $(this).attr("data-tab");

    $(".tab-content").addClass("hide");
    $("#" + tabId).removeClass("hide");

    $("ul.tabs li").removeClass("current");
    $(this).addClass("current");

    setProgressbar();
  });

  // User select category event
  $(".category").click(function () {
    if (!$(this).hasClass("disabled")) {
      //content
      $(".tab-content").addClass("hide");
      $("#tab-2").removeClass("hide");

      //tab
      $("ul.tabs li").removeClass("current");
      $("ul.tabs li:eq(1)").removeClass("disabled");
      $("ul.tabs li:eq(1)").addClass("current");
      setProgressbar();

      var categoryId = parseInt($(this).attr("data-id"));
      $(".category").removeClass("active");
      $(".category[data-id=" + categoryId + "]").addClass("active");

      if (categoryId) {
        if ($("#category-" + categoryId).hasClass("hide")) {
          $(".category-products").addClass("hide");
          $("#category-" + categoryId).removeClass("hide");
        }
      }

      // Description
      const selector = `#category-${categoryId} .category-description`;
      const categoryDescription = $(selector);
      if (categoryDescription.hasClass("d-none")) {
        let description = "";
        categories.forEach(function (item) {
          if (item.id == categoryId) {
            description = item.description;
          }
        });
        if (description != "") {
          categoryDescription.find(".text").html(description);
          categoryDescription.removeClass("d-none");

          // Check inner btn-toggle-description should be visible or not
          handelCategoryDescription(categoryId);
        }
      }

      if ($(document).width() < 768) {
        extraScroll = 120;
      } else {
        extraScroll = 150;
      }
      $([document.documentElement, document.body]).animate(
        {
          scrollTop:
            $(".category-products:not('.hide')").offset().top - extraScroll,
        },
        500
      );
    }
  });
  Array.from($(".product")).forEach((item, index) => {
    item.setAttribute("productId", index);
  });
  $(".product").click(function (e) {
    if(e.target.closest(".requestProduct")){
      Swal.fire({
        title: "ارسال شد",
        text: "درخواست موجود کردن محصول ارسال شد",
        icon: "warning",
        confirmButtonText: "تایید",
      });
      return
    };
    let products = localStorage.getItem("products");
    let pcs = 1;
    if (products) products = JSON.parse(products);
    else products = [];
    let product = {
      dsc: this.querySelector("h3").textContent.trim(),
      price: this.querySelector(".price").textContent.trim(),
      currency: this.querySelector(".currency").textContent.trim(),
      image: this.querySelector("img").src,
      id: Number(this.getAttribute("productId")),
      pcs: 1,
    };
    let isFound = false;
    products.forEach((item) => {
      if (item.id === product.id) {
        isFound = true;
        item.pcs += 1;
        pcs = item.pcs;
      }
    });
    if (!isFound) products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    Swal.fire({
      title: "اضافه شد",
      text: "محصول به سبد خرید اضافه شد, تعداد : " + pcs,
      icon: "success",
      confirmButtonText: "تایید",
    });
  });
  // User select product event
  // $(".product").click(function () {
  //     //content
  //     $(".tab-content").addClass("hide");
  //     $("#tab-3").removeClass("hide");

  //     //tab
  //     $("ul.tabs li").removeClass("current");
  //     $("ul.tabs li:eq(2)").addClass("current");
  //     $("ul.tabs li:eq(2)").removeClass("disabled");
  //     setProgressbar();

  //     var productId = parseInt($(this).attr("data-id"));
  //     $(".product").removeClass("active");
  //     $(".product[data-id=" + productId + "]").addClass("active");

  //     var productPrice = parseInt($(this).attr("data-price"));
  //     var max = parseInt($(this).attr("max"));
  //     var min = parseInt($(this).attr("min"));

  //     if (productId) {
  //         $("#selected-product .title").text($(this).find("h3").text());
  //         $("#selected-product-image").attr("src", $(this).find("img").attr("src"));
  //         if($(this).closest(".product-box").find(".btn-product-info").length){
  //             $("#selected-product .btn-product-info").removeClass("hide");
  //             $("#selected-product .title").addClass("cursor-pointer");
  //         } else {
  //             $("#selected-product .btn-product-info").addClass("hide");
  //             $("#selected-product .title").removeClass("cursor-pointer");
  //         }

  //         selectedProduct = productId;
  //         selectedProductPrice = productPrice;
  //         maxQty = max;
  //         $("#txt-qty").attr("max", max);
  //         if (parseInt($("#txt-qty").val()) > max) {
  //             $("#txt-qty").val(max);
  //         }
  //         $("#txt-qty").attr("min", min);
  //         if (parseInt($("#txt-qty").val()) < min) {
  //             $("#txt-qty").val(min);
  //         }
  //         $("#product-not-selected").addClass("hide");
  //         calcBill();

  //         if($(document).width() < 768){
  //             extraScroll = 120;
  //         }else{
  //             extraScroll = 150;
  //         }
  //         $([document.documentElement, document.body]).animate({
  //             scrollTop: $(".information-box").offset().top - extraScroll
  //         }, 500);
  //     }

  //     // Other fields
  //     // دسته‌ای که انتخاب شده است
  //     $("#other-fields").html("");
  //     let categoryId = $(this).closest(".category-products").attr("id");
  //     categoryId = categoryId.replace("category-", "");
  //     let fields = '';
  //     categories.forEach(function(item){
  //         if(item.id == categoryId){
  //             fields = item.fields;
  //         }
  //     });

  //     if(fields.length){
  //         fields.forEach(function(item){
  //             let input = '';
  //             if(item.statics_key == 'description'){
  //                 input = `<textarea value="${item.value}"  name="${item.name}" class="form-control ${item.class}" placeholder="" data-validation="${item.validation}" title="${item.title}" ${(item.required) ? 'required' : ''}></textarea>`;
  //             } else {
  //                 input = `<input value="${item.value}" type="text" name="${item.name}" class="form-control ${(item.ltr) ? 'ltr' : ''} ${item.class}" placeholder="" data-validation="${item.validation}" title="${item.title}" ${(item.required) ? 'required' : ''}>`;
  //             }
  //             let html = `
  //                 <div class="${item.col}">
  //                     <div class="form-group">
  //                         <label>${item.title}<span class="small">${(item.required) ? '(اجباری)' : '(اختیاری)'}</span></label>
  //                         <div class="input-group">
  //                             <span class="input-group-addon">
  //                                 <i class="${item.icon}"></i>
  //                             </span>
  //                             ${input}
  //                         </div><!-- /.input-group -->
  //                         <div class="help-block"></div>
  //                     </div><!-- /.form-group -->
  //                 </div>
  //             `;

  //             $("#other-fields").append(html);
  //         });

  //     }
  //     // Material Design Input function
  //     var inputs = document.querySelectorAll('#other-fields input, #other-fields textarea');

  //     for (var i = 0; i < inputs.length; i++) {
  //         inputs[i].addEventListener('focus', function(e) {
  //             this.parentElement.classList.add('is-focused');
  //         }, false);

  //         inputs[i].onkeyup = function(e) {
  //             if (this.value != "") {
  //                 this.parentElement.classList.add('is-filled');
  //             } else {
  //                 this.parentElement.classList.remove('is-filled');
  //             }
  //         };

  //         inputs[i].addEventListener('focusout', function(e) {
  //             if (this.value != "") {
  //                 this.parentElement.classList.add('is-filled');
  //             }
  //             this.parentElement.classList.remove('is-focused');
  //         }, false);
  //     }

  //     // Set height according to the clicked product type
  //     setColumnsHeight();
  // });

  // Convert Persian numbers to English numbers
  function englishNumber(value) {
    if (!value) {
      return;
    }
    var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

    for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
      value = value.replace(
        new RegExp(persianNumbers[i], "g"),
        englishNumbers[i]
      );
    }
    return value;
  }

  // Prevent non-numeric chars in inputs
  $(document).on("input", ".numeric", function () {
    if (this.value) this.value = englishNumber(this.value);
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  $(document).on("blur", ".numeric", function () {
    if ($(this).attr("max")) {
      var max = parseInt($(this).attr("max"));
      var entered = parseInt(this.value);

      if (entered > max) this.value = max;

      if ($(this).attr("id") == "txt-qty") {
        calcBill();
      }
    }
    if ($(this).attr("min")) {
      var min = parseInt($(this).attr("min"));
      var entered = parseInt(this.value);

      if (entered < min) this.value = min;
    }
  });

  $(document).on("input", ".numeric-float", function () {
    if (this.value) this.value = englishNumber(this.value);
    this.value = this.value.replace(/[^0-9\.]/g, "");
  });
  $(document).on("blur", ".numeric-float", function () {
    if ($(this).attr("max")) {
      var max = parseFloat($(this).attr("max"));
      var entered = parseFloat(this.value);

      if (entered > max) this.value = max;
    }
    if ($(this).attr("min")) {
      var min = parseFloat($(this).attr("min"));
      var entered = parseFloat(this.value);

      if (entered < min) this.value = min;
    }
  });

  // Calculate customer bill
  function calcBill() {
    var qty = parseInt($("#txt-qty").val());

    if (qty > maxQty) {
      $("#total, #discount, #pure-total .price, #coupon-discount").text("0");
      $("#use-amount-wallet, #use-amount-wallet .plus").addClass("hide");
    } else {
      $("#coupon-discount").closest(".row").addClass("hide");
      prices.forEach(function (price) {
        if (price.product_id == selectedProduct) {
          if (
            qty >= price.fromQty &&
            (qty <= price.toQty || price.toQty == "")
          ) {
            var total = (discount = pureTotal = 0);
            if (price.price != "0") {
              total = qty * price.price;
              discount = qty * (price.price - price.sellPrice);
            } else {
              total = qty * selectedProductPrice;
              discount = qty * (selectedProductPrice - price.sellPrice);
            }
            pureTotal = total - discount;

            //cpopun
            if (coupon) {
              if (
                coupon.minimum == 0 ||
                (coupon.minimum > 0 && pureTotal >= coupon.minimum)
              ) {
                if (
                  coupon.product_ids.length == 0 ||
                  (coupon.product_ids.length > 0 &&
                    coupon.product_ids.indexOf(selectedProduct) != -1)
                ) {
                  coupon.amount = coupon.amount * 1;
                  if (coupon.discount_type == "price") {
                    var couponDiscount =
                      coupon.amount > pureTotal ? pureTotal : coupon.amount;
                  } else {
                    var couponDiscount = Math.round(
                      (pureTotal * coupon.amount) / 100
                    );
                  }
                  pureTotal = pureTotal - couponDiscount;
                  $("#coupon-discount").closest(".row").removeClass("hide");
                  $("#coupon-discount").text(numberFormat(couponDiscount));
                }
              }
            }

            // Use Wallet
            let orderPrice = pureTotal;
            let useWalletAmount = 0;
            if ($("#chk-use-wallet").prop("checked")) {
              pureTotal = credit >= pureTotal ? 0 : pureTotal - credit;
              useWalletAmount = orderPrice - pureTotal;
            }

            $("#total").text(numberFormat(total));
            $("#discount").text(numberFormat(discount));
            // $("#pure-total").text(numberFormat(pureTotal));
            $("input[name='price']").val(pureTotal);
            $("input[name='product_id']").val(selectedProduct);
            $("input[name='qty']").val(qty);

            $(
              "#pure-total, #use-amount-wallet, #use-amount-wallet .plus"
            ).addClass("hide");

            if (pureTotal || useWalletAmount) {
              $("#pure-total").closest(".row").fadeIn("slow");
              if (pureTotal) {
                $("#pure-total").removeClass("hide");
                $("#pure-total .price")
                  .text(numberFormat(pureTotal))
                  .removeClass("hide");
              }
              if (useWalletAmount) {
                $("#use-amount-wallet").removeClass("hide");
                $("#use-amount-wallet .price")
                  .text(numberFormat(useWalletAmount))
                  .removeClass("hide");
              }
              if (pureTotal && useWalletAmount) {
                $("#use-amount-wallet .plus").removeClass("hide");
              }
            } else {
              $("#pure-total").closest(".row").fadeOut("slow");
            }

            if (pureTotal == 0) {
              $("#gateways-box").closest(".row").fadeOut("slow");
              $("#btn-save").html(`<i class="fa fa-save"></i> ثبت سفارش`);
            } else {
              $("#gateways-box").closest(".row").fadeIn("slow");
              $("#btn-save").html(
                `<i class="fa fa-credit-card"></i> پرداخت و ثبت`
              );
            }
          }
        }
      });
    }
  }

  $(document).on("input", "#txt-qty", function () {
    calcBill();
  });

  $(document).on("change", "#chk-use-wallet", function () {
    calcBill();
  });

  // ================== Validations ==================
  $("body").on("blur change", "input:not(.txt-card-part)", function () {
    validateField($(this));
  });

  $("body").on("blur change", ".card-inputs input.form-control", function () {
    setInputCard();

    setTimeout(function () {
      focused = $(":focus");
      if (!focused.hasClass("txt-card-part")) {
        validateField($("#txt-card"));
      }
    }, 100);
  });

  // Check valid email
  function validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validateCellphone(cellphone) {
    var re = /^09\d{9}$|^9\d{9}$/;
    return re.test(cellphone);
  }

  // Check valid national code
  function validateNationalCode(code) {
    var L = code.length;

    if (L < 8 || parseInt(code, 10) == 0) return false;
    code = ("0000" + code).substr(L + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) == 0) return false;
    var c = parseInt(code.substr(9, 1), 10);
    var s = 0;
    for (var i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
    return true;
  }

  // Validate a field
  function validateField(elem) {
    var val = elem.val();
    var parent = elem.closest(".form-group");
    var validations = elem.attr("data-validation");
    validations =
      typeof validations != "undefined" ? validations.split("|") : [];

    parent.find(".help-block").html("");
    var title = elem.attr("title");
    error = false;

    //console.log(val);
    if (elem.is("select.required") && !val) {
      error = true;
    }
    if (error == true) {
      message = "<p>یک گزینه را انتخاب کنید.</p>";
      parent.find(".help-block").append(message);
    }

    if (elem.prop("required") || validations.includes("required")) {
      if (val == "") {
        message = "<p>وارد کردن " + title + "  اجباری است.</p>";
        parent.find(".help-block").append(message);
        error = true;
      }
    }

    if (elem.attr("minlength")) {
      var minLength = elem.attr("minlength");
      if (val.length < minLength) {
        message =
          "<p>حداقل طول " + title + " باید " + minLength + " کاراکتر باشد.</p>";
        parent.find(".help-block").append(message);
        error = true;
      }
    }
    if (elem.attr("maxlength")) {
      var maxLength = elem.attr("maxlength");
      if (val.length > maxLength) {
        message =
          "<p>حداکثر طول " +
          title +
          " باید " +
          maxLength +
          " کاراکتر باشد.</p>";
        parent.find(".help-block").append(message);
        error = true;
      }
    }

    var numericVal = 0;
    if (elem.hasClass("numeric")) {
      val = val.replace(/,/gi, "");
      numericVal = parseInt(val);
    } else if (elem.hasClass("numeric-float")) {
      val = val.replace(/,/gi, "");
      numericVal = parseFloat(val);
    }

    if (elem.attr("min")) {
      var min = elem.attr("min");
      if (numericVal < min) {
        message = "<p>حداقل تعداد قابل قبول " + min + " می باشد.</p>";
        parent.find(".help-block").append(message);
        error = true;
      }
    }
    if (elem.attr("max")) {
      var max = elem.attr("max");
      if (numericVal > max) {
        message = "<p>حداکثر تعداد قابل قبول " + max + " می باشد.</p>";
        parent.find(".help-block").append(message);
        error = true;
      }
    }

    if (validations.includes("valid_email") && val.length > 0) {
      if (!validateEmail(val)) {
        message = "ایمیل وارد شده معتبر نیست.";
        parent.find(".help-block").append(message);
        error = true;
      }
    }

    if (validations.includes("callback_validNationalCode") && val.length > 0) {
      if (!validateNationalCode(val)) {
        message = "کد ملی وارد شده معتبر نیست.";
        parent.find(".help-block").append(message);
        error = true;
      }
    } else if (validations.includes("cellphone") && val.length > 0) {
      if (!validateCellphone(val)) {
        message = "<p>شماره همراه صحیح نیست، قالب صحیح: 09123456789</p>";
        parent.find(".help-block").append(message);
        error = true;
      }
    } else if (elem.attr("id") == "txt-reference" && val.length > 0) {
      if (val.length < 5) {
        message = "شماره ارجاع را به صورت صحیح وارد نمایید.";
        parent.find(".help-block").append(message);
        error = true;
      }
    } else if (elem.attr("id") == "txt-card" && val.length > 0) {
      if (val.length != 16) {
        message = "شماره کارت 16 رقمی  را وارد نمایید.";
        parent.find(".help-block").append(message);
        error = true;
      }
    } else if (elem.attr("id") == "txt-date" && val.length > 0) {
      if (
        !/^1(3|4)(\d{2})\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/.test(
          val
        )
      ) {
        message = "فرمت تاریخ صحیح نیست.";
        parent.find(".help-block").append(message);
        error = true;
      }
    } else if (elem.attr("id") == "txt-clock" && val.length > 0) {
      if (!/^([01]?\d|2[0-3]):([0-5]?\d)$/.test(val)) {
        message = "فرمت ساعت صحیح نیست.";
        parent.find(".help-block").append(message);
        error = true;
      }
    }

    if (error) {
      parent.addClass("has-error");

      return false;
    } else {
      parent.removeClass("has-error");
      parent.find(".help-block").html("");
      return true;
    }
  }

  // Validate top fileds for submit
  function validateTopFields() {
    var isValid = true;

    if (!validateField($("#txt-cellphone"))) {
      isValid = false;
    }

    $("#other-fields input").each(function (index, elem) {
      if (!validateField($(elem))) {
        isValid = false;
      }
    });

    if (!validateField($("#txt-qty"))) {
      isValid = false;
    }

    if (!validateField($("#captcha"))) {
      isValid = false;
    }

    var selectedGateway = $("#gateway").val();
    if (!selectedGateway) {
      isValid = false;
      message = "درگاه پرداخت را انتخاب کنید";
      $("#gateways-box .help-block").html(message).css("display", "block");
    } else {
      $("#gateways-box .help-block").css("display", "none");
    }

    if (!$("#chk-agreement").prop("checked")) {
      $("#chk-agreement").closest(".form-check").addClass("has-error");
      message =
        "برای تکمیل خرید باید قوانین و مقررات سایت را بپذیرید و تیک آن را فعال نمائید.";
      $("#chk-agreement")
        .closest(".form-check")
        .find(".help-block")
        .html(message);
      isValid = false;
    } else {
      $("#chk-agreement").closest(".form-check").removeClass("has-error");
      $("#chk-agreement").closest(".form-check").find(".help-block").html("");
    }

    if (selectedProduct) {
      $("#product-not-selected").addClass("hide");
    } else {
      $("#product-not-selected").removeClass("hide");
      isValid = false;
    }

    return isValid;
  }

  // Handle gateway selection
  $(document).on(
    "click",
    ".gateway-content[data-tab='online'] .img-gateway",
    function (e) {
      if (!$(this).hasClass("active")) {
        $(".gateway-content[data-tab='online'] .img-gateway").removeClass(
          "active"
        );
        $(this).addClass("active");
        $("#gateway").val($(this).attr("data-value"));
      }
    }
  );

  // Reload Captcha
  $(document).on("click", ".reload-captcha", function (e) {
    e.preventDefault();
    $(".captcha-image").html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');
    $.ajax({
      url: baseUrl + "home/create_captcha?" + Math.random(),
      success: function (data) {
        $(".captcha-image").html(data);
      },
    });
  });

  // Save button handler
  $("body").on("click", "#btn-save", function () {
    let page = $(".charge-page").length ? "charge" : "order";
    let validatie =
      page == "charge" ? validateField($("#txt-price")) : validateTopFields();

    if (validatie) {
      let selectedGateway = $("#gateway").val();
      let price = $("input[name='price']").val();
      price = price.replace(/,/gi, "");
      price = Number(price);

      if (price == 0) {
        $("#gateway").val("");
        selectedGateway = "";
      }

      if (selectedGateway == "card2card") {
        // Replace price
        price = Number(price);
        let toman = numberFormat(price);
        let rial = numberFormat(price * 10);
        let alertOriginal = $("#modal-card2card .alert-original").html();
        alertOriginal = alertOriginal.replace(/{{amountToman}}/g, toman);
        alertOriginal = alertOriginal.replace(/{{amountRial}}/g, rial);
        $("#modal-card2card .alert-card2card").html(alertOriginal);

        $("#modal-card2card").modal("show");
      } else {
        $(this)
          .attr("disabled", "disabled")
          .addClass("disabled")
          .html("در حال پردازش");
        $("#main-form").submit();
      }
    }
  });

  function setInputCard() {
    $("#txt-card").val("");
    $(".card-inputs input").each(function (index, e) {
      $("#txt-card").val($(e).val() + $("#txt-card").val());
    });
  }

  $("body").on("click", "#btn-save-card2card", function () {
    setInputCard();

    var isValid = true;
    if (!validateField($("#txt-reference"))) {
      isValid = false;
    }

    if (!validateField($("#txt-card"))) {
      isValid = false;
    }

    if (!validateField($("#txt-date"))) {
      isValid = false;
    }

    if (!validateField($("#txt-clock"))) {
      isValid = false;
    }

    if (isValid) {
      $("input[name='transfer[reference]']").val($("#txt-reference").val());
      $("input[name='transfer[card]']").val($("#txt-card").val());
      $("input[name='transfer[date]']").val($("#txt-date").val());
      $("input[name='transfer[clock]']").val($("#txt-clock").val());
      $("input[name='transfer[description]']").val($("#txt-description").val());
      $("input[name='image']")[0].files = $("#imgInp")[0].files;

      $(this)
        .attr("disabled", "disabled")
        .addClass("disabled")
        .html("در حال پردازش");
      $("#btn-save")
        .attr("disabled", "disabled")
        .addClass("disabled")
        .html("در حال پردازش");

      $("#main-form").submit();
    }
  });

  // Apply entered coupon
  $("body").on("click", "#apply-coupon", function () {
    isValid = true;
    if (!validateField($("#txt-cellphone"))) {
      isValid = false;
    }

    if (!validateField($("#txt-coupon"))) {
      isValid = false;
    }

    if (isValid) {
      $("#apply-coupon").attr("disabled", "disabled");
      $("#apply-coupon").find(".loading").removeClass("hide");
      $("#alert-result-coupon").addClass("hide");
      $("#alert-result-coupon").removeClass("alert-success alert-danger");
      coupon = null;

      $.ajax({
        type: "POST",
        url: baseUrl + "order/applyCoupon",
        data: $("#main-form").serialize(), // serializes the form's elements.
        async: true,
        success: function (data) {
          $("#apply-coupon").removeAttr("disabled");
          $("#apply-coupon").find(".loading").addClass("hide");
          var result = JSON.parse(data);
          $("#alert-result-coupon").removeClass("hide");
          $("#alert-result-coupon").html(result.message);
          if (result.condition) {
            $("#alert-result-coupon").addClass("alert-success");
            coupon = result.coupon;
          } else {
            $("#alert-result-coupon").addClass("alert-danger");
          }

          calcBill();
          setColumnsHeight();
        },
      });
    }
  });

  // Separator for numbers
  function numberFormat(num) {
    var n = num.toString(),
      p = n.indexOf(".");
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
      return p < 0 || i < p ? $0 + "," : $0;
    });
  }

  // Handle plus, minus buttons for card quantity
  $(".quantity .btn-minus").click(function (e) {
    e.preventDefault();
    var input = $(this).closest(".quantity").find("input");
    var value = parseInt(input.val());
    var min = parseInt(input.attr("min"));

    if (value > min) {
      value = value - 1;
    } else {
      value = min;
    }
    input.val(value);

    calcBill();
  });

  $(".quantity .btn-plus").on("click", function (e) {
    e.preventDefault();
    var input = $(this).closest(".quantity").find("input");
    var value = parseInt(input.val());
    var max = parseInt(input.attr("max"));

    if (value < max) {
      value = value + 1;
    } else {
      value = max;
    }

    input.val(value);

    calcBill();
  });

  // Footer columns height calculation
  $(window).resize(function () {
    setColumnsHeight();
  });

  function setColumnsHeight() {
    if ($(".charge-page").length) {
      return;
    }
    if ($(document).width() > 991) {
      var max = 0;

      $(".half-box").each(function () {
        $(this).css("height", "auto");
        var currentHeight = $(this).innerHeight();
        if (max < currentHeight) max = currentHeight;
      });

      $(".half-box").css("height", max);
    } else {
      $(".half-box").css("height", "auto");
    }
  }
  setColumnsHeight();

  if ($("#btn-dark").length) {
    const toggle = document.querySelector("#btn-dark");
    toggle.addEventListener("change", function (e) {
      document.body.classList.toggle("dark");
      let themeValue = $("body").hasClass("dark") ? "dark" : "light";
      $.ajax({
        url: baseUrl + "theme/ajaxChange",
        type: "GET",
        data: { theme: themeValue },
        dataType: "json",
      }).done(function (response) {});

      // Update sidebar theme mode if it is existed
      if ($("input[name='theme_mode']").length) {
        if (themeValue == "dark") {
          $("#chkDark").click();
        } else {
          $("#chkLight").click();
        }
      }
    });
  }

  $(document).on(
    "keyup",
    "input.numeric.separate , input.numeric-float.separate",
    function () {
      $(this).val(numberFormat($(this).val()));
    }
  );

  // Online or card2card select
  $(".gateway-method").on("click", function () {
    if ($(this).hasClass("active")) {
      return;
    }

    let tab = $(this).attr("data-tab");
    $(".gateway-method").removeClass("active");
    $(this).addClass("active");

    $(".gateway-content").addClass("d-none");
    $(".gateway-content[data-tab='" + tab + "']").removeClass("d-none");

    let gateway = "";
    if (tab == "card2card") {
      gateway = "card2card";
    } else {
      if (
        $(".gateway-content[data-tab='online'] .img-gateway.active").length == 0
      ) {
        $(".gateway-content[data-tab='online'] .img-gateway:first").click();
      }
      gateway = $(
        ".gateway-content[data-tab='online'] .img-gateway.active"
      ).attr("data-value");
    }
    $("#gateway").val(gateway);

    setColumnsHeight();
  });

  $(document).on("click", ".charge-package", function () {
    $(".charge-package").removeClass("active");
    $(this).addClass("active");
    $("#txt-price").val($(this).text());
    validateField($("#txt-price"));
  });

  $(document).on("keyup", ".charge-page #txt-price", function () {
    $(".charge-package").removeClass("active");
    let price = $(this).val().replace(/,/gi, "");
    console.log(price);
    $(`.charge-package[data-value="${price}"]`).addClass("active");
  });
});

// Bugfix for bootstrap third level menu issue in mobile view
$(".navbar-nav>li.dropdown>a").click(function () {
  if ($(this).parent().hasClass("open")) {
    $(this).parent().removeClass("open");
    return false;
  } else {
    $(this).parent().addClass("open");
    return false;
  }
});

$(".dropdown-submenu>a").click(function () {
  if ($(this).parent().hasClass("open")) {
    $(this).parent().removeClass("open");
    return false;
  } else {
    $(this).parent().addClass("open");
    return false;
  }
});

$(".btn-copy").on("mousedown", function (e) {
  e.preventDefault();

  var targetId = $(this).attr("data-copy");
  var text = document.getElementById(targetId);
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(text);
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand("copy");

  var currentButton = $(this);
  $(this).html('<i class="fa fa-check"></i>');

  setTimeout(function () {
    currentButton.html('<i class="fa fa-copy lg"></i>');
  }, 1000);
});

function showDescription(target) {
  id = target.find(".product").attr("data-id");

  $("#product-info").modal("show");

  if (id != latestProductInfoId) {
    title = target.find("h3").first().text();
    $("#product-info .loading").removeClass("hide");
    $("#product-info .content").html("");
    $("#product-info .modal-title").text(title);
    latestProductInfoId = id;
    $.ajax({
      type: "Get",
      url: baseUrl + "home/getProductInfo/" + id,
      async: false,
      success: function (data) {
        $("#product-info .loading").addClass("hide");
        $("#product-info .content").html(data);
      },
    });
  }
}

var latestProductInfoId = 0;
$("body").on("click", ".btn-product-info", function () {
  if ($(this).hasClass("final")) {
    target = $(".product.active").closest(".product-box");
  } else {
    target = $(this).closest(".product-box");
  }
  showDescription(target);
});

$("body").on("click", "#selected-product .title", function () {
  if ($("#selected-product .btn-product-info").hasClass("hide")) {
    return;
  }
  target = $(".product.active").closest(".product-box");
  showDescription(target);
});

// Handel card input
$(".card-inputs input").keyup(function (e) {
  tabIndex = parseInt($(this).attr("tabindex"));
  if (e.keyCode == 8) {
    index = tabIndex - 1;
    // backspace
    if (
      this.value.length == 0 &&
      $(".card-inputs input[tabindex='" + index + "']").length
    ) {
      $(".card-inputs input[tabindex='" + index + "']").focus();
    }
  } else if (this.value.length == this.maxLength) {
    index = tabIndex + 1;
    $("input[tabindex='" + index + "']").focus();
  }
});

// Clock picker
if ($("#txt-clock").length) {
  // $("#txt-clock").clockpicker({
  //     "donetext": "قبول",
  //     autoclose: true,
  //     // format: "HH:mm:ss"
  // });

  $("#txt-clock").clockpicker({
    donetext: "قبول",
    format: "HH:mm",
    twelvehour: false,
    autoclose: true,
    leadingZeroHours: true,
    // upperCaseAmPm: true,
    // leadingSpaceAmPm: true,
    // afterHourSelect: function() {
    //    $('.clockpicker').clockpicker('realtimeDone');
    // },
    // afterMinuteSelect: function() {
    //    $('.clockpicker').clockpicker('realtimeDone');
    // },
    // afterAmPmSelect: function() {
    //    $('.clockpicker').clockpicker('realtimeDone');
    // }
  });
}

// Date picker
if ($(".modal #txt-date").length) {
  var datepicker = $(".modal #txt-date").pDatepicker({
    persianDigit: false,
    format: "YYYY/MM/DD",
    observer: true,
    autoClose: true,
    navigator: {
      text: {
        btnNextText: "",
        btnPrevText: "",
      },
    },
  });

  function locateModalDatepicker() {
    var popoverDatepicker = $(".datepicker-container"),
      txtDateJqueryElement = $(".modal #txt-date"),
      offset = txtDateJqueryElement.offset();

    popoverDatepicker.css(
      "top",
      offset.top + txtDateJqueryElement.outerHeight()
    );
  }

  if ($(".modal").length) {
    $(".modal").on("scroll", function () {
      locateModalDatepicker();
    });
  }
}

// Image card2card
if ($("#imgInp").length) {
  imgInp.onchange = (evt) => {
    $("#uploaded-image").addClass("hide");
    const [file] = imgInp.files;
    if (file) {
      blah.src = URL.createObjectURL(file);
      $("#blah").removeClass("hide");

      $("#btn-clear-image").removeClass("hide");
    } else {
      $("#blah").addClass("hide");
      $("#btn-clear-image").addClass("hide");
    }
  };
}

$(document).on("input", ".has-counter", function () {
  var counter = $(this).val().length;
  $(".counter-box").find(".counter").text(counter);
});

// Clear file input for payment image
function clearInputFile(fileinput) {
  if (fileinput.value) {
    try {
      fileinput.value = ""; //for IE11, modern browsers
    } catch (err) {}
    if (fileinput.value) {
      //for IE5 ~ IE10
      var form = document.createElement("form"),
        parentNode = fileinput.parentNode,
        ref = fileinput.nextSibling;
      form.appendChild(fileinput);
      form.reset();
      parentNode.insertBefore(fileinput, ref);
    }
  }
}
$("#btn-clear-image").click(function () {
  clearInputFile(document.getElementById("imgInp"));
  $("#blah").addClass("hide");
  $("#btn-clear-image").addClass("hide");
});
