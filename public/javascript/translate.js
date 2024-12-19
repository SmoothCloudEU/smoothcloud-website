const languageSelect = document.getElementById("language-select");

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
  const currentLanguage = document.getElementById("current-language-icon");
  const readLanguage = await readLanguageFile(`/public/lang/${language}.json`);
  if (readLanguage) {
    window.localStorage.setItem("language", language);
    currentLanguage.src = `/public/image/icon/${readLanguage.imageName}.png`;
    return;
  }
  console.warn("Language-File can't be loaded");
}
