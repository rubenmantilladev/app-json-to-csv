const $jsonForm = document.querySelector("#jsonform");
const $csvForm = document.querySelector("#csvform");
const $bConvert = document.querySelector("#bConvert");

// Copy to clipboard
const $bCopy = document.querySelector("#bCopy");

$bConvert.addEventListener("click", () => {
  converJSONtoCSV();
});

function converJSONtoCSV() {
  let json;
  let keys = [];
  let values = [];

  try {
    json = JSON.parse($jsonForm.value);
  } catch (error) {
    console.log("Error Format ", error);
    return;
  }

  if (Array.isArray(json)) {
    // algoritmo
    json.forEach((item) => {
      const nkeys = Object.keys(item);

      if (keys.length === 0) {
        keys = [...nkeys];
      } else {
        if (nkeys.length !== keys.length) {
          throw new Error("Number of keys are different");
        } else {
          console.log("OK", nkeys);
        }
      }

      const row = keys.map((key) => {
        return item[key];
      });
      values.push([...row]);
    });
    console.log(keys, values);
    values.unshift(keys);
    const text = values.map((val) => val.join(",")).join("\n");
    $csvForm.value = text;
  } else {
    alert("This isn't array");
  }
}

$bCopy.addEventListener("click", async () => {
  await navigator.clipboard
    .writeText($csvForm.value)
    .then(() => {
      $bCopy.innerText = "Copied!";
      $bCopy.setAttribute("aria-busy", "true");
      setInterval(() => {
        $bCopy.innerText = "Copy";
        $bCopy.removeAttribute("aria-busy");
      }, 500);
    })
    .catch((err) => console.log("Error", err));
});
