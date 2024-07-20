const users = [
    {
        "id": "1456457",
        "username": "Ellen Joe",
        "phone": "123-456-7890",
        "address": "123 Bangboo St, New Erdu",
        "email": "Icyellen@gmail.com",
        "photo": "accets/empty-profile.jpg"
    },
    {
        "id": "2235537",
        "username": "Janine Smith",
        "phone": "234-567-8901",
        "address": "234 Oak St, Othertown, OT 23456",
        "email": "jojo@gmail.com",
        "photo": "accets/empty-profile.jpg"
    },
    {
        "id": "1679673",
        "username": "Penelope Featherington",
        "phone": "345-678-9012",
        "address": "345 Pine St, London",
        "email": "Whistledown@gmail.com",
        "photo": "accets/penelope-featherington.jpg"
    },
    {
        "id": "xxxxx",
        "username": "KFC",
        "phone": "073-237-7067",
        "address": "HaKitor st 10, Haifa",
        "email": "KFCIsrael@gmail.com",
        "photo": "accets/kfc.jpg"
    },
    {
        "id": "xxxx",
        "username": "Lenovo support",
        "phone": "567-890-1234",
        "address": "9 Ha'psagot St, Petach-Tikva",
        "email": "support_il@lenovo.com",
        "photo": "accets/lenovosu.png"
    }
];

const list = document.getElementById("contact-list");
let currentIndex = -1;

function renderList() {
    list.innerHTML = '';
    users.forEach((elem, ind) => {
        const item = document.createElement('li');
        item.className = "item";
        item.innerHTML = `
            <img src="${elem.photo || 'assets/empty-profile.jpg'}" alt="${elem.username}" class="contact-photo">
            <span class="name">${elem.username}</span>
            <div class="action">
                <span class="material-symbols-outlined edit" onclick="openEditModal(${ind})">edit</span>
                <span class="material-symbols-outlined delete-icon" onclick="deleteContact(${ind})">delete</span>
                <span class="material-symbols-outlined about" onclick="showContactInfo(${ind})">info</span>
            </div>
        `;
        list.append(item);
    });
}

function openModal() {
    currentIndex = -1;
    document.getElementById('modalTitle').textContent = 'Add Contact';
    document.getElementById('inputUserId').value = '';
    document.getElementById('inputUserName').value = '';
    document.getElementById('inputUserPhone').value = '';
    document.getElementById('inputUserEmail').value = '';
    
    document.getElementById('myModal').style.display = 'flex';
}

function openEditModal(ind) {
    currentIndex = ind;
    const user = users[ind];
    document.getElementById('modalTitle').textContent = 'Edit Contact';
    document.getElementById('inputUserId').value = user.id;
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

function saveContact() {
    const id = document.getElementById('inputUserId').value.trim();
    const username = document.getElementById('inputUserName').value.trim();
    const phone = document.getElementById('inputUserPhone').value.trim();
    const email = document.getElementById('inputUserEmail').value.trim();

    if (username && phone) {
        if (currentIndex === -1) {
            // Add new contact
            users.push({
                id: id || Date.now().toString(), // Use ID if provided, otherwise generate a new one
                username,
                phone,
                email,
                photo: 'assets/empty-profile.jpg' // Default photo
            });
        } else {
            // Edit existing contact
            users[currentIndex] = {
                id: id || users[currentIndex].id, // Keep existing ID if none provided
                username,
                phone,
                email,
                photo: users[currentIndex].photo // Keep existing photo
            };
        }

        document.getElementById('myModal').style.display = 'none';
        renderList();
    }
}

function deleteContact(ind) {
    users.splice(ind, 1);
    renderList();
}

function deleteAllContacts() {
    if (confirm('Are you sure you want to delete all contacts?')) {
        users.length = 0; // Clear the users array
        renderList(); // Re-render the list to reflect the changes
    }
}

function showContactInfo(index) {
    const user = users[index];
    const aboutModal = document.getElementById('aboutModal');
    
    // Populate modal with user info
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

document.addEventListener('DOMContentLoaded', renderList);