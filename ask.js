// Ask widget: single-turn Q&A against the bio-context proxy.
const API_URL = "http://127.0.0.1:8001/ask"; // ponytail: swap for the deployed endpoint at launch

const log = document.getElementById("ask-log");
const form = document.getElementById("ask-form");
const input = document.getElementById("ask-input");

function addLine(text, cls) {
  const p = document.createElement("p");
  p.className = cls;
  p.textContent = text;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
  return p;
}

async function ask(question) {
  addLine("> " + question, "ask-question");
  const pending = addLine("thinking…", "ask-pending");
  input.value = "";
  input.disabled = true;
  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await resp.json();
    pending.textContent = resp.ok ? data.answer : "Something went wrong — try again, or just email Tom.";
    pending.className = resp.ok ? "ask-answer" : "ask-error";
  } catch {
    pending.textContent = "The assistant is offline right now — email tderrick98@outlook.com instead.";
    pending.className = "ask-error";
  } finally {
    input.disabled = false;
    input.focus();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (q) ask(q);
});

document.querySelectorAll(".ask-suggestions .chip").forEach((btn) =>
  btn.addEventListener("click", () => ask(btn.textContent)),
);
