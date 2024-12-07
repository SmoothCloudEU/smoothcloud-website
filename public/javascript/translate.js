async function readLanguageFile(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function changeLanguage(language) {
  const currentLanguage = document.getElementById("current-language");
  const pageTitle = document.getElementById("pageTitle");
  const wartungsText = document.getElementById("wartungsText");
  const readLanguage = await readLanguageFile(`/public/lang/${language}.json`);
  if (readLanguage) {
    currentLanguage.src = `/public/image/icon/${readLanguage.imageName}.png`;
    pageTitle.textContent = readLanguage.pageTitle;
    wartungsText.textContent = readLanguage.maintenanceText;
  } else {
    console.warn("Sprachdatei konnte nicht geladen werden.");
  }
}
