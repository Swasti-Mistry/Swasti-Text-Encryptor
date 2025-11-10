async function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function encodeText() {
    let message = document.getElementById("message").value;
    let key = document.getElementById("key").value;

    if (!message || !key) {
        alert("Enter message and key!");
        return;
    }

    let encoded = "";
    for (let i = 0; i < message.length; i++) {
        let m = message.charCodeAt(i);
        let k = key.charCodeAt(i % key.length);
        encoded += String.fromCharCode(m + k);
    }

    const hash = await sha256(key);
    document.getElementById("output").value = encoded + "::" + hash;
}

function downloadFile() {
    let text = document.getElementById("output").value;
    if (!text) {
        alert("Encode first!");
        return;
    }

    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "encoded.txt";
    link.click();
}

/* NAV */
function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("nav-active");
}
