window.addEventListener('load', async () => {
    try {
        const options = await chrome.storage.sync.get();
        const projectName = options.selectedProjectName;

        if (!projectName) {
            alert('(初回のみ)プロジェクトのURLをセットしましょう! Let’s set the project URL! (Only the first time)');
            window.open(chrome.runtime.getURL('options.html'));
            return;
        }

        const tags = formatTags(options.selectedTags);
        const tab = await getCurrentTab();

        if (tab) {
            const { title, url } = tab;
            const formattedTitle = title.trim() || "No title";
            const lines = createScrapboxLines(url, formattedTitle, tags);

            chrome.tabs.create({ 
                url: `https://scrapbox.io/${projectName}/${encodeURIComponent(formattedTitle)}?body=${encodeURIComponent(lines.join('\n'))}` 
            });
        }
    } catch (error) {
        console.error('Error loading project:', error);
    }
});

function formatTags(selectedTags) {
    return selectedTags ? "#" + selectedTags.replace(/\s/g, "").split(",").join(" #") : '';
}

function createScrapboxLines(url, title, tags) {
    const lines = [`[${url} ${title}]`];
    if (tags) lines.push("", tags);
    return lines;
}

async function getCurrentTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
            resolve(tabs[0]);
        });
    });
}