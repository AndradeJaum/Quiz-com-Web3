export default async function postWalletAddress(body) {
  await fetch("http://localhost:3000/wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
