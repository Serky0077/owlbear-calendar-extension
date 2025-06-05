const panel = document.createElement('div');
panel.id = 'calendar-panel';
panel.innerHTML = `
  <div>
    <strong>Calendário do Mundo</strong><br/>
    <label>Data: <input id="date-input" type="date"></label><br/>
    <label>Hora: <input id="time-input" type="time" step="60"></label><br/>
    <button id="save-datetime">Salvar</button>
  </div>
  <div id="display-datetime"></div>
`;
document.body.appendChild(panel);

const saveDateTime = () => {
  const date = document.getElementById('date-input').value;
  const time = document.getElementById('time-input').value;
  const data = { date, time };
  localStorage.setItem('owlbear-datetime', JSON.stringify(data));
  updateDisplay();
};

const updateDisplay = () => {
  const stored = JSON.parse(localStorage.getItem('owlbear-datetime'));
  if (stored && stored.date && stored.time) {
    const date = new Date(`${stored.date}T${stored.time}`);
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const readable = \`\${days[date.getDay()]}, \${date.getDate()} de \${months[date.getMonth()]} de \${date.getFullYear()} - \${date.getHours()}:\${String(date.getMinutes()).padStart(2, '0')}\`;
    document.getElementById('display-datetime').innerText = readable;
  } else {
    document.getElementById('display-datetime').innerText = 'Nenhuma data definida.';
  }
};

document.getElementById('save-datetime').addEventListener('click', saveDateTime);
updateDisplay();