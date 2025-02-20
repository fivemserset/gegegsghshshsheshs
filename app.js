document.getElementById("searchButton").addEventListener("click", function () {
    const searchQuery = document.getElementById("searchQuery").value;
    const queryType = document.getElementById("queryType").value; // Get the selected query type
    const resultsContainer = document.getElementById("results");

    // Check if the search query is provided
    if (!searchQuery) {
        resultsContainer.innerHTML = "<p>Please enter a search query.</p>";
        return;
    }

    // Show loading message while fetching results
    resultsContainer.innerHTML = "<p>Loading...</p>";

    // Build the OSINTCat API URL
    const apiKey = "yIrCqD29ZFb3S3IJ63t4_GKFfGrN6tkWjU6cPse6W4k"; // Your API key here
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Using the CORS proxy
    const targetUrl = `https://osintcat.com/search?term=${encodeURIComponent(searchQuery)}&type=${encodeURIComponent(queryType)}&api_key=${apiKey}`;

    // Full URL with the proxy
    const requestUrl = proxyUrl + targetUrl;

    // Fetch data from the OSINTCat API
    fetch(requestUrl)
        .then(response => {
            // Log the response status and text for debugging
            console.log('Response Status:', response.status);
            return response.text().then(text => {
                if (response.ok) {
                    try {
                        // Try to parse the response as JSON
                        const jsonData = JSON.parse(text);
                        return jsonData;
                    } catch (error) {
                        throw new Error('Error parsing JSON: ' + error.message);
                    }
                } else {
                    throw new Error('Request failed with status: ' + response.status + ', Message: ' + text);
                }
            });
        })
        .then(data => {
            // Handle the data returned from the API
            console.log('API Data:', data);
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
            // Catch any errors and display them to the user
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
});
