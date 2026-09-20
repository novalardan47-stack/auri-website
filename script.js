// ========================================
// AURI ROLEPLAY - SCRIPT.JS
// ========================================


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