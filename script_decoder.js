async function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function decodeText() {
    let encodedInput = document.getElementById("encoded").value;
    let key = document.getElementById("key").value;

    if (!encodedInput || !key) {
        alert("Enter encoded text + key");
        return;
    }

    let parts = encodedInput.split("::");
    let encodedText = parts[0];
    let storedHash = parts[1];

    const newHash = await sha256(key);

    if (newHash !== storedHash) {
        alert("❌ Incorrect Key! Decoding failed.");
        return;
    }

    let decoded = "";
    for (let i = 0; i < encodedText.length; i++) {
        let e = encodedText.charCodeAt(i);
        let k = key.charCodeAt(i % key.length);
        decoded += String.fromCharCode(e - k);
    }

    document.getElementById("output").value = decoded;
}

function downloadDecoded() {
    let text = document.getElementById("output").value;
    if (!text) {
        alert("Decode something first!");
        return;
    }
    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "decoded.txt";
    link.click();
}

/* NAV */
function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("nav-active");
}
