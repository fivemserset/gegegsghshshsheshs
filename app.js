document.getElementById("searchButton").addEventListener("click", function() {
    const searchQuery = document.getElementById("searchQuery").value;
    const queryType = document.getElementById("queryType").value;
    const resultsContainer = document.getElementById("results");

    // Check if the search query is empty
    if (!searchQuery) {
        resultsContainer.innerHTML = "<p>Please enter a search query.</p>";
        return;
    }

    // Show a loading message
    resultsContainer.innerHTML = "<p>Loading...</p>";

    // Construct the URL for the API request
    const apiKey = "yIrCqD29ZFb3S3IJ63t4_GKFfGrN6tkWjU6cPse6W4k";  // Replace with your real API key
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";  // CORS proxy URL
    const targetUrl = `https://osintcat.com/search?term=${encodeURIComponent(searchQuery)}&type=${encodeURIComponent(queryType)}&api_key=${apiKey}`;
    const requestUrl = proxyUrl + targetUrl;

    // Make the API request
    fetch(requestUrl)
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            // Check if the results exist
            if (data.results && data.results.length > 0) {
                let resultHtml = '<div class="result-box">';
                data.results.forEach(result => {
                    resultHtml += `
                        <div class="result-item">
                            <h3>Result:</h3>
                            <p>${JSON.stringify(result)}</p>
                        </div>`;
                });
                resultHtml += '</div>';
                resultsContainer.innerHTML = resultHtml;
            } else {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            resultsContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
});
