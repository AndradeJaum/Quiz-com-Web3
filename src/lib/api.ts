export async function mintToken(address: string) {
  const res = await fetch("https://api.joaovitorandrade.me/mintToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });

  return await res.json();
}
