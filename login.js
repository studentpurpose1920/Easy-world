const scriptURL = "https://script.google.com/macros/s/AKfycbxthysX9kAkfElLIqKZymENc5os2WouW1mvab1gRSvcQKV1Ngw9PE70S0t3YQpNZ2sPkQ/exec";

const form = document.forms["contact-form"];
const loadingPopup = document.getElementById("loading");
const popup = document.getElementById("customPopup");
const popupClose = document.getElementById("popupClose");
const successSound = document.getElementById("successSound");

// Show success popup + play sound
function showPopup() {
    if (popup) {
        popup.style.display = "flex";
    }
    if (successSound) {
        try {
            successSound.currentTime = 0;
            successSound.play();
        } catch (err) {
            console.warn("Audio play blocked by browser:", err);
        }
    }
}

// Close popup
function closePopup() {
    if (popup) {
        popup.style.display = "none";
    }
}

if (popupClose) {
    popupClose.addEventListener("click", () => {
        closePopup();
    });
}

// Form submit handler
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const regSelect = document.getElementById("reg");
    const reg = regSelect ? regSelect.value : "";

    if (!reg) {
        alert("Please select your regulation.");
        return;
    }

    // Show loading overlay
    if (loadingPopup) {
        loadingPopup.style.display = "flex";
    }

    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            if (loadingPopup) {
                loadingPopup.style.display = "none";
            }

            // Show animated success popup
            showPopup();

            // Redirect after pressing OK
            if (popupClose) {
                popupClose.onclick = () => {
                    closePopup();

                    if (reg === "R23") {
                        window.location.href = "R23.html";
                    } else if (reg === "R20") {
                        window.location.href = "R20.html";
                    } else {
                        window.location.href = "branche.html";
                    }
                };
            }
        })
        .catch((error) => {
            if (loadingPopup) {
                loadingPopup.style.display = "none";
            }
            console.error("Error!", error.message);
            alert("There was an error submitting the form. Please try again.");
        });
});
