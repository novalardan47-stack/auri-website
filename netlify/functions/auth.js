exports.handler = async (event) => {
  try {
    const code = event.queryStringParameters?.code;

    if (!code) {
      return {
        statusCode: 400,
        body: "Code Discord tidak ditemukan."
      };
    }

    // =========================
    // DISCORD CONFIG
    // =========================
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

    const GUILD_ID = process.env.DISCORD_GUILD_ID;

    const ROLE_PANGLIMA = process.env.ROLE_PANGLIMA;
    const ROLE_WAPANG = process.env.ROLE_WAPANG;
    const ROLE_KSAU = process.env.ROLE_KSAU;
    const ROLE_WAKASAU = process.env.ROLE_WAKASAU;
    const ROLE_ADMIN = process.env.ROLE_ADMIN;

    const REDIRECT_URI =
      "https://auriofficiall.netlify.app/.netlify/functions/auth";

    // =========================
    // TUKAR CODE DISCORD
    // =========================
    const tokenResponse = await fetch(
      "https://discord.com/api/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URI
        })
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token Error:", tokenData);

      return {
        statusCode: 500,
        body: "Gagal login Discord."
      };
    }

    const accessToken = tokenData.access_token;

    // =========================
    // DATA USER
    // =========================
    const userResponse = await fetch(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const user = await userResponse.json();

    if (!userResponse.ok) {
      return {
        statusCode: 500,
        body: "Gagal mengambil data Discord."
      };
    }

    // =========================
    // CEK MEMBER + ROLE
    // =========================
    const memberResponse = await fetch(
      `https://discord.com/api/users/@me/guilds/${GUILD_ID}/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const member = await memberResponse.json();

    if (!memberResponse.ok) {
      console.error("Member Error:", member);

      return {
        statusCode: 403,
        body: "Kamu belum berada di server Discord."
      };
    }

    const roles = member.roles || [];

    // =========================
    // TENTUKAN JABATAN
    // =========================
    let jabatan = "Personel";
    let akses = "personel";

    if (roles.includes(ROLE_ADMIN)) {
      jabatan = "Admin";
      akses = "admin";
    } else if (roles.includes(ROLE_PANGLIMA)) {
      jabatan = "Panglima TNI";
      akses = "panglima";
    } else if (roles.includes(ROLE_WAPANG)) {
      jabatan = "Wakil Panglima TNI";
      akses = "wapang";
    } else if (roles.includes(ROLE_KSAU)) {
      jabatan = "KSAU";
      akses = "ksau";
    } else if (roles.includes(ROLE_WAKASAU)) {
      jabatan = "WAKASAU";
      akses = "wakasau";
    }

    // =========================
    // HASIL LOGIN
    // =========================
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        username: user.username,
        user_id: user.id,
        jabatan: jabatan,
        akses: akses
      })
    };

  } catch (error) {
    console.error("Auth Error:", error);

    return {
      statusCode: 500,
      body: "Terjadi kesalahan pada server."
    };
  }
};
