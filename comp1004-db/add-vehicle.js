import { supabase } from './supabase.js';

const regoInput = document.getElementById('rego');
const makeInput = document.getElementById('make');
const modelInput = document.getElementById('model');
const colourInput = document.getElementById('colour');
const ownerInput = document.getElementById('owner');

const checkOwnerBtn = document.getElementById('check-owner');
const ownerResultsDiv = document.getElementById('owner-results');
const msgOwner = document.getElementById('message-owner');
const msgVehicle = document.getElementById('message-vehicle');

let selectedOwnerId = null;

// Enable "Check owner" only when input is filled
ownerInput.addEventListener('input', () => {
  checkOwnerBtn.disabled = ownerInput.value.trim() === '';
});

// Owner search
checkOwnerBtn.addEventListener('click', async () => {
  const ownerName = ownerInput.value.trim();
  ownerResultsDiv.innerHTML = '';
  msgOwner.textContent = '';
  selectedOwnerId = null;

  const { data, error } = await supabase
    .from('People')
    .select('*')
    .ilike('Name', `%${ownerName}%`);

  if (error) {
    msgOwner.textContent = 'Error: ' + error.message;
    return;
  }

  if (data.length === 0) {
    msgOwner.textContent = 'No result found';
    showNewOwnerButton();
    return;
  }

  msgOwner.textContent = 'Search successful';
  data.forEach(person => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${person.Name} – ${person.LicenseNumber}</p>
      <button>Select owner</button>
    `;
    div.querySelector('button').addEventListener('click', () => {
      selectedOwnerId = person.PersonID;
      msgOwner.textContent = `Selected: ${person.Name}`;
      showAddVehicleButton();
    });
    ownerResultsDiv.appendChild(div);
  });

  showNewOwnerButton();
});

function showNewOwnerButton() {
  const btn = document.createElement('button');
  btn.textContent = 'New owner';
  btn.addEventListener('click', showNewOwnerForm);
  ownerResultsDiv.appendChild(btn);
}

function showNewOwnerForm() {
  const form = document.createElement('form');
  form.innerHTML = `
    <label>Name: <input id="name" type="text" /></label>
    <label>Address: <input id="address" type="text" /></label>
    <label>DOB: <input id="dob" type="date" /></label>
    <label>License Number: <input id="license" type="text" /></label>
    <label>Expiry Date: <input id="expire" type="date" /></label>
    <button type="submit">Add owner</button>
  `;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const address = form.querySelector('#address').value.trim();
    const dob = form.querySelector('#dob').value.trim();
    const license = form.querySelector('#license').value.trim();
    const expire = form.querySelector('#expire').value.trim();

    if (!name || !address || !dob || !license || !expire) {
      msgOwner.textContent = 'Error: All fields required.';
      return;
    }

    const { data: existing } = await supabase
      .from('People')
      .select('*')
      .eq('Name', name)
      .eq('Address', address)
      .eq('DOB', dob)
      .eq('LicenseNumber', license)
      .eq('ExpiryDate', expire);

    if (existing.length > 0) {
      msgOwner.textContent = 'Error: Duplicate owner.';
      return;
    }

    const { data, error } = await supabase
      .from('People')
      .insert([{ Name: name, Address: address, DOB: dob, LicenseNumber: license, ExpiryDate: expire }])
      .select();

    if (error) {
      msgOwner.textContent = 'Error: ' + error.message;
      return;
    }

    msgOwner.textContent = 'Owner added successfully.';
    selectedOwnerId = data[0].id;
    showAddVehicleButton();
  });

  ownerResultsDiv.appendChild(form);
}

function showAddVehicleButton() {
  const btn = document.createElement('button');
  btn.textContent = 'Add vehicle';
  btn.addEventListener('click', submitVehicle);
  ownerResultsDiv.appendChild(btn);
}

async function submitVehicle() {
  const rego = regoInput.value.trim();
  const make = makeInput.value.trim();
  const model = modelInput.value.trim();
  const colour = colourInput.value.trim();

  msgVehicle.textContent = '';

  if (!rego || !make || !model || !colour || !selectedOwnerId) {
    msgVehicle.textContent = 'Error: All fields are required.';
    return;
  }

  const { error } = await supabase
    .from('Vehicle')
    .insert([{
      VehicleID: rego,
      Make: make,
      Model: model,
      Colour: colour,
      OwnerID: selectedOwnerId
    }]);

  if (error) {
    msgVehicle.textContent = 'Error: ' + error.message;
  } else {
    msgVehicle.textContent = 'Vehicle added successfully';
  }
}