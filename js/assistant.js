document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");
  const quickQuestions = document.querySelectorAll(".quick-question");

  const responses = {
    library: "The library is located in Block A, Ground Floor. It is open from 8:00 AM to 7:00 PM.",
    exam: "Your next examination is scheduled for Monday. You can find the latest examination notices in Events & Announcements.",
    faculty: "You can explore faculty information in the Campus Information section, including academic departments and student support.",
    timetable: "The semester timetable is updated regularly and can be checked in the Campus Information section.",
    department: "The college offers Computer Science, Electronics, Mechanical, Civil, Business Administration, and Applied Sciences departments.",
    events: "College events, workshops, seminars, and hackathons are listed in the Events & Announcements section.",
    facilities: "Campus facilities include laboratories, library services, sports facilities, auditorium support, and smart classrooms.",
    fee: "Fee information is available through the admissions office and academic support desks on campus.",
    contact: "You can reach the college administration at +91 98765 43210 or visit the main administration office during working hours.",
    default: "I can help with library timings, examination details, departments, faculty, events, facilities, fee information, and general campus support."
  };

  function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message ${type}`;

    if (type === "ai") {
      const avatar = document.createElement("div");
      avatar.className = "message-avatar";
      avatar.innerHTML = '<i class="fa-solid fa-sparkles"></i>';
      message.appendChild(avatar);
    }

    const content = document.createElement("div");
    content.className = "message-content";

    const author = document.createElement("span");
    author.className = "message-author";
    author.textContent = type === "ai" ? "Campus AI" : "You";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    const time = document.createElement("time");
    time.textContent = "Just now";

    content.append(author, bubble, time);
    message.appendChild(content);
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function addTypingIndicator() {
    const wrapper = document.createElement("div");
    wrapper.className = "message ai";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.innerHTML = '<i class="fa-solid fa-sparkles"></i>';

    const content = document.createElement("div");
    content.className = "message-content";
    const author = document.createElement("span");
    author.className = "message-author";
    author.textContent = "Campus AI";

    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.innerHTML = "<span></span><span></span><span></span>";

    content.append(author, indicator);
    wrapper.append(avatar, content);
    chatWindow.appendChild(wrapper);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return wrapper;
  }

  function removeTypingIndicator(node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  function getResponse(question) {
    const q = question.toLowerCase();
    if (q.includes("library") || q.includes("timing") || q.includes("block a")) return responses.library;
    if (q.includes("timetable") || q.includes("schedule")) return responses.timetable;
    if (q.includes("exam") || q.includes("test") || q.includes("semester")) return responses.exam;
    if (q.includes("faculty") || q.includes("teacher") || q.includes("professor")) return responses.faculty;
    if (q.includes("department") || q.includes("branch")) return responses.department;
    if (q.includes("event") || q.includes("fest") || q.includes("hackathon")) return responses.events;
    if (q.includes("facility") || q.includes("campus")) return responses.facilities;
    if (q.includes("fee") || q.includes("fees") || q.includes("payment")) return responses.fee;
    if (q.includes("contact") || q.includes("call") || q.includes("phone")) return responses.contact;
    return responses.default;
  }

  function handleQuestion(question) {
    const trimmed = question.trim();
    if (!trimmed) return;

    addMessage(trimmed, "user");
    const typingNode = addTypingIndicator();

    setTimeout(function () {
      removeTypingIndicator(typingNode);
      addMessage(getResponse(trimmed), "ai");
    }, 750);
  }

  chatForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const question = chatInput.value;
    handleQuestion(question);
    chatInput.value = "";
    chatInput.focus();
  });

  quickQuestions.forEach(function (button) {
    button.addEventListener("click", function () {
      handleQuestion(button.dataset.question || button.textContent.trim());
    });
  });
});
