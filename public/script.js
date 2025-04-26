const translations = {
    en: {
        from: "From (Airport Code)",
        to: "To (Airport Code)",
        search: "Search Flights"
    },
    ar: {
        from: "من (رمز المطار)",
        to: "إلى (رمز المطار)",
        search: "ابحث عن رحلات"
    },
    es: {
        from: "Desde (Código de aeropuerto)",
        to: "Hacia (Código de aeropuerto)",
        search: "Buscar vuelos"
    },
    nl: {
        from: "Van (Luchthavencode)",
        to: "Naar (Luchthavencode)",
        search: "Vluchten zoeken"
    }
};

document.getElementById('languageSwitcher').addEventListener('change', (e) => {
    const lang = e.target.value;
    document.getElementById('from').placeholder = translations[lang].from;
    document.getElementById('to').placeholder = translations[lang].to;
    document.querySelector('button').innerText = translations[lang].search;
});

document.getElementById('flightForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = document.getElementById('from').value.toUpperCase();
    const to = document.getElementById('to').value.toUpperCase();
    const flightsDiv = document.getElementById('flights');
    flightsDiv.innerHTML = "Loading...";

    try {
        const res = await fetch(`/api/flights?from=${from}&to=${to}`);
        const data = await res.json();
        flightsDiv.innerHTML = '';

        if (data.data && data.data.length > 0) {
            data.data.forEach(flight => {
                const card = document.createElement('div');
                card.className = 'flight-card';
                card.innerHTML = `
                    <p><strong>Flight:</strong> ${flight.flight.iata}</p>
                    <p><strong>From:</strong> ${flight.departure.iata}</p>
                    <p><strong>To:</strong> ${flight.arrival.iata}</p>
                    <p><strong>Status:</strong> ${flight.flight_status}</p>
                `;
                flightsDiv.appendChild(card);
            });
        } else {
            flightsDiv.innerHTML = "No flights found.";
        }
    } catch (err) {
        console.error(err);
        flightsDiv.innerHTML = "Error fetching flights.";
    }
});