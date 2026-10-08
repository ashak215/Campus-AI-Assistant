document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll(".theme-option");
  const animationToggle = document.getElementById("animationsToggle");
  const notificationToggle = document.getElementById("notificationsToggle");

  function setTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("campus-ai-theme", theme);
    themeButtons.forEach(function (button) {
      button.classList.toggle("active", button.dataset.theme === theme);
    });
  }

  const savedTheme = localStorage.getItem("campus-ai-theme") || "light";
  setTheme(savedTheme);

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(button.dataset.theme || "light");
    });
  });

  if (animationToggle) {
    const savedAnimations = localStorage.getItem("campus-ai-animations") !== "false";
    animationToggle.checked = savedAnimations;
    document.body.classList.toggle("reduce-animations", !savedAnimations);

    animationToggle.addEventListener("change", function () {
      const enabled = animationToggle.checked;
      document.body.classList.toggle("reduce-animations", !enabled);
      localStorage.setItem("campus-ai-animations", String(enabled));
    });
  }

  if (notificationToggle) {
    notificationToggle.addEventListener("change", function () {
      localStorage.setItem("campus-ai-notifications", String(notificationToggle.checked));
    });
  }
});
