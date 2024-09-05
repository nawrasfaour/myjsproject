"use strict";


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addContactBtn').addEventListener('click', () => openModal(false));
    document.getElementById('deleteAllBtn').addEventListener('click', deleteAllContacts);
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('saveContactBtn').addEventListener('click', saveContact);
    document.getElementById('myModal').addEventListener('click', closeModal);
    document.getElementById('closeAboutModalBtn').addEventListener('click', closeAboutModal);
    document.getElementById('aboutModal').addEventListener('click', closeAboutModal);

    renderList();
});

function openModal(isEdit = false, ind = -1) {
    currentIndex = ind;

    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Contact' : 'Add Contact';

    const user = isEdit ? users[ind] : { address: '', username: '', phone: '', email: '' };

    document.getElementById('inputUserAddress').value = user.address;
    document.getElementById('inputUserName').value = user.username;
    document.getElementById('inputUserPhone').value = user.phone;
    document.getElementById('inputUserEmail').value = user.email;

    document.getElementById('myModal').style.display = 'flex';
}

function closeModal(event) {
    if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
        document.getElementById('myModal').style.display = 'none';
    }
}

function checkIfExists(username, phone) {
    return users.some((user, index) =>
        (user.username.toLowerCase() === username.toLowerCase() && index !== currentIndex) ||
        (user.phone === phone && index !== currentIndex)
    );
}

function saveContact() {
    const address = document.getElementById('inputUserAddress').value.trim();
    const username = document.getElementById('inputUserName').value.trim();
    const phone = document.getElementById('inputUserPhone').value.trim();
    const email = document.getElementById('inputUserEmail').value.trim();

    if (!username || !phone) {
        alert("Username and phone number are required.");
        return;
    }
    const containsLetters = /[a-zA-Z]/.test(phone); //checking if phone containts letters

    if (containsLetters) {
        alert("Phone number should not contain letters.");
        return;
    }

    if (checkIfExists(username, phone)) {
        alert("this contact already exists.");
        return;
    }

    if (currentIndex === -1) {
        // Add new contact
        users.push({
            address: address || Date.now().toString(),
            username,
            phone,
            email,
            photo: 'https://raw.githubusercontent.com/nawrasfaour/assets/main/empty-profile.jpg' // Default photo
        });
    } else {
        // Update existing contact
        users[currentIndex] = {
            address: address || users[currentIndex].address,
            username,
            phone,
            email,
            photo: users[currentIndex].photo
        };
    }

    document.getElementById('myModal').style.display = 'none';
    renderList();
}

/// Change cursor to pointer
const allButtons = ['#deleteAllBtn', '#addContactBtn', '#closeModalBtn', '#saveContactBtn', '#closeAboutModalBtn', '.action','.autorenew'];

allButtons.forEach(selector => {
    const buttons = document.querySelectorAll(selector);

    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.classList.add('pointer');
        });
        button.addEventListener('mouseout', () => {
            button.classList.remove('pointer');
        });
    });
});


