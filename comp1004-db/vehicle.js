import { supabase } from './supabase.js';

document.getElementById('vehicle-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const rego = document.getElementById('rego').value.trim();
  const messageDiv = document.getElementById('message');
  const resultsDiv = document.getElementById('results');

  resultsDiv.innerHTML = '';
  messageDiv.textContent = '';

  if (!rego) {
    messageDiv.textContent = 'Error: Please enter a registration number.';
    return;
  }

  // Step 1: Lookup vehicle by VehicleID
  const { data: vehicles, error: vehicleError } = await supabase
    .from('Vehicle')
    .select('*')
    .eq('VehicleID', rego);

  if (vehicleError) {
    messageDiv.textContent = 'Error: ' + vehicleError.message;
    return;
  }

  if (vehicles.length === 0) {
    messageDiv.textContent = 'No result found';
    return;
  }

  const vehicle = vehicles[0];

  // Step 2: Lookup owner by OwnerID
  let ownerText = 'Unknown';
  if (vehicle.OwnerID !== null) {
    const { data: owners, error: ownerError } = await supabase
      .from('People')
      .select('Name, LicenseNumber')
      .eq('PersonID', vehicle.OwnerID);

    if (ownerError) {
      messageDiv.textContent = 'Error fetching owner: ' + ownerError.message;
      return;
    }

    if (owners.length > 0) {
      const owner = owners[0];
      ownerText = `${owner.Name} – ${owner.LicenseNumber}`;
    }
  }

  // Display results
  messageDiv.textContent = 'Search successful';

  const resultDiv = document.createElement('div');
  resultDiv.innerHTML = `
    <strong>Make:</strong> ${vehicle.Make}<br/>
    <strong>Model:</strong> ${vehicle.Model}<br/>
    <strong>Colour:</strong> ${vehicle.Colour}<br/>
    <strong>Owner:</strong> ${ownerText}
  `;

  resultsDiv.appendChild(resultDiv);
});