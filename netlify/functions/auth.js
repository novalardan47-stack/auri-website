export default async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Kode login Discord tidak ditemukan.", {
      status: 400
    });
  }

  const redirectUri =
    "https://auriofficiall.netlify.app/.netlify/functions/auth";

  const body = new URLSearchParams({
    client_id: process.env.DISCORDCLIENTID,
    client_secret: process.env.DISCORDCLIENTSECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri
  });

  const tokenResponse = await fetch(
    "https://discord.com/api/v10/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    }
  );

  if (!tokenResponse.ok) {
    return new Response("Login Discord gagal.", {
      status: 500
    });
  }

  const tokenData = await tokenResponse.json();

  const userResponse = await fetch(
    "https://discord.com/api/v10/users/@me",
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      }
    }
  );

  if (!userResponse.ok) {
    return new Response("Gagal mengambil data Discord.", {
      status: 500
    });
  }

  const user = await userResponse.json();

  return new Response(
    `Login berhasil sebagai ${user.username}.`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8"
      }
    }
  );
};
