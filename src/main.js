import { supabase } from './supabase.js'
 
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-menu').classList.toggle('open')
})
 
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault()
 
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const messaggio = document.getElementById('messaggio').value
 
  const { data, error } = await supabase
    .from('Contacts')
    .insert([{ nome, email, messaggio }])
  
 
  if (error) {
    alert('Errore nell\'invio. Riprova.')
    console.error(error)
  } else {
    document.getElementById('contact-form').reset()
    document.getElementById('form-success').style.display = 'block'
    setTimeout(() => {
      document.getElementById('form-success').style.display = 'none'
    }, 4000)
  }
})
