function github() {
    const domain = document.getElementById("domain").value.trim();

    if (!domain) {
        showToast("⚠️ Enter a domain");
        return;
    }

    const query = `"${domain}"`;

    window.open(
        "https://github.com/search?q=" + encodeURIComponent(query),
        "_blank"
    );
}

function gitLab() {
    const domain = document.getElementById("domain").value.trim();

    if (!domain) {
        showToast("⚠️ Enter a domain");
        return;
    }

    const query = `${domain}`;

    window.open(
        "https://gitlab.com/gitlab-com?filter=" + encodeURIComponent(query),
        "_blank"
    );
}

window.github = github;
window.gitLab = gitLab;