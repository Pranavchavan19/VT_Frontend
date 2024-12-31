// Dynamically load the API URL from environment variables
const apiUrl = "https://vt-backend.onrender.com/api/v1"; // Replace with your Render backend URL

document.getElementById("fetchData").addEventListener("click", () => {
    fetch(`${apiUrl}/api/v1`, {
        method: "GET",
        credentials: "include", // Include cookies if necessary
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            document.getElementById("response").innerText = JSON.stringify(data, null, 2);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});
