export default async function postWalletAddress(body) {
  await fetch("http:// 54.87.81.27:8000/wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
