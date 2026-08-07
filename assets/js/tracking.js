(function(){
  const form = document.querySelector('#tracking-form');
  const input = document.querySelector('#tracking-number');
  const result = document.querySelector('#tracking-result');
  const empty = document.querySelector('#tracking-empty');
  const statusBadge = document.querySelector('#tracking-status');
  const codeEl = document.querySelector('#tracking-code');
  const serviceEl = document.querySelector('#tracking-service');
  const scheduledEl = document.querySelector('#tracking-scheduled');
  const updatedEl = document.querySelector('#tracking-updated');
  const originEl = document.querySelector('#tracking-origin');
  const destinationEl = document.querySelector('#tracking-destination');
  const eventsEl = document.querySelector('#tracking-events');
  const chatButton = document.querySelector('#tracking-chat');
  let currentCode = '';

  function esc(value){
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  }

  function render(code){
    const normalized = code.trim().toUpperCase();
    const data = (window.GW_TRACKING_DATA || {})[normalized];
    currentCode = normalized;
    if(!data){
      result.hidden = true;
      empty.hidden = false;
      empty.innerHTML = `<strong>No public tracking record was found for ${esc(normalized)}.</strong><br>Check the number and try again, or use live chat for assistance.`;
      return;
    }
    empty.hidden = true;
    result.hidden = false;
    statusBadge.textContent = data.status;
    codeEl.textContent = normalized;
    serviceEl.textContent = data.service;
    scheduledEl.textContent = data.scheduled;
    updatedEl.textContent = data.updated;
    originEl.textContent = data.origin;
    destinationEl.textContent = data.destination;
    eventsEl.innerHTML = data.events.map(ev => `
      <div class="track-event ${ev.current ? 'current' : ''}">
        <div class="track-dot"></div>
        <div>
          <h4>${esc(ev.title)}</h4>
          <p>${esc(ev.detail)}</p>
          <small>${esc(ev.time)}</small>
        </div>
      </div>`).join('');
  }

  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      if(input.value.trim()){
        render(input.value);
        const url = new URL(window.location.href);
        url.searchParams.set('tracking', input.value.trim().toUpperCase());
        history.replaceState({}, '', url);
      }
    });
  }

  document.querySelectorAll('[data-sample-track]').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-sample-track');
      render(input.value);
    });
  });

  function tagTrackingChat(){
    const open = () => {
      if(window.Tawk_API){
        if(typeof window.Tawk_API.addTags === 'function'){
          window.Tawk_API.addTags(['tracking-help'], function(){});
        }
        if(typeof window.Tawk_API.addEvent === 'function'){
          const metadata = currentCode ? {'tracking-number': currentCode} : {};
          window.Tawk_API.addEvent('tracking-help-requested', metadata, function(){});
        }
        if(typeof window.Tawk_API.maximize === 'function'){
          window.Tawk_API.maximize();
          return true;
        }
      }
      return false;
    };
    if(open()) return;
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if(open() || tries > 24) clearInterval(timer);
    }, 250);
  }

  if(chatButton) chatButton.addEventListener('click', tagTrackingChat);

  const q = new URLSearchParams(location.search).get('tracking');
  if(q){
    input.value = q;
    render(q);
  }
})();
