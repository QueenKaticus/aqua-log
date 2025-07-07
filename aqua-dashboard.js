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

  // Begin the Chart function
  async function fetchAndDrawChart() {
  const response = await fetch('https://script.google.com/macros/s/AKfycbyQX4LMlrTjj6J5f4Ek-FPKbA2Zdvr2nuALUA-2fM6RYjMkNvm0QLJHXRzHmvq56zoK/exec');
  const data = await response.json();

  // For now, we’ll just graph Nitrate as a test
  const labels = data.map((entry, index) => `Entry ${index + 1}`);
  const nitrateValues = data.map(entry => entry.Nitrate);

  const ctx = document.getElementById('parameterChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Nitrate Levels',
        data: nitrateValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

.then(() => {  
  // Fake success message b/c of CORS
  document.getElementById('result').innerText = "Entry logged! ✅ Way to Go!";
  form.reset();  // ✅ Reset the form first (even if it’s hidden later).
  // Hide the form and show the graph
  document.getElementById('waterForm').style.display = 'none';
  document.getElementById('graphSection').style.display = 'block';
  fetchAndDrawChart();  // ✅ Then fetch and draw the graph.
  });
                                                      
});
