export function renderWithTemplate(
    template,
    parent,
    data,
    callback
) {
    parent.insertAdjacentHTML('afterbegin', template.innerHTML);
    if(callback) callback(data);
}

export async function loadTemplate(path) {
    const html = await fetch(path).then(res => res.text());
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
  }

export async function loadHeaderFooter() {
    const headerPartial = await loadTemplate('/partials/header.html');
    const footerPartial = await loadTemplate('/partials/footer.html');
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');

    renderWithTemplate(headerPartial, header);
    renderWithTemplate(footerPartial, footer);
}

export function getLocalStorage(key) {
    const item = localStorage.getItem(key);
    return JSON.parse(item || '[]');
  }

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    window.location.reload();
  }