// ========================================
// AURI ROLEPLAY - SCRIPT.JS
// ========================================


// ========================================
// CEK HASIL LOGIN DISCORD
// ========================================

const params = new URLSearchParams(window.location.search);

const login = params.get("login");
const username = params.get("username");
const jabatan = params.get("jabatan");
const akses = params.get("akses");

if (login === "success" && username && jabatan) {

    // Simpan data login
    localStorage.setItem("discord_username", username);
    localStorage.setItem("discord_jabatan", jabatan);
    localStorage.setItem("discord_akses", akses || "personel");

    // Hapus parameter login dari URL
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );

    console.log("Login Discord berhasil:", username, jabatan);
}


// ========================================
// TAMPILKAN DATA AKUN DISCORD
// ========================================

const savedUsername =
    localStorage.getItem("discord_username");

const savedJabatan =
    localStorage.getItem("discord_jabatan");

const savedAkses =
    localStorage.getItem("discord_akses");

if (savedUsername && savedJabatan) {

    const header = document.querySelector("header");

    if (header) {

        const akun = document.createElement("div");

        akun.style.marginTop = "15px";
        akun.style.padding = "12px";
        akun.style.borderRadius = "10px";
        akun.style.background = "rgba(255,255,255,0.1)";
        akun.style.display = "inline-block";

        akun.innerHTML =
            "<strong>✓ Login Discord</strong><br>" +
            "Username: " + savedUsername + "<br>" +
            "Jabatan: " + savedJabatan;

        header.appendChild(akun);
    }
}


// ========================================
// FORM REKRUTMEN
// ========================================

const form = document.getElementById("form-rekrutmen");

if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Pendaftaran berhasil dikirim!\n\n" +
            "Kamu akan diarahkan ke Discord AURI."
        );

        window.location.href =
            "https://discord.gg/cUJjBdkvV";

    });

}


// ========================================
// SALIN FORMAT ON DUTY
// ========================================

function salinFormat() {

    const format =
        "Izin, saya siap untuk Secatam, Komandan.";

    navigator.clipboard.writeText(format)
        .then(function() {

            const status =
                document.getElementById("status-salin");

            if (status) {

                status.textContent =
                    "Format berhasil disalin!";

            }

        })
        .catch(function() {

            alert(
                "Format ON DUTY:\n\n" +
                format
            );

        });

}


// ========================================
// TOMBOL GABUNG DISCORD
// ========================================

const tombolDiscord =
    document.querySelector(".btn-discord");

if (tombolDiscord) {

    tombolDiscord.addEventListener("click", function() {

        console.log(
            "Pengguna membuka Discord AURI."
        );

    });

}


// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(function(link) {

    link.addEventListener("click", function(event) {

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ========================================
// PESAN DI CONSOLE
// ========================================

console.log(
    "AURI Roleplay Website berhasil dimuat."
);
