import Modal from './modal.js';


const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button')

// Pegar quando o marcar como lido for clicado
const checkButtons = document.querySelectorAll("a.check"); // pega todos os botões com a classe check

checkButtons.forEach( button => {
  // adicionar a escuta
  button.addEventListener('click', handleClick)
});

const deleteButton = document.querySelectorAll(".actions a.delete");

deleteButton.forEach(button => {
  button.addEventListener('click', (event) => handleClick(event, false))
})

function handleClick(event, check = true){
  event.preventDefault()
  const text = check ? 'Marcar como lida' : 'Excluir';
  const slug = check ? "check" : "delete";
  const roomId = document.querySelector("#room-id").dataset.id;
  const questionId = event.target.dataset.id;

  const form = document.querySelector(".modal form");
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

  modalTitle.innerHTML = `${text} esta pergunta`;
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta?`;
  modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}`;
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  modal.open()
}

let copyRoom = document.querySelector(".copyRoom");


copyRoom.addEventListener('click', copy);

function copy(){
  let copyText = copyRoom.textContent;
  let textArea = document.createElement('textarea');
  textArea.value = copyText;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}