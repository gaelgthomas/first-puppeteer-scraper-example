import puppeteer from "puppeteer";

// TODO: Now it's your turn to improve the scraper and make him get more data from the Quotes to Scrape website.
// Here's a list of potential improvements you can make:
// - Navigate between all pages using the "Next" button and fetch the quotes on all the pages
// - Fetch the quote's tags (each quote has a list of tags)
// - Scrape the author's about page (by clicking on the author's name on each quote)
// - Categorize the quotes by tags or authors (it's not 100% related to the scraping itself, but that can be a good improvement)

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("http://quotes.toscrape.com/", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    // Get the displayed text and returns it
    const quoteList = document.querySelectorAll(".quote");

    // Convert the quoteList to an iterable array
    // For each quote fetch the text and author
    return Array.from(quoteList).map((quote) => {
      // Get the sub-elements from the previously fetched quote element
      const text = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;

      return { text, author };
    });
  });

  // Display the quotes
  console.log(quotes);

  // Click on the "Next page" button
  await page.click(".pager > .next > a");

  // Close the browser
  await browser.close();
};

// Start the scraping
getQuotes();
