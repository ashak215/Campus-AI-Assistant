const campusDetails = {
  departments: {
    title: "Academic Departments",
    image: "assets/images/departments.jpg",
    description: "Explore the academic departments available on campus and learn about their programs, teaching spaces and student opportunities.",
    information: ["Computer Science", "Data Science", "Commerce", "Management", "Other departments"],
    facilities: ["Department classrooms", "Faculty offices", "Seminar rooms", "Research and project spaces"]
  },
  faculty: {
    title: "Our Faculty",
    image: "assets/images/faculty.jpg",
    description: "Experienced faculty members guide students through coursework, research, projects and career development.",
    information: ["Experienced teaching staff", "Academic mentoring", "Research guidance", "Career support"],
    facilities: ["Faculty offices", "Consultation hours", "Seminar rooms", "Research spaces"]
  },
  library: {
    title: "College Library",
    image: "assets/images/library.jpg",
    description: "Our college library provides access to textbooks, reference materials, journals, digital resources and quiet study areas.",
    information: ["Opening Hours: 8:00 AM – 7:00 PM", "Digital Resources", "Reference Section", "Reading Hall", "Computer Access"],
    facilities: ["Quiet study areas", "Reading hall", "Computer access", "Digital resource collection"]
  },
  laboratories: {
    title: "Modern Laboratories",
    image: "assets/images/laboratories.jpg",
    description: "Our laboratories provide practical learning environments for programming, data science, artificial intelligence and other technical subjects.",
    information: ["Computer Lab", "AI & ML Lab", "Networking Lab", "Project Lab"],
    facilities: ["Workstations", "Development tools", "Networking equipment", "Collaborative project area"]
  },
  auditorium: {
    title: "Campus Auditorium",
    image: "assets/images/auditorium.jpg",
    description: "The campus auditorium hosts seminars, guest lectures, cultural events and major academic programs.",
    information: ["Guest lectures", "Seminars and conferences", "Cultural programs", "College-wide events"],
    facilities: ["Stage and seating", "Presentation equipment", "Audio system", "Event support"]
  },
  clubs: {
    title: "Student Clubs",
    image: "assets/images/clubs.jpg",
    description: "Student clubs create opportunities to build friendships, develop leadership and explore interests beyond the classroom.",
    information: ["Technology and innovation", "Arts and culture", "Entrepreneurship", "Community initiatives"],
    facilities: ["Club meeting spaces", "Event areas", "Project collaboration spaces", "Student activity support"]
  },
  sports: {
    title: "Sports Facilities",
    image: "assets/images/sports.jpg",
    description: "The campus provides facilities for indoor and outdoor sports and encourages students to participate in physical activities.",
    information: ["Cricket", "Football", "Volleyball", "Basketball", "Indoor Games"],
    facilities: ["Outdoor play areas", "Indoor activity spaces", "Practice areas", "Student recreation"]
  },
  facilities: {
    title: "Campus Facilities",
    image: "assets/images/facilities.jpg",
    description: "Campus infrastructure and student services support a comfortable, accessible and connected learning experience.",
    information: ["Smart classrooms", "Campus connectivity", "Student study spaces", "Accessible campus services"],
    facilities: ["Wi-Fi zones", "Study lounges", "Shared workspaces", "Student service areas"]
  }
};

window.openCampusDetails = function (topic) {
  const detail = campusDetails[topic];
  const modal = document.getElementById("campusDetailModal");
  const image = document.getElementById("campusDetailImage");
  const title = document.getElementById("campusDetailTitle");
  const description = document.getElementById("campusDetailText");
  const information = document.getElementById("campusDetailInformation");
  const facilities = document.getElementById("campusDetailFacilities");

  if (!detail || !modal || !image || !title || !description || !information || !facilities) return;

  image.src = detail.image;
  image.alt = detail.title;
  image.closest(".image-frame")?.classList.remove("image-failed");
  title.textContent = detail.title;
  description.textContent = detail.description;
  information.replaceChildren(...detail.information.map(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    return listItem;
  }));
  facilities.replaceChildren(...detail.facilities.map(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    return listItem;
  }));

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
};

document.addEventListener("DOMContentLoaded", function () {
  const rootBody = document.body;
  const savedTheme = localStorage.getItem("campus-ai-theme") || "light";
  const savedAnimations = localStorage.getItem("campus-ai-animations") !== "false";

  function applyTheme(theme) {
    rootBody.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("campus-ai-theme", theme);
  }

  applyTheme(savedTheme);
  rootBody.classList.toggle("reduce-animations", !savedAnimations);

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("show");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === currentPage);
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const behavior = rootBody.classList.contains("reduce-animations") ? "auto" : "smooth";
      target.scrollIntoView({ behavior, block: "start" });
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  let revealObserver = null;
  function revealInViewport() {
    revealItems.forEach(function (item) {
      if (item.classList.contains("visible")) return;
      const bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        item.classList.add("visible");
        if (revealObserver) revealObserver.unobserve(item);
      }
    });
  }

  if (revealItems.length > 0 && "IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
    revealInViewport();
    window.addEventListener("scroll", revealInViewport, { passive: true });
    window.addEventListener("resize", revealInViewport);
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  document.querySelectorAll("img[data-image-fallback]").forEach(function (image) {
    image.addEventListener("error", function () {
      image.closest(".image-frame")?.classList.add("image-failed");
    });
    if (image.complete && image.naturalWidth === 0) {
      image.closest(".image-frame")?.classList.add("image-failed");
    }
  });

  const detailModal = document.getElementById("campusDetailModal");
  const closeModalButton = document.querySelector(".modal-close");
  const backButton = document.querySelector(".modal-back");

  document.querySelectorAll("[data-campus-detail]").forEach(function (button) {
    button.addEventListener("click", function () {
      window.openCampusDetails(button.dataset.campusDetail);
    });
  });

  function closeCampusDetails() {
    if (detailModal) {
      detailModal.classList.remove("active");
      detailModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeCampusDetails);
  }

  if (backButton) {
    backButton.addEventListener("click", closeCampusDetails);
  }

  if (detailModal) {
    detailModal.addEventListener("click", function (event) {
      if (event.target === detailModal) {
        closeCampusDetails();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && detailModal.classList.contains("active")) {
        closeCampusDetails();
      }
    });
  }
});
