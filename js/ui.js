const resultsDiv = document.getElementById("results");
const filterInput = document.getElementById("filter");

document.getElementById("domain").addEventListener("input", render);
filterInput.addEventListener("input", render);


let currentTab = "dorks";
let osintState = {
    crt: "",
    dns: "",
    ip: "",
    whois: ""
};

function showTab(tab, event) {
    currentTab = tab;
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    event.target.classList.add("active");
    render();
}
clearOSINT();
loadState();

function render() {
    const dorks = getDorks();

    const domain = document.getElementById("domain").value;
    const filter = filterInput.value.toLowerCase();

    resultsDiv.innerHTML = "";

    if (currentTab === "dorks") {

        if (!domain) {
            resultsDiv.innerHTML = "<h2>⚠️ To use the tool, you must enter a domain</h2>";
            return;
        }

        for (let category in dorks) {

            const card = document.createElement("div");
            card.className = "card";

            const title = document.createElement("h3");
            title.className = "category";
            title.innerText = category + " (" + dorks[category].length + ")";
            title.style.cursor = "pointer";

            // contenedor oculto (submenu)
            const content = document.createElement("div");
            content.style.display = "none";

            // toggle submenu
            title.onclick = () => {
                content.style.display = content.style.display === "none" ? "block" : "none";
            };

            dorks[category].forEach(dork => {

                const final = dork.replace(/{domain}/g, domain);

                if (!final.toLowerCase().includes(filter)) return;

                const div = document.createElement("div");
                div.className = "dork";

                const text = document.createElement("div");
                text.innerText = final;

                const btnSearch = document.createElement("button");
                btnSearch.innerText = "Search";
                btnSearch.onclick = () => search(final);

                const btnCopy = document.createElement("button");
                btnCopy.innerText = "Copy";
                btnCopy.onclick = () => copy(final);

                div.appendChild(text);
                div.appendChild(btnSearch);
                div.appendChild(btnCopy);
                content.appendChild(div);
            });

            card.appendChild(title);
            card.appendChild(content);

            if (content.children.length > 0) {
                resultsDiv.appendChild(card);
            }
        }
    }

    if (currentTab === "osint") {

        resultsDiv.innerHTML = "";

        const modules = [
            { name: "Subdomains (crt.sh)", key: "crt", action: "crt()" },
            { name: "DNS Lookup", key: "dns", action: "dnsLookup()" },
            { name: "IP Info", key: "ip", action: "ipInfo()" },
            { name: "Whois", key: "whois", action: "whois()" }
        ];

        modules.forEach(mod => {

            const card = document.createElement("div");
            card.className = "card";

            const title = document.createElement("h3");
            title.className = "category";
            title.innerText = mod.name;
            title.style.cursor = "pointer";

            const content = document.createElement("div");
            content.style.display = "none";

            // 🔥 mantener contenido previo
            content.innerHTML = `
                            <button onclick="${mod.action}">Execute</button>
                            <button onclick="copyResult('${mod.key}Result')">Copy</button>
                            <div id="${mod.key}Result">${osintState[mod.key] || ""}</div>
                        `;

            // toggle
            title.onclick = () => {
                content.style.display = content.style.display === "none" ? "block" : "none";
            };

            card.appendChild(title);
            card.appendChild(content);
            resultsDiv.appendChild(card);
        });
    }

    if (currentTab === "code") {
        const modules = [
            { name: "Github", key: "gitgub", action: "github()", noOutput: true },
            { name: "GitLab", key: "gitLab", action: "gitLab()", noOutput: true }
        ];

        modules.forEach(mod => {

            const card = document.createElement("div");
            card.className = "card";

            const title = document.createElement("h3");
            title.className = "category";
            title.innerText = mod.name;
            title.style.cursor = "pointer";

            const content = document.createElement("div");
            content.style.display = "none";

            // 🔥 mantener contenido previo
            if (mod.noOutput) {
                content.innerHTML = `
                                <button onclick="${mod.action}">Search</button>
                            `;
            } else {
                content.innerHTML = `
                                <button onclick="${mod.action}">Ejecutar</button>
                                <button onclick="copyResult('${mod.key}Result')">Copiar</button>
                                <div id="${mod.key}Result">${osintState[mod.key] || ""}</div>
                            `;
            }

            // toggle
            title.onclick = () => {
                content.style.display = content.style.display === "none" ? "block" : "none";
            };

            card.appendChild(title);
            card.appendChild(content);
            resultsDiv.appendChild(card);
        });
    }


}

function search(dork) {
    if (!dork) return;
    window.open("https://www.google.com/search?q=" + encodeURIComponent(dork), "_blank");
}

function copy(text) {
    navigator.clipboard.writeText(text)
        .then(() => showToast("✅ Copy"))
        .catch(() => showToast("❌ Error"));
}

function showToast(msg) {
    const toast = document.getElementById("toast");

    toast.innerText = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
    }, 1500);
}

function copyResult(id) {
    const text = document.getElementById(id).innerText;

    if (!text) {
        showToast("⚠️ Nothing to copy");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => showToast("✅ Copy"))
        .catch(() => showToast("❌ Error"));
}

function saveState() {
    localStorage.setItem("osintState", JSON.stringify(osintState));
}

function loadState() {
    const data = localStorage.getItem("osintState");
    if (data) {
        osintState = JSON.parse(data);
    }
}

function clearOSINT() {
    localStorage.removeItem("osintState");
    osintState = { crt: "", dns: "", ip: "", whois: "" };
    render();
}

function clearAll() {
    // Limpiar inputs
    document.getElementById("domain").value = "";
    document.getElementById("filter").value = "";

    // Limpiar resultados
    resultsDiv.innerHTML = "";

    // Restablecer la pestaña activa a "Dorks"
    currentTab = "dorks";
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelector(".tab[onclick*='dorks']").classList.add("active");

    // Limpiar estado de OSINT
    clearOSINT();

    // Mostrar mensaje de confirmación
    showToast("✅ Everything cleared!");
}

window.showTab = showTab;
window.render = render;
window.search = search;
window.copy = copy;
window.showToast = showToast;
window.copyResult = copyResult;
window.saveState = saveState;
window.loadState = loadState;
window.clearOSINT = clearOSINT;
window.clearAll = clearAll;