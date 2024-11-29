var translations = {
  'en': {
    imageName: "american",
    pageTitle: 'Welcome to SmoothCloud!',
    wartungsText: 'This Site is currently in maintenance. Please try again later!'
  },
  'de': {
    imageName: "german",
    pageTitle: 'Willkommen bei SmoothCloud!',
    wartungsText: 'Diese Seite steht gerade unter Wartungsarbeiten. Bitte versuche es später erneut!'
  },
  'fr': {
    imageName: "france",
    pageTitle: 'Bienvenue sur SmoothCloud!',
    wartungsText: 'Ce site est actuellement en maintenance. Veuillez réessayer plus tard !'
  },
  'es': {
    imageName: "spain",
    pageTitle: '¡Bienvenido a SmoothCloud!',
    wartungsText: 'Este sitio está actualmente en mantenimiento. Vuelva a intentarlo más tarde.'
  },
  'ru': {
    imageName: "russian",
    pageTitle: 'Добро пожаловать в SmoothCloud!',
    wartungsText: 'Этот сайт в настоящее время находится на обслуживании. Пожалуйста, повторите попытку позже!'
  }
};

function changeLanguage(language) {
  let currentLanguage = document.getElementById('current-language');
  let pageTitle = document.getElementById('pageTitle');
  let wartungsText = document.getElementById('wartungsText');

  if (translations[language] != null) {
    currentLanguage.src = "data/" + translations[language].imageName + ".png";
    pageTitle.textContent = translations[language].pageTitle;
    wartungsText.textContent = translations[language].wartungsText;
  }
}
