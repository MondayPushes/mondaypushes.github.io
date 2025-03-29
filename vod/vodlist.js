document.addEventListener("DOMContentLoaded", function () {
    const jsonUrl = document.querySelector("[data-json-url]")?.getAttribute("data-json-url");
    if (!jsonUrl) {
        console.error("JSON URL not specified.");
        return;
    }
    
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            populateVodList("vod-list-highlight", data.highlight);
            populateVodList("vod-list-full", data.full);
            populateVodList("vod-list-clip", data.clip);
        })
        .catch(error => console.error("Error loading JSON data:", error));
});

function populateVodList(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container || !items) return;
    
    items.forEach(item => {
        const vodItem = document.createElement("div");
        vodItem.classList.add("vod-list-item");
        
        vodItem.innerHTML = `
            <a href="${item.url}" target="_blank">
                <img src="${item.thumbnailUrl}" alt="${item.platform}">
                <span class="vod-list-item-title">${item.title}</span>
            </a>
            <span class="vod-list-item-author">
                <img src="../${item.platform}.svg" alt="${item.platform}"> ${item.author}
            </span>
            <span class="vod-list-item-date">${formatDate(item.datetime)}</span>
        `;
        
        container.appendChild(vodItem);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
