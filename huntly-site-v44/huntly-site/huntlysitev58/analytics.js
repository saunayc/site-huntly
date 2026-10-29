/*
 * Huntly — Google Analytics 4 com consentimento (LGPD)
 *
 * COMO ATIVAR: troque o valor de GA_ID abaixo pelo ID de medição do GA4
 * (Admin > Fluxos de dados > Web > "ID da métrica", formato G-XXXXXXXXXX).
 * Enquanto o valor for o placeholder, este arquivo não faz nada: nenhum
 * aviso de cookies aparece e nenhum script do Google é carregado.
 *
 * Funcionamento:
 *  - Na primeira visita aparece um aviso discreto (Aceitar / Recusar).
 *  - O Google Analytics só é carregado DEPOIS do "Aceitar".
 *  - A escolha fica salva no navegador; window.huntlyCookiePrefs() reabre o aviso.
 *  - Eventos enviados: generate_lead (formulários de cliente),
 *    cadastro_recrutador (formulário de parceiros), contato_whatsapp,
 *    contato_email e contato_telefone (cliques nesses links).
 */
(function () {
  var GA_ID = 'G-K1DBR8B7FJ';
  if (!/^G-[A-Z0-9]{6,}$/.test(GA_ID) || GA_ID === 'G-XXXXXXXXXX') return;

  var KEY = 'huntly_cookie_consent_v1';
  var loaded = false;

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function loadGA() {
    if (loaded) return;
    loaded = true;
    window.gtag = gtag;
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function track(name, params) {
    if (loaded && window.gtag) window.gtag('event', name, params || {});
  }

  // Formulários: o script de envio de cada página dispara "huntly:lead" após sucesso.
  document.addEventListener('huntly:lead', function (e) {
    var origem = (e.detail && e.detail.origem) || '';
    var evento = /recrutador/i.test(origem) ? 'cadastro_recrutador' : 'generate_lead';
    track(evento, { form_origem: origem, page_path: location.pathname });
  });

  // Cliques em WhatsApp, e-mail e telefone.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('https://wa.me') === 0) track('contato_whatsapp', { page_path: location.pathname });
    else if (h.indexOf('mailto:') === 0) track('contato_email', { page_path: location.pathname });
    else if (h.indexOf('tel:') === 0) track('contato_telefone', { page_path: location.pathname });
  }, true);

  // ---------- Aviso de cookies ----------
  var css =
    '.hck{position:fixed;left:24px;bottom:24px;z-index:9999;max-width:420px;background:#0E1B2E;color:#E8ECF2;' +
    'border:1px solid rgba(201,167,102,.35);box-shadow:0 18px 50px rgba(0,0,0,.35);padding:20px 22px;' +
    'font-family:"Libre Franklin",system-ui,sans-serif;font-size:14px;line-height:1.55;}' +
    '.hck p{margin:0 0 14px;}' +
    '.hck a{color:#C9A766;text-decoration:underline;text-underline-offset:2px;}' +
    '.hck-actions{display:flex;gap:10px;justify-content:flex-end;}' +
    '.hck button{font:inherit;font-weight:600;font-size:13px;padding:10px 18px;cursor:pointer;border-radius:0;}' +
    '.hck-no{background:transparent;color:#E8ECF2;border:1px solid rgba(232,236,242,.35);}' +
    '.hck-yes{background:#B0883F;color:#0E1B2E;border:1px solid #B0883F;}' +
    '.hck button:focus-visible{outline:2px solid #C9A766;outline-offset:2px;}' +
    '@media(max-width:640px){.hck{left:16px;right:16px;bottom:16px;max-width:none;}}';

  function showBanner() {
    if (document.querySelector('.hck')) return;
    if (!document.getElementById('hck-style')) {
      var st = document.createElement('style');
      st.id = 'hck-style';
      st.textContent = css;
      document.head.appendChild(st);
    }
    var box = document.createElement('div');
    box.className = 'hck';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', 'Aviso de cookies');
    box.innerHTML =
      '<p>Usamos cookies de estatística (Google Analytics) para entender como o site é usado e melhorá-lo. ' +
      'Nada de publicidade. <a href="huntly-legal#privacidade">Política de privacidade</a></p>' +
      '<div class="hck-actions"><button type="button" class="hck-no">Recusar</button>' +
      '<button type="button" class="hck-yes">Aceitar</button></div>';
    document.body.appendChild(box);
    box.querySelector('.hck-yes').addEventListener('click', function () {
      setChoice('granted'); box.remove(); loadGA();
    });
    box.querySelector('.hck-no').addEventListener('click', function () {
      setChoice('denied'); box.remove();
      if (loaded && window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    });
  }

  window.huntlyCookiePrefs = showBanner;

  function init() {
    var c = getChoice();
    if (c === 'granted') loadGA();
    else if (c !== 'denied') showBanner();
    document.querySelectorAll('[data-cookie-prefs]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); showBanner(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
