function saveOptions() {

    const projectName = document.getElementById('projectName').value;
    const tags = document.getElementById('tags').value;

    chrome.storage.sync.set({
        selectedProjectName: projectName,
        selectedTags: tags
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved!';
        setTimeout(() => {
            status.textContent = '';
        }, 1500);
    });
}


function openShotcutSetting() {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' });
}

function restoreOptions() {
    chrome.storage.sync.get({
        selectedProjectName: '',
        selectedTags: 'WebScrap'
    }, items => {
        document.getElementById('projectName').value = items.selectedProjectName;
        document.getElementById('tags').value = items.selectedTags;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('shortcut').addEventListener('click', openShotcutSetting);
