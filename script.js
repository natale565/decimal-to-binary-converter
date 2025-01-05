const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// Function to create animation data dynamically and return the binary result
const createAnimationData = (input) => {
  const steps = [];
  let current = input;
  let binaryResult = ""; // Accumulates the binary result

  if (input === 0) {
    // Handle the special case where input is 0
    steps.push({
      inputVal: 0,
      msg: 'decimalToBinary(0) returns "0" (base case).',
    });
    binaryResult = "0";
  } else {
    while (current > 0) {
      const remainder = current % 2;
      binaryResult = remainder + binaryResult; // Build the binary string from the least significant bit
      steps.push({
        inputVal: current,
        msg: `decimalToBinary(${current}) returns "${Math.floor(
          current / 2
        )}" + ${remainder} (${current} % 2). Binary so far: ${binaryResult}`,
      });
      current = Math.floor(current / 2);
    }
  }

  return { steps: steps.reverse(), binaryResult };
};

// Function to show the animation
const showAnimation = (steps, binaryResult) => {
  result.innerText = "Call Stack Animation";

  steps.forEach((obj, index) => {
    const addElDelay = index * 2000;
    const showMsgDelay = addElDelay + 1000;
    const removeElDelay = showMsgDelay + 2000;

    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="step-${index}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, addElDelay);

    setTimeout(() => {
      document.getElementById(`step-${index}`).textContent = obj.msg;
    }, showMsgDelay);

    setTimeout(() => {
      document.getElementById(`step-${index}`).remove();
    }, removeElDelay);
  });

  setTimeout(() => {
    result.textContent = `Binary: ${binaryResult}`;
  }, steps.length * 2000);
};

// Function to check user input
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  animationContainer.innerHTML = ""; // Clear any previous animations

  const { steps, binaryResult } = createAnimationData(inputInt);
  showAnimation(steps, binaryResult);

  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
