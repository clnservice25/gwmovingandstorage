(function(){
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));
  }

  function showToast(message){
    let toast = document.querySelector('.toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'toast';
      Object.assign(toast.style,{position:'fixed',right:'18px',bottom:'18px',background:'#092a66',color:'#fff',padding:'14px 16px',borderRadius:'12px',boxShadow:'0 16px 36px rgba(9,42,102,.2)',zIndex:'2000',maxWidth:'360px'});
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    clearTimeout(window.__toast);
    toast.style.display='block';
    window.__toast = setTimeout(()=>toast.style.display='none', 3200);
  }

  function openTawkChat(){
    let attempts = 0;
    const maxAttempts = 24;

    function tryOpen(){
      if(window.Tawk_API && typeof window.Tawk_API.maximize === 'function'){
        window.Tawk_API.maximize();
        return true;
      }
      return false;
    }

    if(tryOpen()) return;
    showToast('Opening live chat...');
    const timer = setInterval(()=>{
      attempts += 1;
      if(tryOpen() || attempts >= maxAttempts){
        clearInterval(timer);
        if(attempts >= maxAttempts && !(window.Tawk_API && typeof window.Tawk_API.maximize === 'function')){
          showToast('Live chat is still loading. Please use the chat bubble or try again in a moment.');
        }
      }
    }, 250);
  }

  document.querySelectorAll('[data-tawk-open]').forEach(button=>{
    button.addEventListener('click', openTawkChat);
  });


  document.querySelectorAll('[data-track-form]').forEach(form=>{
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const input = form.querySelector('input');
      const code = input ? input.value.trim() : '';
      if(code) window.location.href = 'track.html?tracking=' + encodeURIComponent(code);
    });
  });

  document.querySelectorAll('[data-mail-form]').forEach(form=>{
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const fd = new FormData(form);
      const to = form.getAttribute('data-to') || 'info@gwmovingandstorage.com';
      const subject = encodeURIComponent(fd.get('subject') || 'Website enquiry');
      let body = '';
      for(const [key,val] of fd.entries()){
        if(key === 'subject') continue;
        body += key + ': ' + val + '\n';
      }
      try{
        window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
      }catch(err){
        showToast('Please email us directly at info@gwmovingandstorage.com.');
      }
    });
  });
})();
