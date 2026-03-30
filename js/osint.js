async function crt() {
    const domain = document.getElementById("domain").value.trim();
    const output = document.getElementById("crtResult");

    // limpiar antes
    output.innerText = "";

    // 🔒 Validación: vacío
    if (!domain) {
        output.innerText = "⚠️ Enter a domain first.";
        return;
    }

    // 🔒 Validación: formato
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!domainRegex.test(domain)) {
        output.innerText = "❌ Invalid domain (e.g., example.com)";
        return;
    }

    try {
        output.innerText = "⏳ Searching for subdomains...";

        const res = await fetch(`https://crt.sh/?q=%25.${domain}&output=json`);
        const data = await res.json();

        if (!data || data.length === 0) {
            output.innerText = "⚠️ No subdomains were found.";
            return;
        }

        const subs = [...new Set(data.map(x => x.name_value))];
        osintState.crt = subs.join("\n");
        saveState();
        output.innerText = osintState.crt;
        document.getElementById("crtResult").innerText = osintState.crt;

    } catch (error) {
        output.innerText = "❌ Error retrieving crt.sh";
    }
}

async function dnsLookup() {
    const domain = document.getElementById("domain").value.trim();
    const output = document.getElementById("dnsResult");

    if (!domain) {
        output.innerText = "⚠️ Enter a domain";
        return;
    }

    output.innerText = "⏳ Checking...";

    try {
        const res = await fetch(`https://dns.google/resolve?name=${domain}`);
        const data = await res.json();

        if (!data.Answer) {
            output.innerText = "❌ There are no DNS records";
            return;
        }

        osintState.dns = data.Answer.map(a => a.data).join("\n");
        saveState();
        output.innerText = osintState.dns;

    } catch {
        output.innerText = "❌ Error in DNS";
    }
}


async function ipInfo() {
    const domain = document.getElementById("domain").value.trim();
    const output = document.getElementById("ipResult");

    if (!domain) {
        output.innerHTML = "⚠️ Enter a domain";
        return;
    }

    output.innerHTML = "⏳ Resolving the IP address...";

    try {
        const res = await fetch(`https://dns.google/resolve?name=${domain}`);
        const data = await res.json();

        const ip = data.Answer?.find(a => a.type === 1)?.data;

        if (!ip) {
            output.innerHTML = "❌ An IP address could not be obtained";
            return;
        }

        const info = await fetch(`https://ipwho.is/${ip}`);
        const ipData = await info.json();

        // 🔒 evitar undefined
        const country = ipData.country || "N/A";
        const city = ipData.city || "N/A";
        const isp = ipData.connection?.isp || "N/A";
        const org = ipData.connection?.org || "N/A";
        const asn = ipData.connection?.asn || "N/A";

        const isCloudflare = org.toLowerCase().includes("cloudflare");
        osintState.ip = `
                    🌐 Dominio: ${domain}
                    🧠 IP: ${ip}
                    🌍 País: ${country}
                    🏙️ Ciudad: ${city}
                    🏢 ISP: ${isp}
                    🏭 Organización: ${org}
                    🛰️ ASN: ${asn}
                    ${isCloudflare ? "⚠️ Protected by Cloudflare" : ""}
                    `;
        saveState();
        output.innerText = osintState.ip;
    } catch {
        output.innerHTML = "❌ Error retrieving IP information";
    }
}

async function whois() {
    const domain = document.getElementById("domain").value.trim();
    const output = document.getElementById("whoisResult");

    if (!domain) {
        output.innerText = "⚠️ Enter a domain";
        return;
    }

    output.innerText = "⏳ Checking WHOIS (RDAP)...";

    try {
        const res = await fetch(`https://rdap.org/domain/${domain}`);
        const data = await res.json();

        // 📅 fechas
        const created = data.events?.find(e => e.eventAction === "registration")?.eventDate || "N/A";
        const expires = data.events?.find(e => e.eventAction === "expiration")?.eventDate || "N/A";

        // 🏢 registrar
        const registrar = data.entities?.find(e => e.roles?.includes("registrar"));

        // 👤 posible organización / nombre
        let org = "N/A";
        let name = "N/A";

        if (registrar?.vcardArray) {
            const vcard = registrar.vcardArray[1];

            vcard.forEach(field => {
                if (field[0] === "fn") name = field[3];
                if (field[0] === "org") org = field[3];
            });
        }

        // 🌐 nameservers
        const ns = data.nameservers
            ?.map(n => `- ${n.ldhName}`)
            .join("\n") || "N/A";

        // 📊 estados
        const status = data.status?.join(", ") || "N/A";

        osintState.whois =
            "🌐 Dominio: " + data.ldhName + "\n\n" +
            "🏢 Registrar: " + name + "\n" +
            "🏭 Organización: " + org + "\n\n" +
            "📅 Creado: " + created + "\n" +
            "📅 Expira: " + expires + "\n\n" +
            "🧾 Estado: " + status + "\n\n" +
            "🌍 Nameservers:\n" +
            ns;

        saveState();

        output.innerText = osintState.whois;

    } catch (error) {
        output.innerText = "❌ Error retrieving RDAP";
    }
}

window.crt = crt;
window.dnsLookup = dnsLookup;
window.ipInfo = ipInfo;
window.whois = whois;