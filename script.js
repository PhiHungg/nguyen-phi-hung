let books = [
    { title: "Kỹ thuật lập trình", author: "Trần Đan Thư", price: "160.000 VND", image: "img/sach1.jpg" },
    { title: "The Clean Coder", author: "Robert C. Martin", price: "750.000 VND", image: "img/sach2.jpg" },
    { title: "Code Complete", author: "Steve McConnell", price: "1.500.000 VND", image: "img/sach3.jpg" },
    { title: "The Mythical Man-Month", author: "Frederick P. Brooks, Jr.", price: "500.000 VND", image: "img/sach4.jpg" },
    { title: "Core HTML5 Canvas", author: "David Geary", price: "1.200.000 VND", image: "img/sach5.jpg" },
    { title: "Lập trình Java căn bản", author: "Phạm Văn Trung", price: "150.000 VND", image: "img/sach6.jpg" },
    { title: "The Pragmatic Programmer", author: "David Thomas, Andrew Hunt", price: "900.000 VND", image: "img/sach7.jpg" },
    { title: "Computation", author: "Michael Sipser", price: "1.500.000 VND", image: "img/sach8.jpg" },
    { title: "Python Crash Course", author: "Eric Matthes", price: "700.000 VND", image: "img/sach9.jpg" }
];

let cart = [];
let isAdmin = false;

function renderBooks(filteredBooks = books) {
    let bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    filteredBooks.forEach((book, index) => {
        bookList.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card book-card">
                    <img src="${book.image}" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Tác giả: ${book.author}</p>
                        <p class="card-text">Giá: ${book.price}</p>
                        <button class="btn btn-success" onclick="addToCart(${index})">Thêm vào giỏ</button>
                        ${isAdmin ? `<button class="btn btn-danger" onclick="removeBook(${index})">Xóa</button>` : ''}
                    </div>
                </div>
            </div>`;
    });
}

function addBook() {
    let title = document.getElementById("newTitle").value;
    let author = document.getElementById("newAuthor").value;
    let price = document.getElementById("newPrice").value;
    if (title && author && price) {
        books.push({ title, author, price, image: "img/default.jpg" });
        renderBooks();
        alert("Sách đã được thêm!");
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
}

function removeBook(index) {
    let confirmDelete = confirm("Bạn có chắc chắn muốn xóa sách này?");
    if (confirmDelete) {
        books.splice(index, 1);
        renderBooks();
        alert("Sách đã bị xóa!");
    }
}

function addToCart(index) {
    let book = books[index];
    cart.push(book);
    alert(`${book.title} đã được thêm vào giỏ hàng!`);
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    let cartList = document.getElementById("cartList");
    let totalPrice = 0;
    cartList.innerHTML = "";
    
    cart.forEach((book, index) => {
        let priceNumber = parseInt(book.price.replace(/\D/g, "")); 
        totalPrice += priceNumber; 

        cartList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${book.title} - ${book.price}
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Xóa</button>
            </li>`;
    });

    document.getElementById("totalPrice").innerText = totalPrice.toLocaleString("vi-VN") + " VND";
}

function searchBooks() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchInput));
    renderBooks(filteredBooks);
}

function toggleCart() {
    let cartPanel = document.getElementById("cart");
    cartPanel.style.display = cartPanel.style.display === "none" ? "block" : "none";
}

function toggleAdmin() {
    isAdmin = !isAdmin;
    renderBooks();
}

renderBooks();

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }

    let total = document.getElementById("totalPrice").innerText;
    let confirmPay = confirm(`Tổng tiền: ${total}\nBạn có muốn thanh toán không?`);

    if (confirmPay) {
        alert("Thanh toán thành công! Cảm ơn bạn đã mua sách.");
        cart = []; 
        renderCart();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let cartButton = document.getElementById("cartButton");
    let cartSection = document.getElementById("cart");

    if (cartButton && cartSection) {
        cartButton.addEventListener("click", function(event) {
            event.preventDefault();
            cartSection.style.display = "block";
            cartSection.scrollIntoView({ behavior: "smooth" });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    updateLoginStatus();
});

function toggleLogin() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        logout();
    } else {
        document.getElementById("loginModal").style.display = "block";
    }
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "123456") {
        localStorage.setItem("isLoggedIn", "true");
        alert("Đăng nhập thành công!");
        closeLogin();
        updateLoginStatus();
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Đã đăng xuất!");
    updateLoginStatus();
}

function updateLoginStatus() {
    let loginButton = document.getElementById("loginButton");
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        loginButton.innerText = "Đăng xuất";
        document.getElementById("admin").style.display = "block";
    } else {
        loginButton.innerText = "Đăng nhập";
        document.getElementById("admin").style.display = "none";
    }
}

window.onload = function () {
    updateLoginStatus();
};

document.addEventListener("DOMContentLoaded", function () {
    const title = document.querySelector(".title");

    function createSparkle() {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");

        const x = Math.random() * title.offsetWidth;
        const y = Math.random() * title.offsetHeight;

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        title.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    setInterval(createSparkle, 200);
});
