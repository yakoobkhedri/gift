// request Product

let requestProduct = Array.from(
    document.getElementsByClassName("requestProduct")
  );
  
  requestProduct.forEach((item) => {
    item.addEventListener("click", function (e) {});
  });
  
  //
  var categories = [];
  var selectedCategoryId = 0;
  categories.push({
    id: "28",
    description: `<p>توجه : با توجه به اینکه استیم به تازگی اقدام به حذف گیفت کارتهای مربوط به دو کشور آرژانتین و ترکیه کرده است ، در صورتیکه اکانت شما مربوط به هر یک از این دو کشور می باشد می توانید از گیفت کارتهای استیم آمریکا استفاده نمایید . بعد از استفاده از گیفت کارت آمریکا داخل اکانت خود ، استیم به صورت خودکار اقدام به تبدیل واحد گیفت کارت آمریکا به معادل لیر ترکیه یا پزو آرژانتین ( بسته به کشور اکانت شما ) می کند .</p>
  
  <p>اگر اکانت شما مربوط به کشور دیگری به غیر از موارد بالا می باشد ، می بایست از گیفت کارت گلوبال موجود در سایت استفاده فرمایید، این گیفت کارت در حال حاضر مربوط به ریجن تایوان می باشد که قابلیت تبدیل به واحد پول اکثر کشورهای موجود در استیم را دارد ( به جز ترکیه ، آرژانتین ، برزیل ، روسیه و آذربایجان )</p>
  
  <p> </p>
  
  <p> </p>
  
  <p> </p>
  
  <p> </p>
  `,
    fields: JSON.parse(
      `[{"statics_key":"email","use":1,"required":1,"ordering":1,"title":"ایمیل","ltr":1,"icon":"fa fa-envelope-o","class":"en-numbers","validation":"required|valid_email","value":"","name":"email","col":"col-12"}]`
    ),
  });
  categories.push({
    id: "29",
    description: `<p>گیفت کارت های پلی استیشن </p>
  `,
    fields: JSON.parse(
      `[{"statics_key":"email","use":1,"required":1,"ordering":1,"title":"ایمیل","ltr":1,"icon":"fa fa-envelope-o","class":"en-numbers","validation":"required|valid_email","value":"","name":"email","col":"col-12"}]`
    ),
  });
  categories.push({
    id: "30",
    description: `<p>گیفت کارت آیتونز یا همان <strong>گیفت کارت اپل</strong> محصولی تولید شده توسط شرکت Apple است با خرید گیفت کارت اپل میتوانید از مجموعه برنامه های ارائه شده توسط اپل و یا توسعه دهندگان شامل سرویس آیکلود ، موسیقی ، فیلم ، کتاب ، بازی و نرم افزار در فروشگاه خریداری کنید.</p>
  `,
    fields: JSON.parse(`[]`),
  });
  
  var selectedProduct = (selectedProductPrice = maxQty = 0);
  
  var credit = 0;
  $(document).ready(function () {});
  $(document).ready(function () {
    $(".country-button").click(function () {
      var selectedCountry = $(this).data("country");
      $(".product-box").hide();
  
      if (selectedCountry == "all") {
        $(".product-box").show();
      } else {
        $(".country-" + selectedCountry).show();
      }
  
      $(".country-button").removeClass("highlighted");
      $(this).addClass("highlighted");
    });
  
    // اجرای اسکریپت پس از لاگین
    $(window).on("load", function () {
      var selectedCountry = $(".country-button.highlighted").data("country");
      if (selectedCountry) {
        $(".product-box").hide();
        if (selectedCountry == "all") {
          $(".product-box").show();
        } else {
          $(".country-" + selectedCountry).show();
        }
      }
    });
  });
  
  $(document).ready(function () {
    var svgRight =
        '<svg version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="fill:#575757;enable-background:new 0 0 477.175 477.175;" xml:space="preserve"><g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
      svgLeft =
        '<svg version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="fill:#575757;enable-background:new 0 0 477.175 477.175;" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>';
    $("#owl-reviews").owlCarousel({
      rtl: true,
      loop: false,
      dots: true,
      nav: true,
      navText: [svgRight, svgLeft],
      autoplay: true,
      autoplayTimeout: 9000,
      autoplayHoverPause: true,
      margin: 10,
      items: 4,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 5 /* تعداد آیتم‌ها را بیشتر کنید */,
        },
      },
    });
  });
  $(document).ready(function () {
    var minLength = 50; // حداقل طول متن برای نمایش پاپ آپ
  
    $(".review-comment").each(function () {
      var $this = $(this);
      var fullText = $this.data("full-text"); // متن کامل را بگیرید
      var $popup = $this.siblings(".popup");
  
      // بررسی طول متن و نمایش/پنهان کردن پاپ آپ
      if (fullText.length > minLength) {
        $this.hover(
          function () {
            $popup.find("#popup-text").text(fullText);
            $popup.css({
              top: $this.position().top - $popup.outerHeight(), // پاپ آپ در بالا متن
              left: $this.position().left,
            });
            $popup.fadeIn();
          },
          function () {
            setTimeout(function () {
              if (!$popup.is(":hover")) {
                $popup.fadeOut();
              }
            }, 100); // کمی تاخیر برای جلوگیری از پنهان شدن ناگهانی
          }
        );
  
        // جلوگیری از پنهان شدن پاپ آپ هنگام hover بر روی پاپ آپ
        $popup.hover(
          function () {
            $(this).stop(true, true).fadeIn();
          },
          function () {
            $(this).fade;
            $(this).fadeOut();
          }
        );
      }
    });
  
    // بستن پاپ آپ
    $(".popup .close-btn").on("click", function () {
      $(this).closest(".popup").fadeOut();
    });
  });
  
  $(document).ready(function () {
    $(".my-rating-7").starRating({
      starSize: 25,
      initialRating: 4,
      readOnly: true,
      emptyColor: "#ddd",
      activeColor: "#ffc107",
      useGradient: false,
    });
    $(".my-rating-6").starRating({
      starSize: 25,
      initialRating: 5,
      readOnly: true,
      emptyColor: "#ddd",
      activeColor: "#ffc107",
      useGradient: false,
    });
    $(".my-rating-5").starRating({
      starSize: 25,
      initialRating: 1,
      readOnly: true,
      emptyColor: "#ddd",
      activeColor: "#ffc107",
      useGradient: false,
    });
  });
  
  // menu
  
  let giftBtn = document.getElementById("giftBtn");
  let cartBtn = document.getElementById("cartBtn");
  let dropdownList = document.getElementById("dropdownList");
  let cartdropdownList = document.getElementById("cartdropdownList");
  
  giftBtn.addEventListener("click", function () {
    dropdownList.classList.toggle("active");
  });
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest("#dropdownList") &&
      !event.target.closest("#giftBtn")
    ) {
      dropdownList.classList.remove("active");
    }
  });
  cartBtn.addEventListener("click", function () {
    cartdropdownList.classList.toggle("active");
  });
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".showCart") &&
      !event.target.closest(".btnUnRemoveClass")
    ) {
      cartdropdownList.classList.remove("active");
    }
  });
  // price
  
  let price = Array.from(document.querySelectorAll(".price a"));
  
  price.forEach((item) => {
    item.addEventListener("click", function () {
      price.forEach((items) => {
        items.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
  
  // select bank
  
  let bank = Array.from(document.getElementsByClassName("bank"));
  
  bank.forEach((item) => {
    item.addEventListener("click", function () {
      bank.forEach((items) => {
        items.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
  