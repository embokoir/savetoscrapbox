const setStatusMessage = (message, color = '#4CAF50', duration = 10000) => {
    const status = document.getElementById('status');
    status.textContent = message;
    status.style.color = color;
    setTimeout(() => {
        status.textContent = '';
        status.style.color = '';
    }, duration);
};

const saveOptions = async () => {
    const projectName = document.getElementById('projectName').value.trim();
    const tags = document.getElementById('tags').value;

    if (!projectName) {
        setStatusMessage('Project name cannot be empty!', 'red', 5000);
        return;
    }

    await chrome.storage.sync.set({ selectedProjectName: projectName, selectedTags: tags });
    setStatusMessage('Settings saved!');
};

const openShortcutSetting = () => {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' });
};

const restoreOptions = async () => {
    const { selectedProjectName = '', selectedTags = 'WebScrap' } = await chrome.storage.sync.get(['selectedProjectName', 'selectedTags']);
    document.getElementById('projectName').value = selectedProjectName;
    const projectUrl = `https://scrapbox.io/${selectedProjectName}/`;
    document.getElementById('projectUrl').href = projectUrl;
    document.getElementById('projectUrl').textContent = projectUrl;
    document.getElementById('tags').value = selectedTags;
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('shortcut').addEventListener('click', openShortcutSetting);

document.getElementById("projectName").addEventListener("input", (e) => {
    const projectName = e.target.value.trim();
    const projectUrl = `https://scrapbox.io/${projectName}/`;
    document.getElementById("projectUrl").href = projectUrl;
    document.getElementById("projectUrl").textContent = projectUrl;
});