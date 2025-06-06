const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');

function loadScript(window, filename) {
  const scriptContent = fs.readFileSync(path.resolve(__dirname, '..', filename), 'utf8');
  const scriptEl = window.document.createElement('script');
  scriptEl.textContent = scriptContent;
  window.document.body.appendChild(scriptEl);
}

test('dark mode toggle adds and removes class', () => {
  const html = `<!DOCTYPE html><html><body><button id="dark-mode-toggle"></button></body></html>`;
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const { window } = dom;
  const $ = jquery(window);
  window.$ = window.jQuery = $;

  loadScript(window, 'scripts.js');

  const button = window.document.getElementById('dark-mode-toggle');
  button.click();
  expect(window.document.body.classList.contains('dark-mode')).toBe(true);
  button.click();
  expect(window.document.body.classList.contains('dark-mode')).toBe(false);
});
