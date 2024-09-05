"use strict";

let users = [
    {
        "id": "1456457",
        "username": "Ellen Joe",
        "phone": "123-456-7890",
        "address": "123 Bangboo St, New Erdu",
        "email": "Icyellen@gmail.com",
        "photo": "https://raw.githubusercontent.com/nawrasfaour/assets/main/empty-profile.jpg"
    },
    {
        "id": "2235537",
        "username": "Janine Smith",
        "phone": "234-567-8901",
        "address": "234 Oak St, Othertown, OT 23456",
        "email": "jojo@gmail.com",
        "photo": "https://raw.githubusercontent.com/nawrasfaour/assets/main/empty-profile.jpg"
    },
    {
        "id": "1679673",
        "username": "Penelope Featherington",
        "phone": "345-678-9012",
        "address": "345 Pine St, London",
        "email": "Whistledown@gmail.com",
        "photo": "https://raw.githubusercontent.com/nawrasfaour/assets/main/penelope-featherington.jpg"
    },
    {
        "id": "xxxxx",
        "username": "KFC",
        "phone": "073-237-7067",
        "address": "HaKitor st 10, Haifa",
        "email": "KFCIsrael@gmail.com",
        "photo": "https://raw.githubusercontent.com/nawrasfaour/assets/main/kfc.jpg"
    },
    {
        "id": "xxxx",
        "username": "Lenovo support",
        "phone": "567-890-1234",
        "address": "9 Ha'psagot St, Petach-Tikva",
        "email": "support_il@lenovo.com",
        "photo": "https://raw.githubusercontent.com/nawrasfaour/assets/main/lenovosu.png"
    }
];

function sortAlphabetically() {
    users.sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()));
}

function createContactItem(elem, ind) {
    return `
        <li class="item">
            <img src="${elem.photo || 'https://raw.githubusercontent.com/nawrasfaour/assets/main/empty-profile.jpg'}" alt="${elem.username}" class="contact-photo">
            <span class="name">${elem.username}</span>
            <div class="action">
                <span class="material-symbols-outlined edit" onclick="openEditModal(${ind})">edit</span>
                <span class="material-symbols-outlined delete-icon" onclick="deleteContact(${ind})">delete</span>
                <span class="material-symbols-outlined about" onclick="showContactInfo(${ind})">info</span>
            </div>
        </li>
    `;
}

const list = document.getElementById("contact-list");
const noContactsMessage = document.getElementById('noContactsMessage');
let currentIndex = -1;

function renderList() {
    sortAlphabetically();
    list.innerHTML = '';
    users.forEach((elem, ind) => {
        list.innerHTML += createContactItem(elem, ind);
    });

    // "no contact messgage in the list"
    noContactsMessage.style.display = users.length === 0 ? 'block' : 'none';
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', filterContacts);

function filterContacts() {
    const query = searchInput.value.toLowerCase();
    const contacts = list.getElementsByTagName('li');
    
    Array.from(contacts).forEach(contact => {
        const contactText = contact.textContent.toLowerCase();
        contact.style.display = contactText.includes(query) ? '' : 'none';
    });
}

function deleteContact(ind) {
    const username = users[ind].username;
    if (confirm(`Are you sure you want to delete ${username}?`)) {
        users.splice(ind, 1);
        renderList();
    }
}

function deleteAllContacts() {
    if (confirm('Are you sure you want to delete all contacts?')) {
        if (users.length === 0) {
            alert('No contacts in the contact list.');
        } else {
            users = [];
            list.innerHTML=""
            renderList();
        }
    }
}

function showContactInfo(index) {
    const user = users[index];
    const aboutModal = document.getElementById('aboutModal');
    
    document.getElementById('aboutTitle').innerText = user.username;
    document.getElementById('aboutContent').innerText = `
        Phone: ${user.phone}
        Address: ${user.address || 'N/A'}
        Email: ${user.email || 'N/A'}
    `;

    aboutModal.style.display = 'flex';
}

function closeAboutModal(event) {
    if (event.target === document.getElementById('aboutModal') || event.target === document.getElementById('closeAboutModalBtn')) {
        document.getElementById('aboutModal').style.display = 'none';
    }
}

function openEditModal(index) {
    const user = users[index];
    const modal = document.getElementById('myModal');

    document.getElementById('modalTitle').innerText = 'Edit Contact';
    document.getElementById('inputUserAddress').value = user.address || '';
    document.getElementById('inputUserName').value = user.username || '';
    document.getElementById('inputUserPhone').value = user.phone || '';
    document.getElementById('inputUserEmail').value = user.email || '';

    modal.style.display = 'flex';

    currentIndex = index; 
}

function saveContact() {
    const user = users[currentIndex];
    
    user.username = document.getElementById('inputUserName').value;
    user.phone = document.getElementById('inputUserPhone').value;
    user.address = document.getElementById('inputUserAddress').value;
    user.email = document.getElementById('inputUserEmail').value;

    sortAlphabetically();
    renderList();

    document.getElementById('myModal').style.display = 'none';
}

document.getElementById('saveContactBtn').addEventListener('click', saveContact);
document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('myModal').style.display = 'none';
});
document.getElementById('aboutModal').addEventListener('click', closeAboutModal);

document.addEventListener('DOMContentLoaded', () => {
    renderList();
    
    noContactsMessage.style.display = users.length === 0 ? 'block' : 'none';
});
