export async function mintToken(address: string) {
  const res = await fetch("https://18.230.194.240:8000/mintToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });

  return await res.json();
}
