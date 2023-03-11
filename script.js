// Set up the API request URL and API key
const apiUrl = "https://www.googleapis.com/youtube/v3/channels";
const apiKey = "AIzaSyCczQ47K41gMpEHbDUTruHsyNMElKdG8M4";

// Define the channels to track and their channel IDs
const channels = [
  { name: "PewDiePie", id: "UC-lHJZR3Gqxm24_Vd_AJ5Yw" },
  { name: "T-Series", id: "UCq-Fj5jknLsUf-MWSy4_brA" },
  // Add more channels here
];

// Define a function to make the API request and update the table
function updateSubscriberCounts() {
  channels.forEach((channel, index) => {
    const channelCountElement = document.getElementById(`${channel.name.toLowerCase()}-count`);
    const requestUrl = `${apiUrl}?part=statistics&id=${channel.id}&key=${apiKey}`;

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        const subscriberCount = parseInt(data.items[0].statistics.subscriberCount);
        const previousCount = parseInt(channelCountElement.dataset.subscriberCount);
        channelCountElement.innerText = subscriberCount.toLocaleString();

        if (!isNaN(previousCount)) {
          if (subscriberCount > previousCount) {
            channelCountElement.classList.add("increase");
            channelCountElement.classList.remove("decrease");
          } else if (subscriberCount < previousCount) {
            channelCountElement.classList.add("decrease");
            channelCountElement.classList.remove("increase");
          }
        }

        channelCountElement.classList.remove("loading");
        channelCountElement.dataset.subscriberCount = subscriberCount;
      })
      .catch(error => console.error(`Error fetching subscriber count for ${channel.name}: ${error}`));
  });
}

// Call the updateSubscriberCounts function every 5 seconds
setInterval(updateSubscriberCounts, 5000);
