const dorks = {
    "Recon": [
        "site:{domain}",
        "site:*.{domain} -www",
        "site:*.*.{domain}",
        "site:{domain} ext:php | ext:asp | ext:aspx | ext:jsp",
        "site:{domain} inurl:test | dev | staging",
        "site:{domain} inurl:beta"
    ],
    "Sensitive Files": [
        "site:{domain} filetype:sql",
        "site:{domain} filetype:log",
        "site:{domain} filetype:bak",
        "site:{domain} filetype:zip",
        "site:{domain} filetype:tar",
        "site:{domain} filetype:gz",
        "site:{domain} filetype:env",
        "site:{domain} filetype:env.local",
        "site:{domain} inurl:.env",
        "site:{domain} filetype:ini",
        "site:{domain} filetype:conf",
        "site:{domain} filetype:.conf",
        "site:{domain} filetype:.yaml",
        "site:{domain} filetype:.yml",
        "site:{domain} filetype:json",
        "site:{domain} filetype:.xml",
        "site:{domain} filetype:.properties",
        "site:{domain} filetype:.toml"
    ],
    "Documents": [
        "site:{domain} filetype:pdf",
        "site:{domain} filetype:xlsx",
        "site:{domain} filetype:docx",
        "site:{domain} filetype:csv",
        "site:{domain} filetype:xml",
        "site:{domain} filetype:txt"
    ],
    "Directory Listing": [
        "site:{domain} intitle:\"index of\"",
        "site:{domain} intitle:\"index of\" \"backup\"",
        "site:{domain} intitle:\"index of\" \"uploads\"",
        "site:{domain} intitle:\"index of\" \".git\"",
        "site:{domain} intitle:\"index of\" \"images\"",
        "site:{domain} intitle:\"index of\" \"config\""
    ],
    "Credentials": [
        "site:{domain} intext:\"password=\"",
        "site:{domain} intext:\"api_key\"",
        "site:{domain} intext:\"access_token\"",
        "site:{domain} intext:\"secret\"",
        "site:{domain} intext:\"AWS_SECRET\"",
        "site:{domain} intext:\"aws_access_key_id\"",
        "site:{domain} intext:\"aws_secret_access_key\"",
        "site:{domain} intext:\"db_password\""
    ],
    "Admin Panels": [
        "site:{domain} inurl:admin",
        "site:{domain} inurl:login",
        "site:{domain} inurl:dashboard",
        "site:{domain} intitle:\"admin panel\"",
        "site:{domain} inurl:cpanel"
    ],
    "Debug": [
        "site:{domain} inurl:debug",
        "site:{domain} intext:\"stack trace\"",
        "site:{domain} intext:\"error on line\"",
        "site:{domain} intext:\"exception\""
    ],
    "Parameters": [
        "site:{domain} inurl:\"?id=\"",
        "site:{domain} inurl:\"?page=\"",
        "site:{domain} inurl:\"?file=\"",
        "site:{domain} inurl:\"?url=\"",
        "site:{domain} inurl:\"?redirect=\"",
        "site:{domain} inurl:\"?next=\"",
        "site:{domain} inurl:\"user_id=\"",
        "site:{domain} inurl:\"account=\""
    ],
    "Databases": [
        "site:{domain} intitle:\"phpMyAdmin\"",
        "site:{domain} inurl:phpmyadmin",
        "site:{domain} intitle:\"Adminer\"",
        "site:{domain} inurl:adminer",
        "site:{domain} intext:\"sql syntax near\"",
        "site:{domain} intext:\"syntax error has occurred\"",
        "site:{domain} intext:\"incorrect syntax near\"",
        "site:{domain} intext:\"unexpected end of SQL command\"",
        "site:{domain} intext:\"Warning: mysql_connect()\"",
        "site:{domain} intext:\"Warning: mysql_query()\"",
        "site:{domain} intext:\"Warning: pg_connect()\"",
        "site:{domain} intext:\"ORA-01756\"",
        "site:{domain} intext:\"SQLSTATE\"",
        "site:{domain} filetype:sql",
        "site:{domain} filetype:bak \"sql\"",
        "site:{domain} filetype:dump",
        "site:{domain} filetype:backup",
        "site:{domain} filetype:db",
        "site:{domain} filetype:sqlite",
        "site:{domain} filetype:sqlite3",
        "site:{domain} intext:\"DB_PASSWORD\"",
        "site:{domain} intext:\"DB_HOST\"",
        "site:{domain} intext:\"DB_USERNAME\"",
        "site:{domain} intext:\"database connection\"",
        "site:{domain} intext:\"Laravel\" \"DB_\"",
        "site:{domain} intext:\"Spring.datasource.password\"",
        "site:{domain} intext:\"connectionString\""
    ],
    "Cloud": [
        "site:s3.amazonaws.com \"{domain}\"",
        "site:blob.core.windows.net \"{domain}\"",
        "site:storage.googleapis.com \"{domain}\""
    ],
    "Buckets": [
        "\"{domain}\" \"s3\"",
        "\"{domain}\" \"bucket\"",
        "\"{domain}\" \"aws\""
    ],
    "GitHub Leaks": [
        "site:github.com \"{domain}\" password",
        "site:github.com \"{domain}\" api_key",
        "site:github.com \"{domain}\" secret",
        "site:github.com \"{domain}\" .env"
    ],
    "JavaScript": [
        "site:{domain} filetype:js",
        "site:{domain} inurl:main.js",
        "site:{domain} inurl:app.js",
        "site:{domain} intext:\"api\" filetype:js"
    ],
    "Dev / Staging": [
        "site:{domain} inurl:dev",
        "site:{domain} inurl:staging",
        "site:{domain} inurl:qa",
        "site:{domain} inurl:test"
    ],
    "Install / Setup": [
        "site:{domain} inurl:readme",
        "site:{domain} inurl:license",
        "site:{domain} inurl:install",
        "site:{domain} inurl:setup",
        "site:{domain} inurl:config"
    ]
}

function getDorks() {
    return dorks;
}

window.getDorks = getDorks;