const scriptURL = "https://script.google.com/macros/s/AKfycbynGFS1eeSbpN21DNeOmlApUEXzkArT-6VwTQK6kdY9_c9-jDkS493bBfLjXxr8i0kX/exec"; // Replace with your Apps Script URL
const form = document.getElementById("contactForm");
const response = document.getElementById("response");

const sendBtn = document.getElementById("sendBtn");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);

    // Show loading effect
    sendBtn.disabled = true;
    btnText.textContent = "Sending...";
    spinner.style.display = "inline-block";

    fetch(scriptURL, { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => {
            if (data.result === "success") {
                response.textContent = "✅ Message Sent Successfully!";
                response.style.color = "green";
                form.reset();
            } else {
                response.textContent = "❌ Error: " + data.error;
                response.style.color = "red";
            }
        })
        .catch(err => {
            response.textContent = "❌ Network Error: " + err.message;
            response.style.color = "red";
        })
        .finally(() => {
            // Reset button
            sendBtn.disabled = false;
            btnText.textContent = "Send";
            spinner.style.display = "none";
        });
});
