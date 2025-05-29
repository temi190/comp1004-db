import { supabase } from './supabase.js';

document.getElementById('people-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const license = document.getElementById('license').value.trim();
  const messageDiv = document.getElementById('message');
  const resultsDiv = document.getElementById('results');

  messageDiv.textContent = '';
  resultsDiv.innerHTML = '';

  if (!name && !license) {
    messageDiv.textContent = 'Error: Provide a name or license.';
    return;
  }

  if (name && license) {
    messageDiv.textContent = 'Error: Only one field should be used.';
    return;
  }

  let query;
  if (name) {
    query = supabase
      .from('People')
      .select('*')
      .ilike('Name', `%${name}%`);
  } else {
    query = supabase
      .from('People')
      .select('*')
      .eq('LicenseNumber', license);
  }

  const { data, error } = await query;

  if (error) {
    messageDiv.textContent = 'Error: ' + error.message;
    return;
  }

  if (data.length === 0) {
    messageDiv.textContent = 'No result found';
  } else {
    messageDiv.textContent = 'Search successful';
    data.forEach(person => {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>Name:</strong> ${person.Name}<br/>
        <strong>License:</strong> ${person.LicenseNumber}<br/>
        <strong>Address:</strong> ${person.Address}<br/>
        <strong>DOB:</strong> ${person.DOB}<br/>
        <strong>Expiry:</strong> ${person.ExpiryDate}
      `;
      resultsDiv.appendChild(div);
    });
  }
});