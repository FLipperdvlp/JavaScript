// Task 1
function f1() {
  try {
    const checkbox = document.getElementById("i-1");
    const output = document.getElementById("out-1");

    if (!checkbox || !output) throw new Error("Елементи не знайдено");

    output.textContent = checkbox.checked;
  } catch (error) {
    console.error("Помилка у функції f1:", error.message);
    document.getElementById("out-1").textContent = "Сталася помилка";
  }
}
document.getElementById("b-1")?.addEventListener("click", f1);

// Task 2
function f2() {
  const checkbox = document.getElementById("i-2");
  const output = document.getElementById("out-2");

  output.textContent = checkbox.checked ? checkbox.value : false;
}
document.getElementById("b-2")?.addEventListener("click", f2);

// Task 3
function f3() {
  const input = document.getElementById("i-3");
  const out1 = document.getElementById("out-31");
  const out2 = document.getElementById("out-32");

  out1.textContent = input.value;
  out2.textContent = input.value.length >= 6 ? 1 : 0;
}
document.getElementById("b-3")?.addEventListener("click", f3);

// Task 4
function f4() {
  const radios = document.querySelectorAll('input[name="r-4"]');
  const output = document.getElementById("out-4");

  radios.forEach(radio => {
    if (radio.checked) output.textContent = radio.value;
  });
}
document.getElementById("b-4")?.addEventListener("click", f4);

// Task 5
function f5() {
  const color1 = document.getElementById("i-51");
  const color2 = document.getElementById("i-52");

  color2.value = color1.value;
}
document.getElementById("b-5")?.addEventListener("click", f5);

// Task 6
function f6() {
  const dateInput = document.getElementById("i-6");
  const output = document.getElementById("out-6");

  output.textContent = dateInput.value;
}
document.getElementById("b-6")?.addEventListener("click", f6);

// Task 7
function f7() {
  const range = document.getElementById("i-7");
  const output = document.getElementById("out-7");

  output.textContent = range.value;
}
document.getElementById("i-7")?.addEventListener("input", f7);

// Task 8
function f8() {
  const input = document.getElementById("i-8");
  const textarea = document.getElementById("t-8");
  const output = document.getElementById("out-8");

  textarea.value = input.value;
  output.textContent = input.value;
}
document.getElementById("b-8")?.addEventListener("click", f8);

// Task 9
function f9() {
  const select = document.getElementById("s-9");
  const output = document.getElementById("out-9");

  output.textContent = select.value;
}
document.getElementById("s-9")?.addEventListener("change", f9);

// Task 10
function f10() {
  const form = document.forms["form-10"];
  const output = document.getElementById("out-10");

  let result = "";
  for (let el of form.elements) {
    if (el.name && el.type !== "submit") {
      result += `${el.name}: ${el.value}\n`;
    }
  }

  output.textContent = result;
}
document.getElementById("b-10")?.addEventListener("click", f10);
