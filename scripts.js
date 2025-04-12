document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const openPopupBtn = document.getElementById("openPopup");
    const closePopup = document.querySelector(".close");

    openPopupBtn.addEventListener("click", () => {
        popup.style.display = "block";
    });

    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Handle Form Submission
    document.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const email = document.querySelector("input[name='email']").value;
        const phone = document.querySelector("input[name='phone']").value;

        const response = await fetch("http://localhost:5000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, phone })
        });

        const data = await response.json();
        alert(data.message);

        if (response.ok) {
            popup.style.display = "none";
        }
    });
});


document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const formData = { name, email, message };

    try {
        // Send data to the backend
        const response = await fetch("http://localhost:5000/submit-contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        // Handle response
        if (response.ok) {
            alert(result.message); // Success message
        } else {
            alert("❌ Something went wrong. Please try again.");
        }
    } catch (error) {
        alert("❌ Error occurred while sending the message.");
    }
});

