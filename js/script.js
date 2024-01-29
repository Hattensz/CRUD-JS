const nameClient = document.getElementById('name');
const emailClient = document.getElementById('email');
const cellClient = document.getElementById('cell');
const cityClient = document.getElementById('city');
const btnOpenModal = document.getElementById('openModal');
const btnCloseModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const btnSave = document.getElementById('btnSave');
const tableClients = document.getElementById('table-clients');
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) || [];
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient));

function createClient(client) {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
};

function readClient(){
    return getLocalStorage();
};

function updateClient(index, client) {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
    renderTable();
};

function deleteClient(index) {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
    renderTable();
};

function renderRow(client, index) {
    tableClients.innerHTML += /*html*/`
    <tr class="client hover:bg-amber-50">
        <td class="break-words py-4 px-2 border-x">${client.name}</td>
        <td class="break-words py-4 px-2 border-x">${client.email}</td>
        <td class="break-words py-4 px-2 border-x">${client.cell}</td>
        <td class="break-words py-4 px-2 border-x">${client.city}</td>
        <td class="break-words py-4 px-2 border-x text-center">
            <button onClick="editClient(${index})" id="btnEdit${index}" class="p-1 w-5/12 bg-orange-300 rounded-lg hover:bg-orange-200 hover:text-slate-100">
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button onClick="deleteClient(${index})" class="p-1 w-5/12 bg-red-300 rounded-lg hover:bg-red-200 hover:text-slate-100">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </td>
    </tr>
    `;
};

function clearTable(){
    const rows = document.querySelectorAll('.client');
    rows.forEach(row => row.remove());
}

function renderTable() {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(renderRow);
};

function isValidFields() {
    const isValid = document.getElementById('form').reportValidity();
    return isValid;
};

function clearFields() {
    nameClient.value = '';
    emailClient.value = '';
    cellClient.value = '';
    cityClient.value = '';
};

function saveClient() {
    if (isValidFields()){
        const client = {
            name: nameClient.value,
            email: emailClient.value,
            cell: cellClient.value,
            city: cityClient.value
        };
        const index = btnSave.dataset.index;
        if (index == 'new'){
            createClient(client);
        } else {
            updateClient(index, client);
        }
        renderTable();
        clearFields();
        closeModal();
    }
};

function closeModal() {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
};

function editClient(index) {
    const client = readClient()[index];
    client.index = index;
    nameClient.value = client.name;
    emailClient.value = client.email;
    cellClient.value = client.cell;
    cityClient.value = client.city;
    btnSave.dataset.index = index;
    btnSave.innerText = 'Atualizar';
    document.getElementById('titleAddClient').innerHTML = 'Atualizar Cadastro';
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
};

btnOpenModal.addEventListener('click', () => {
    btnSave.dataset.index = 'new';
    nameClient.value = '';
    emailClient.value = '';
    cellClient.value = '';
    cityClient.value = '';
    btnSave.innerText = 'Criar';
    document.getElementById('titleAddClient').innerHTML = 'Criar Cadastro';
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
});

btnCloseModal.addEventListener('click', () => {
    closeModal();
});

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    saveClient();
    return false
});

renderTable();