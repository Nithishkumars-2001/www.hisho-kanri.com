
//select sidenavbar
var sidenavbar = document.querySelector(".side-navbar")

function shownavbar() {
    sidenavbar.style.left = "0"
}
function closenavbar() {
    sidenavbar.style.left = "-90%"
}

// Decrease the speed of background video
document.addEventListener("DOMContentLoaded", function () {
    let bgVideo = document.getElementById("bg-clip");
    bgVideo.playbackRate = 0.7; // Adjust the speed (0.7x is slower)
});

//show service option content
function showSection(event, id) {
    // Prevent default anchor click
    event.preventDefault();

    // Hide all content sections
    document.querySelectorAll('.service-section').forEach(section => {
        section.classList.add('d-none');
    });

    // Show the selected section
    document.getElementById(id).classList.remove('d-none');

    // Remove active class from all links
    document.querySelectorAll('.services-sidebar a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the clicked link
    event.target.classList.add('active');
}

function toggleSubServices(id) {
    const element = document.getElementById(id);
    element.classList.toggle('d-none');
}


// service side menu 
function showSection(event, sectionId) {
    event.preventDefault();

    const links = document.querySelectorAll('#servicesMenu a');
    links.forEach(link => link.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const sections = document.querySelectorAll('.service-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
}

//Counter JS

const counters = document.querySelectorAll('.count');

counters.forEach(counter => {
    const animate = () => {
        const value = +counter.getAttribute('data-target');
        const data = +counter.innerText;
        const speed = 10;
        const increment = Math.ceil(value / 100);

        if (data < value) {
            counter.innerText = data + increment;
            setTimeout(animate, speed);
        } else {
            counter.innerText = value;
        }
    };

    animate();
});


//our skill box animation

const options = {
    threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, options);

document.querySelectorAll('.our-skills-content, .our-skill-img').forEach(el => {
    observer.observe(el);
});


//Client Testimonial slider

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Clone last cards and prepend them
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Clone first cards and append them
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Adjust scroll position to the first original card (avoid jump effect)
carousel.scrollLeft = firstCardWidth * cardPerView;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoplay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2000);
}
autoplay();

// Infinite loop effect when reaching cloned elements
const infiniteScroll = () => {
    if (carousel.scrollLeft <= 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");

    } else if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoplay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoplay);

// Chart Bot

function toggleChat() {
    const chatbox = document.getElementById("chatbox");
    chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (message === "") return;

    const chatBody = document.getElementById("chat-body");

    // User message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerText = message;
    chatBody.appendChild(userMsg);

    // Convert to lowercase for simple matching
    const lowerMsg = message.toLowerCase();

    // Bot reply
    if (["hi", "hii", "hello"].includes(lowerMsg)) {
        const botMsg1 = document.createElement("div");
        botMsg1.className = "chat-message bot";
        botMsg1.innerText = "Hi! How can I help you today? 😊";
        chatBody.appendChild(botMsg1);

        const botMsg2 = document.createElement("div");
        botMsg2.className = "chat-message bot";
        botMsg2.innerHTML = `
            Are you looking for?<br>
            <button onclick="handleOption('Company Secretary Service')" style="border: none; background-color: #fff;  border-radius: 5px;margin-top: 10px;padding: 10px">Company Secretary Service</button>
            <button onclick="handleOption('Accounting Advisory')" style="border: none; background-color: #fff;  border-radius: 5px;margin-top: 10px;padding: 10px">Accounting Advisory</button>
            <button onclick="handleOption('Virtual CFO')" style="border: none; background-color: #fff;  border-radius: 5px;margin-top: 10px;padding: 10px">Virtual CFO</button>
        `;
        chatBody.appendChild(botMsg2);
    } else {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot";
        botMsg.innerText = "Thanks for reaching out! We'll get back to you soon.";
        chatBody.appendChild(botMsg);
    }

    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleOption(option) {
    const chatBody = document.getElementById("chat-body");

    // Show user-selected option
    const userReply = document.createElement("div");
    userReply.className = "chat-message user";
    userReply.innerText = option;
    chatBody.appendChild(userReply);

    // Final thanks message
    const botThanks = document.createElement("div");
    botThanks.className = "chat-message bot";
    botThanks.innerText = "Thanks for your interest! We'll contact you soon regarding " + option + ".";
    chatBody.appendChild(botThanks);

    chatBody.scrollTop = chatBody.scrollHeight;
}