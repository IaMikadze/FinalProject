// burger js
function burgerMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active");
}

//accordeon
let accordeon = document.querySelectorAll(".accordeon-wraper .accordeon");
accordeon.forEach((ac) => {
  ac.onclick = () => {
    accordeon.forEach((cont) => {
      cont.classList.remove("active");
    });
    ac.classList.add("active");
  };
});
//filter
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".guitar-card");
  const brandFilter = document.getElementById("brandFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const sortSelect = document.getElementById("sort");

  function filterCards() {
    const selectedBrand = brandFilter.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;

    cards.forEach(function (card) {
      const brand = card.querySelector(".headline").textContent.toLowerCase();
      const category = card.getAttribute("data-category");
      const priceText = card
        .querySelector(".price")
        .textContent.replace("$", "")
        .replace(",", "")
        .trim();
      const price = parseInt(priceText, 10);

      let showCard = true;

      if (selectedBrand !== "all" && !brand.includes(selectedBrand)) {
        showCard = false;
      }

      if (selectedCategory !== "all" && category !== selectedCategory) {
        showCard = false;
      }

      if (selectedPrice !== "all") {
        if (selectedPrice === "low" && price >= 1000) {
          showCard = false;
        } else if (
          selectedPrice === "medium" &&
          (price < 1000 || price > 2000)
        ) {
          showCard = false;
        } else if (selectedPrice === "high" && price <= 2000) {
          showCard = false;
        }
      }

      card.style.display = showCard ? "block" : "none";
    });
  }

  function sortCards() {
    const sortValue = sortSelect.value;
    const cardsArray = Array.from(cards).filter(
      (card) => card.style.display !== "none"
    );
    const container = document.querySelector(".guitars");

    cardsArray.sort(function (a, b) {
      const priceA = parseInt(
        a
          .querySelector(".price")
          .textContent.replace("$", "")
          .replace(",", "")
          .trim(),
        10
      );
      const priceB = parseInt(
        b
          .querySelector(".price")
          .textContent.replace("$", "")
          .replace(",", "")
          .trim(),
        10
      );

      if (sortValue === "price-asc") {
        return priceA - priceB;
      } else if (sortValue === "price-desc") {
        return priceB - priceA;
      } else {
        return 0;
      }
    });

    cardsArray.forEach(function (card) {
      container.appendChild(card);
    });
  }

  brandFilter.addEventListener("change", function () {
    filterCards();
    sortCards();
  });

  categoryFilter.addEventListener("change", function () {
    filterCards();
    sortCards();
  });

  priceFilter.addEventListener("change", function () {
    filterCards();
    sortCards();
  });

  sortSelect.addEventListener("change", function () {
    sortCards();
    filterCards();
  });

  filterCards();
  sortCards();
});
//
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".guitar-card");
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  const seeLessBtn = document.getElementById("seeLessBtn");

  for (let i = 3; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  seeMoreBtn.addEventListener("click", function () {
    for (let i = 3; i < cards.length; i++) {
      cards[i].style.display = "block";
    }
    seeMoreBtn.style.display = "none";
    seeLessBtn.style.display = "inline-block";
  });

  seeLessBtn.addEventListener("click", function () {
    for (let i = 3; i < cards.length; i++) {
      cards[i].style.display = "none";
    }
    seeMoreBtn.style.display = "inline-block";
    seeLessBtn.style.display = "none";
  });
});

//
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".responsive-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const messageInput = document.getElementById("message");

  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      togglePassword.textContent = "Show";
    }
  });
  //forms valildation

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const messageValue = messageInput.value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!nameValue || !emailValue || !passwordValue || !messageValue) {
      alert("All fields must be filled out.");
      return;
    }

    if (!emailPattern.test(emailValue)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!passwordPattern.test(passwordValue)) {
      alert(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
      return;
    }

    alert("Form submitted successfully!");
    form.reset();
    togglePassword.textContent = "Show";
  });
});
