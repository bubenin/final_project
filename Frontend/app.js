let allPurchases = [];

let textValueInput = "";
let numberValueInput = 0;

window.onload = async () => {
  const textInput = document.getElementById("text-input");
  const numberInput = document.getElementById("number-input");
  textInput.addEventListener("change", updateValueText);
  numberInput.addEventListener("change", updateValueNumber);

  const resp = await fetch("http://localhost:8000/allPurchases", {
    method: "GET",
  });
  const result = await resp.json();
  allPurchases = result;
  render();
};
// записываем данные с input
const updateValueText = (e) => {
  textValueInput = e.target.value;
};

const updateValueNumber = (e) => {
  numberValueInput = e.target.value;
};

//кнопка добавить
const onClickButton = async () => {
  if (
    textValueInput !== "" &&
    numberValueInput !== 0 &&
    numberValueInput !== null
  ) {
    const resp = await fetch("http://localhost:8000/createPurchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textValueInput,
        price: numberValueInput,
      }),
    });
    const result = await resp.json();
    allPurchases = result;
    document.getElementById("text-input").value = ""
    document.getElementById("number-input").value = ""
    textValueInput = "";
    numberValueInput = 0;
    render();
  } else {
    alert("Одно или несколько полей не заполнено");
  }
};

const render = () => {
  let sum = 0;
  const content = document.getElementById("content-page");
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allPurchases.map((item, index) => {
    const container = document.createElement("div");
    container.id = "container";
    const purchase = document.createElement("div");
    purchase.id = "purchase";
    const summa = document.getElementById("summa");
    summa.innerHTML = `ИТОГО: ${(sum += +item.price)} р.`;
    const info = document.createElement("p");
    info.id = "purchase-text";
    info.innerHTML = `${index + 1}) ${item.text}`;
    const date = document.createElement("p");
    date.id = "purchase-text";
    date.innerHTML = `${item.date}`;
    const price = document.createElement("p");
    price.id = "purchase-text";
    price.innerHTML = `${item.price} р.`;
    //картинки справа

    //редактирование
    const imageEdit = document.createElement("img");
    imageEdit.id = "img";
    imageEdit.src = "./src/edit.svg";
    imageEdit.onclick = () => {
      imageEdit.style.display = "none";
      imageDelete.style.display = "none";
      const imageOk = document.createElement("img");
      imageOk.id = "img";
      imageOk.src = "./src/ok.svg";
      purchase.appendChild(imageOk);
      const correctText = document.createElement("input");
      correctText.id = "purchase-text";
      correctText.value = item.text;
      const correctPrice = document.createElement("input");
      correctPrice.type = "number";
      correctPrice.id = "purchase-text";
      correctPrice.value = item.price;

      purchase.replaceChild(correctText, info);
      purchase.replaceChild(correctPrice, price);

      //нажатие на галочку
      imageOk.onclick = () =>
        onClickEdit(item._id, correctText.value, correctPrice.value);
    };

    //удаление
    const imageDelete = document.createElement("img");
    imageDelete.id = "img";
    imageDelete.src = "./src/delete.svg";
    imageDelete.onclick = () => onClickDelete(item._id);

    //appendChild
    purchase.appendChild(info);
    purchase.appendChild(date);
    purchase.appendChild(price);
    purchase.appendChild(imageEdit);
    purchase.appendChild(imageDelete);
    container.appendChild(purchase);
    content.appendChild(container);
  });
};

//удаление
const onClickDelete = async (value) => {
  const resp = await fetch("http://localhost:8000/deletePurchases", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: value,
    }),
  });
  const result = await resp.json();
  allPurchases = result;
  render();
};

//редактирование
const onClickEdit = async (id, text, price) => {
  const resp = await fetch("http://localhost:8000/updatePurchases", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
      text: text,
      price: price,
    }),
  });
  const result = await resp.json();
  allPurchases = result;
  render();
};
