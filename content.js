(() => {
    chrome.browserAction.onClicked.addListener(tab => {
        chrome.storage.sync.get(null, function(items) {
            const title = tab.title.trim() || "No title";
            const url = tab.url;

            const project = items.selectedProjectName;
            const tags = items.selectedTags ? "#" + items.selectedTags.replace(/\s/g, "").split(",").join(" #") : false;

            if (!project) {
                alert('Set Project Url!');
                window.open(chrome.runtime.getURL("options.html"));
                return;
            }

            let lines = [`[${url} ${title}]`];
            if (tags) {
                lines.push("", tags);
            }

            window.open(`https://scrapbox.io/${project}/${encodeURIComponent(title)}?body=${encodeURIComponent(lines.join('\n'))}`);
        });
    });
})();
