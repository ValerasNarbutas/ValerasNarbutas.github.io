/**
 * Jekyll Terminal Theme — terminal.js
 * Handles: boot sequence, color scheme, keyboard shortcuts
 */

(function () {
  'use strict';

  // ── Boot sequence ─────────────────────────────────────────
  const BOOT_KEY = 'terminal-booted';
  const bootEl   = document.getElementById('boot-sequence');

  if (bootEl) {
    // Only show boot sequence once per session
    if (sessionStorage.getItem(BOOT_KEY)) {
      bootEl.style.display = 'none';
    } else {
      sessionStorage.setItem(BOOT_KEY, '1');
      // Remove from DOM after animation completes
      bootEl.addEventListener('animationend', () => bootEl.remove());
    }
  }

  // ── Color scheme ─────────────────────────────────────────
  // Read from <body data-scheme="..."> set by liquid in default.html
  const scheme = document.body.dataset.scheme || 'green';
  if (scheme !== 'green') {
    document.documentElement.setAttribute('data-scheme', scheme);
  }

  // ── Active nav link ───────────────────────────────────────
  const path  = window.location.pathname;
  const links = document.querySelectorAll('.site-nav a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' ? path === '/' : path.startsWith(href)) {
      link.classList.add('active');
    }
  });

  // ── Keyboard shortcuts ────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    // ? or / — focus search (if present)
    if ((e.key === '/' || e.key === '?') && !isInputFocused()) {
      const searchInput = document.querySelector('input[type="search"]');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }

    // g h — go home
    if (e.key === 'h' && e.altKey) {
      window.location.href = '/';
    }
  });

  function isInputFocused() {
    const tag = document.activeElement && document.activeElement.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA';
  }

  // ── Code block: copy button ───────────────────────────────
  document.querySelectorAll('pre').forEach(function (block) {
    const btn = document.createElement('button');
    btn.className    = 'copy-btn';
    btn.textContent  = '[copy]';
    btn.style.cssText = [
      'position:absolute', 'top:6px', 'right:6px',
      'background:transparent', 'border:none',
      'color:#555', 'font-family:inherit', 'font-size:11px',
      'cursor:pointer', 'transition:color .15s'
    ].join(';');

    btn.addEventListener('mouseenter', () => btn.style.color = '#00ff41');
    btn.addEventListener('mouseleave', () => btn.style.color = '#555');

    btn.addEventListener('click', function () {
      const code = block.querySelector('code');
      const text = code ? code.innerText : block.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '[copied!]';
        btn.style.color = '#00ff41';
        setTimeout(() => {
          btn.textContent = '[copy]';
          btn.style.color = '#555';
        }, 2000);
      });
    });

    block.style.position = 'relative';
    block.appendChild(btn);
  });

  // ── Reading progress bar ─────────────────────────────────
  const postContent = document.querySelector('.post-content');
  if (postContent) {
    const bar = document.createElement('div');
    bar.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'height:2px',
      'background:#00ff41', 'width:0%', 'z-index:200',
      'transition:width .1s linear', 'box-shadow:0 0 6px #00ff41'
    ].join(';');
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

})();
