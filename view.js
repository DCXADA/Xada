const binId = "68cf021cae596e708ff54997"; // jouw Bin ID
const apiKey = "$2a$10$v.sw5rPiy9AphrgXeNCgoe4k6fXEEIk7b.wqdc8uVD0y2/aArBpSe";   // **NIET openbaar zetten**
const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

async function updateViewCounter() {
  try {
    // Huidige view ophalen
    let response = await fetch(apiUrl, {
      headers: {
        "X-Master-Key": apiKey
      }
    });
    if (!response.ok) throw new Error("Kan views niet ophalen");

    let data = await response.json();
    let currentCount = data.record.views || 0;

    // Teller verhogen
    currentCount++;

    // Update bin met nieuwe waarde
    await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey
      },
      body: JSON.stringify({ views: currentCount })
    });

    // Toon op de pagina
    document.getElementById("view-count").textContent = currentCount;

  } catch (error) {
    console.error("Fout bij updaten view counter:", error);
    document.getElementById("view-count").textContent = "Error!";
  }
}

// Voer direct uit als pagina laadt
updateViewCounter();
