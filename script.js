// Card animation and option logic

document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const cardInner = document.querySelector('.card-inner');
    const option1 = document.querySelector('.option1');
    const option2 = document.querySelector('.option2');
    const card1 = document.querySelector('.card1');
    const card2 = document.querySelector('.card2');
    const openMessageCardBtn = document.getElementById('openMessageCardBtn');
    const rightMessageCard = document.getElementById('rightMessageCard');
    const closeMessageCardBtn = document.getElementById('closeMessageCardBtn');
    const messageUnlockDate = new Date('2026-04-28T00:00:00');
    const earlyMessageText = 'Hey We said AFTER 27, today is your birthday so enjoy it, come after your bday malaka';
    const VISITOR_LOG_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz5HA2SqLhsgjiP1V98gDnYTOrYhJ9CKnLKRyvk9xFmYQMKQaeZ0s7wiFSwGajwjtdR/exec';

    async function trackVisitorLocation() {
        try {
            const geoResponse = await fetch('https://ipapi.co/json/');
            if (!geoResponse.ok) {
                return;
            }

            const geo = await geoResponse.json();
            const visitData = {
                country: geo.country_name || 'Unknown',
                countryCode: geo.country_code || 'XX',
                city: geo.city || 'Unknown',
                region: geo.region || 'Unknown',
                timestamp: new Date().toISOString(),
                page: window.location.href,
                userAgent: navigator.userAgent,
                ip: geo.ip || '',
                screen: `${window.screen.width}x${window.screen.height}`,
                touchDevice: navigator.maxTouchPoints > 0 ? 'yes' : 'no',
            };

            // Optional: logs to your own endpoint (e.g. Google Apps Script webhook).
            // Using GET query params avoids CORS/preflight issues on static hosts.
            if (VISITOR_LOG_WEBHOOK_URL) {
                const query = new URLSearchParams(visitData).toString();
                const beaconUrl = `${VISITOR_LOG_WEBHOOK_URL}?${query}`;
                await fetch(beaconUrl, {
                    method: 'GET',
                    mode: 'no-cors',
                    cache: 'no-store'
                });
            }

            // Useful while testing in browser devtools.
            console.log('Visitor location:', visitData);
        } catch (error) {
            console.warn('Visitor tracking failed:', error);
        }
    }

    trackVisitorLocation();

let isOpen = false;
card.addEventListener('click', function(e) {
    if (!isOpen) {
        card.classList.add('open');
        setTimeout(() => cardInner.classList.add('open'), 350);
        isOpen = true;
    } else if (e.target.classList.contains('card')) {
        cardInner.classList.remove('open');
        setTimeout(() => card.classList.remove('open'), 350);
        isOpen = false;
        card1.style.display = 'none';
        card2.style.display = 'none';
    }
});
// Allow closing by clicking outside the card
document.addEventListener('click', function(e) {
    if (isOpen && !card.contains(e.target)) {
        cardInner.classList.remove('open');
        setTimeout(() => card.classList.remove('open'), 350);
        isOpen = false;
        card1.style.display = 'none';
        card2.style.display = 'none';
    }
});
// Prevent closing when clicking inside the card-back
document.querySelector('.card-back').addEventListener('click', function(e) {
    e.stopPropagation();
});

    option1.addEventListener('click', function(e) {
        e.stopPropagation();
        card1.style.display = 'block';
        card2.style.display = 'none';
    });

    option2.addEventListener('click', function(e) {
        e.stopPropagation();
        card2.style.display = 'block';
        card1.style.display = 'none';
    });

    openMessageCardBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const now = new Date();
        if (now < messageUnlockDate) {
            alert(earlyMessageText);
            return;
        }

        rightMessageCard.classList.add('open');
    });

    closeMessageCardBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        rightMessageCard.classList.remove('open');
    });

    document.addEventListener('click', function(e) {
        if (
            rightMessageCard.classList.contains('open') &&
            !rightMessageCard.contains(e.target) &&
            !openMessageCardBtn.contains(e.target)
        ) {
            rightMessageCard.classList.remove('open');
        }
    });
});


