// script.js for stock market trend analyzer

// Function to handle login/signup
function handleAuth(event) {
    event.preventDefault();
    // Implement login/signup logic here
    alert("Login/Signup functionality to be implemented.");
}

// Function to fetch stock market data
function fetchStockData(symbol) {
    const apiKey = '4XZODU6CQ7F9WCTL'; // Replace with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Process and display stock data
            const stockDataDisplay = document.getElementById('stockData');
            const indicesDataDisplay = document.getElementById('indicesData');

            if (data['Time Series (Daily)']) {
                const latestDate = Object.keys(data['Time Series (Daily)'])[0];
                const latestData = data['Time Series (Daily)'][latestDate];
                stockDataDisplay.innerHTML = `<p>Open Price: ${latestData['1. open']}, Close Price: ${latestData['4. close']}</p>`;
                indicesDataDisplay.innerHTML = `<p>Indices: S&P 500, Dow Jones, NASDAQ</p>`; // Example indices data

                const labels = [];
                const openPrices = [];
                const closePrices = [];

                for (const [date, values] of Object.entries(data['Time Series (Daily)'])) {
                    labels.push(date);
                    openPrices.push(parseFloat(values['1. open']));
                    closePrices.push(parseFloat(values['4. close']));
                }

                const ctx = document.getElementById('stockGraph').getContext('2d');
                const stockChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Open Price',
                            data: openPrices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            fill: false
                        }, {
                            label: 'Close Price',
                            data: closePrices,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Price (USD)'
                                }
                            }
                        }
                    }
                });
            } else {
                console.error('No data found for the given symbol.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function convertCurrency() {
    const amount = document.getElementById('usdAmount').value;
    const apiKey = 'YOUR_CURRENCY_API_KEY'; // Replace with your currency API key
    const url = `https://api.exchangerate-api.com/v4/latest/USD`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const inrRate = data.rates.INR;
            const convertedAmount = (amount * inrRate).toFixed(2);
            document.getElementById('conversionResult').innerText = `${amount} USD = ${convertedAmount} INR`;
        })
        .catch(error => console.error('Error fetching currency data:', error));
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    // Save the theme preference in local storage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Load the theme preference from local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
}

document.getElementById('authForm').addEventListener('submit', handleAuth);
