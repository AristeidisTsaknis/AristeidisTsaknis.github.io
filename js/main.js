/**
 * PORTFOLIO INTERACTIVITY
 * Theme toggle, smooth scrolling (Lenis), certification accordion, and the
 * FLIP-animated project / profile dialogs.
 *
 * Depends on: js/projects.js (window.PROJECT_DATA) and, optionally, Lenis.
 */
(() => {
    'use strict';

    const html = document.documentElement;
    const TRANSITION_MS = 500; // keep in sync with `.project-card.is-cloned` in style.css

    // ======================================================================
    // 01. STATE
    // ======================================================================
    let overlay = null;
    let lenis = null;
    let activeClone = null;
    let activeCard = null;      // source card for project dialogs (null for the profile dialog)
    let lastFocus = null;
    let isClosing = false;
    let inertedElements = [];

    // ======================================================================
    // 02. THEME
    // ======================================================================
    // The saved theme is applied by an inline script in <head> to avoid a flash.
    const themeBtn = document.getElementById('theme-btn');

    function syncThemeButton() {
        if (themeBtn) themeBtn.setAttribute('aria-pressed', String(html.getAttribute('data-theme') === 'dark'));
    }

    function toggleTheme() {
        const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
        syncThemeButton();
    }

    // ======================================================================
    // 03. CERTIFICATION ACCORDION
    // ======================================================================
    function toggleCert(header) {
        const item = header.closest('.collapsible-item');
        if (!item) return;
        const isOpen = item.classList.toggle('is-open');
        header.setAttribute('aria-expanded', String(isOpen));
    }

    // ======================================================================
    // 04. DIALOG HELPERS
    // ======================================================================
    /** Makes everything behind the dialog unreachable for keyboard and screen readers. */
    function setBackgroundInert(isInert) {
        if (isInert) {
            inertedElements = [...document.body.children].filter(el =>
                el !== activeClone && el !== overlay && el.tagName !== 'SCRIPT' && el.tagName !== 'TEMPLATE' && !el.inert);
            inertedElements.forEach(el => { el.inert = true; });
        } else {
            inertedElements.forEach(el => { el.inert = false; });
            inertedElements = [];
        }
    }

    function buildCloseButton(label) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'close-btn-float';
        btn.textContent = label;
        btn.addEventListener('click', closeDialog);
        return btn;
    }

    function showDialog(clone, contentNode, closeLabel) {
        const content = document.createElement('div');
        content.className = 'expanded-content';
        content.append(contentNode);

        const closeBtn = buildCloseButton(closeLabel);
        clone.append(closeBtn, content);
        clone.setAttribute('role', 'dialog');
        clone.setAttribute('aria-modal', 'true');
        clone.setAttribute('data-lenis-prevent', 'true');

        lastFocus = document.activeElement;
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();

        document.body.appendChild(clone);
        activeClone = clone;
        setBackgroundInert(true);
        overlay.classList.add('active');

        requestAnimationFrame(() => {
            clone.classList.add('is-expanded');
            closeBtn.focus({ preventScroll: true });
        });
    }

    // ======================================================================
    // 05. PROJECT DIALOG
    // ======================================================================
    function openProject(card) {
        if (activeClone || isClosing || !overlay) return;

        const data = window.PROJECT_DATA && window.PROJECT_DATA[card.dataset.project];
        if (!data) return;

        const rect = card.getBoundingClientRect();
        const clone = card.cloneNode(true);
        clone.removeAttribute('data-project');
        clone.classList.add('is-cloned');
        clone.setAttribute('aria-label', data.title);

        // The clone is a static copy: replace the interactive trigger with plain text.
        const trigger = clone.querySelector('.card-trigger');
        if (trigger) trigger.replaceWith(document.createTextNode(trigger.textContent));

        // Reuse the accent colour defined by the card's gradient class.
        const visual = card.querySelector('.visual');
        const accent = visual ? getComputedStyle(visual).getPropertyValue('--card-accent').trim() : '';
        clone.style.setProperty('--card-accent', accent || 'var(--accent)');

        clone.style.top = rect.top + 'px';
        clone.style.left = rect.left + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';

        const body = document.createElement('template');
        body.innerHTML = data.body;

        activeCard = card;
        showDialog(clone, body.content, 'CLOSE');
        card.classList.add('is-invisible');
    }

    // ======================================================================
    // 06. PROFILE DIALOG
    // ======================================================================
    function openProfile() {
        const source = document.getElementById('profile-template');
        if (activeClone || isClosing || !overlay || !source) return;

        const clone = document.createElement('div');
        clone.className = 'project-card is-cloned';
        clone.setAttribute('aria-labelledby', 'profile-title');
        clone.style.setProperty('--card-accent', 'var(--accent)');

        // Full-screen immediately; no source card to animate from.
        Object.assign(clone.style, { position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', zIndex: '9999' });

        activeCard = null;
        showDialog(clone, source.content.cloneNode(true), 'CLOSE [ESC]');
    }

    // ======================================================================
    // 07. CLOSE
    // ======================================================================
    function closeDialog() {
        if (!activeClone || isClosing) return;
        isClosing = true;

        const clone = activeClone;
        clone.classList.remove('is-expanded');
        overlay.classList.remove('active');

        if (activeCard) {
            // Shrink back onto the source card.
            const rect = activeCard.getBoundingClientRect();
            clone.style.top = rect.top + 'px';
            clone.style.left = rect.left + 'px';
            clone.style.width = rect.width + 'px';
            clone.style.height = rect.height + 'px';
        } else {
            clone.style.opacity = '0';
        }

        setTimeout(() => {
            clone.remove();
            setBackgroundInert(false);
            document.body.style.overflow = '';
            if (lenis) lenis.start();

            let returnTo = lastFocus;
            if (activeCard) {
                activeCard.classList.remove('is-invisible');
                returnTo = activeCard.querySelector('.card-trigger') || returnTo;
            }
            if (returnTo && returnTo.focus) returnTo.focus({ preventScroll: true });

            activeClone = null;
            activeCard = null;
            lastFocus = null;
            isClosing = false;
        }, TRANSITION_MS);
    }

    // ======================================================================
    // 08. EVENT WIRING & INIT
    // ======================================================================
    document.addEventListener('click', (e) => {
        if (e.target.closest('#theme-btn')) return toggleTheme();

        const certHeader = e.target.closest('.cert-header');
        if (certHeader) return toggleCert(certHeader);

        if (e.target.closest('[data-open-profile]')) return openProfile();

        const anchor = e.target.closest('a[href^="#"]');
        if (anchor && lenis) {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const header = document.querySelector('.command-nav');
                const stickyOffset = header && getComputedStyle(header).position === 'sticky' ? header.offsetHeight : 0;
                lenis.scrollTo(target, { offset: -stickyOffset });
                history.replaceState(null, '', anchor.getAttribute('href'));
            }
            return;
        }

        const card = e.target.closest('.project-card[data-project]');
        if (card) openProject(card);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDialog();
    });

    document.addEventListener('DOMContentLoaded', () => {
        syncThemeButton();

        overlay = document.createElement('div');
        overlay.className = 'overlay-backdrop';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
            });
            const raf = (time) => {
                lenis.raf(time);
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        }
    });
})();
