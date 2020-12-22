const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('quote-author');
const TwiteerBtn = document.getElementById('twitter');
const quoteBtn = document.getElementById('quote-btn');
const loader = document.getElementById('loader');

// Get Quotes
async function getQuote() {
    loader.hidden = true
    const apiUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const quoteData = data.quotes[0];
        const quote = quoteData.text;
        const author = quoteData.author;

        // if auth is null or undefined, set him as Unknown
        if (author == null || author == undefined) {
            quoteAuthor.textContent = 'Unkwnown';
        } else {
            quoteAuthor.textContent = author;
        }

        // if quote length is greater than 120 character, add long-quote class
        if (quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = quote;
        hideLoader();
    } catch (error) {
        console.log('error occurs', error);
    }
}


// twitter function
function quoteToTwitter() {
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function showLoaderAndGetQuote() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    timer = setTimeout(() => {
        getQuote();
    }, 1000)

}

function hideLoader() {
    loader.hidden = true;
    quoteContainer.hidden = false;

}

// events and listeners
TwiteerBtn.addEventListener('click', quoteToTwitter);
quoteBtn.addEventListener('click', showLoaderAndGetQuote);

getQuote();

