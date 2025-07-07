document.getElementById('waterForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    freeChlorine: form.freeChlorine.value,
    nitrate: form.nitrate.value,
    nitrite: form.nitrite.value,
    hardness: form.hardness.value,
    totalAlkalinity: form.totalAlkalinity.value,
    ph: form.ph.value,
    sodiumChloride: form.sodiumChloride.value,
    ammoniaNitrogen: form.ammoniaNitrogen.value,
    temperature: form.temperature.value,
    notes: form.notes.value
  };

  const response = await fetch('https://script.google.com/macros/s/AKfycbzTxR1qnLFPdssTHifjSKdUqQgqSS--PujqbxQF1hCdGLKgLtD0lMNPql7S_gfgNVgSlQ/exec', {
    method: 'POST',
    mode: 'no-cors', 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await response.text();
  document.getElementById('result').innerText = "Entry logged! ✅ Way to Go!";
  form.reset();
});
