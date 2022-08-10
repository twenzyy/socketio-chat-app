const socket = io.connect('http://localhost:90')

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')
var form = document.getElementById('form');


form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (message.value && sender.value && socket.id) {
        socket.emit('chat', {
            message: message.value,
            sender: sender.value,
            from: socket.id
        })
      message.value = '';
    }
  });

message.addEventListener('keypress', () =>{
    socket.emit('typing', sender.value)
})

  socket.on('chat', function(data) {
      if(data.from != socket.id){
    output.innerHTML += `<p><strong> ${data.sender} : </strong> ${data.message} </p>`
      } else {
    output.innerHTML += `<p><strong> Me : </strong> ${data.message} </p>`
      }
    window.scrollTo(0, document.body.scrollHeight);
    feedback.innerHTML = "";
  });

socket.on('typing', data => {
    feedback.innerHTML = `<p> ${data} yazıyor...`
    setTimeout(() => {
        feedback.innerHTML = "";
    }, 6000);
})
