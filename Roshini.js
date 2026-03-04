<script>

const form = document.querySelector("form");
const nameInput = document.querySelector("input[type='text']");
const emailInput = document.querySelector("input[type='email']");
const department = document.querySelector("select");
const genderInputs = document.querySelectorAll("input[name='gender']");
const skillInputs = document.querySelectorAll("fieldset input[type='checkbox']");
const agreeCheckbox = document.querySelector(".declaration input");
const table = document.querySelector("table");

let registeredEmails = [];
let participantCount = 2; // Already 2 default rows

// Create participant counter display
const counterDisplay = document.createElement("h4");
counterDisplay.style.textAlign = "center";
counterDisplay.innerText = "Total Participants: " + participantCount;
table.before(counterDisplay);

// Real-time validation
nameInput.addEventListener("input", function() {
    if (nameInput.value.trim().length < 3) {
        nameInput.style.border = "2px solid red";
    } else {
        nameInput.style.border = "2px solid green";
    }
});

emailInput.addEventListener("input", function() {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.style.border = "2px solid red";
    } else {
        emailInput.style.border = "2px solid green";
    }
});

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let valid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const dept = department.value;

    // Check empty fields
    if (name === "" || email === "") {
        alert("Please fill all required fields!");
        valid = false;
    }

    // Duplicate email prevention
    if (registeredEmails.includes(email)) {
        alert("This email is already registered!");
        valid = false;
    }

    // Gender validation
    let genderSelected = false;
    genderInputs.forEach(radio => {
        if (radio.checked) genderSelected = true;
    });

    if (!genderSelected) {
        alert("Please select gender!");
        valid = false;
    }

    // Skills validation
    let skillSelected = false;
    skillInputs.forEach(box => {
        if (box.checked) skillSelected = true;
    });

    if (!skillSelected) {
        alert("Please select at least one skill!");
        valid = false;
    }

    // Agreement validation
    if (!agreeCheckbox.checked) {
        alert("Please agree to terms and conditions!");
        valid = false;
    }

    if (valid) {

        registeredEmails.push(email);

        // Create new row
        let newRow = table.insertRow(-1);

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);

        cell1.innerText = name;
        cell2.innerText = dept;

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.style.backgroundColor = "red";

        deleteBtn.onclick = function() {
            table.deleteRow(newRow.rowIndex);
            participantCount--;
            counterDisplay.innerText = "Total Participants: " + participantCount;
        };

        cell3.appendChild(deleteBtn);

        participantCount++;
        counterDisplay.innerText = "Total Participants: " + participantCount;

        // Success message animation
        const msg = document.createElement("p");
        msg.innerText = "🎉 Registration Successful!";
        msg.style.color = "green";
        msg.style.fontWeight = "bold";
        msg.style.textAlign = "center";
        msg.style.fontSize = "18px";

        form.appendChild(msg);

        setTimeout(() => {
            msg.remove();
        }, 3000);

        form.reset();
    }

});

</script>
