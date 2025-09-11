const getElement= (selection)=>{
  const element= document.querySelector(selection);
  if (element) return element;
  throw new Error('no element selected');
}
const  URL = 'https://randomuser.me/api/';
const IMG= getElement('.user-img');
const title= getElement('.title');
const user= getElement('.user');
const btn= getElement('.btn');
const icons= [...document.querySelectorAll('.icon')];

const getUser = async()=>{
 const response = await fetch(URL)
 const data = await response.json();
 const person= data.results[0]
 const {phone, email}= person;
 const {large: image}= person.picture;
 const {password}=person.login;
 const {first, last}=person.name;
 const {age}=person.dob;
 const {street:{number, name}} = person.location;
  return{
    phone, 
    email, 
    password, 
    age, 
    image,
    street:`${number} ${name}`,
    name:`${first} ${last}`,
  };
};
const displayUser= (person)=>{
  IMG.src=person.image
  user.textContent=person.name
  title.textContent=`My name is`
  icons.forEach((icon) => icon.classList.remove('active'));
  icons[0].classList.add('active')

 icons.forEach((icon)=>{
   const label= icon.dataset.label
   icon.addEventListener('click', ()=>{
      title.textContent=`My ${label} is`;
      user.textContent= person[label];
      icons.forEach((icon) => icon.classList.remove('active'));
       icon.classList.add('active');
    });
  });
};
const showUser= async ()=>{
const person= await getUser();
displayUser(person);

}
window.addEventListener('DOMContentLoaded', showUser);
btn.addEventListener('click', showUser);