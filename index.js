const mainHTML= document.querySelector('main'); //Select base main//
let subSectionCol = document.createElement('div');



function clearMain() {

  mainHTML.innerHTML = "";
  CreateMenu();

    };
function createLink(data, callback){
    subSectionCol.innerHTML='';
    let a = document.createElement('a');
    const link = document.createTextNode(data);
    a.appendChild(link);
    a.classList.add('pikaTextMenu');
    a.setAttribute('href', '#');
    a.addEventListener("click", function (event) {
         event.preventDefault(); // avoid entering the link //
        callback();

    });
    
    return a ;

    };
async function calldata(url){
  
  let response = await fetch(url);

  return response.json() ;

    };
async function pikaSection(data){

      subSectionCol.innerHTML="";

      console.log(data);
      subSectionCol.className='col col-10'
      subSectionCol.style="text-align: center";

      const  pikaSectionTittle=document.createElement('div')
      pikaSectionTittle.className=("row pikaWelcomeTittle");
      pikaSectionTittle.innerHTML=data.name;

      subSectionCol.appendChild(pikaSectionTittle);
      
      const pikaImage = document.createElement('div');
      pikaImage.className="row pikaImage";


    let poke = await calldata(data.url);

    if(poke.region){

      pikaImage.innerHTML="<img src='./assets/img/locations/"+poke.id+".png'>"
      subSectionCol.appendChild(pikaImage);
  
    }else if(poke.firmness){
      
      let berry = await calldata(poke.item.url)

      const berrySprite = "<img src='"+berry.sprites.default+"'>";

      const pokeSprites = document.createElement('div');
      pokeSprites.className="row pikaImage";
      pokeSprites.innerHTML=berrySprite;
      subSectionCol.appendChild(pokeSprites);
        
       
    }else {
      let imgId=(poke.id.toString().padStart(3, 0)); // Crea un numero de Id de 3 digitos //
      pikaImage.innerHTML="<img src='./assets/img/"+imgId+".png'>"
      subSectionCol.appendChild(pikaImage);

      let pokedexurl = "https://pokeapi.co/api/v2/pokemon-species/"+poke.id+"/";

      let pokedex = await calldata(pokedexurl);
      let p$$= document.createElement('p');
  
      p$$.innerHTML= pokedex.flavor_text_entries[0].flavor_text.replace(/(?:\r\n|\r|\n)/g, ' ');
      p$$.className="pikaTextMenu"
      subSectionCol.appendChild(p$$);

      console.log(pokedex.flavor_text_entries[0].flavor_text);


      let sprites =' ';
      for (const key in poke.sprites) {  
        if (poke.sprites[key] && typeof poke.sprites[key] === 'string') {
           sprites += "<img src='"+poke.sprites[key]+"'>"
        }   
      };

      const pokeSprites = document.createElement('div');
      pokeSprites.className="row pikaImage";
      pokeSprites.innerHTML=sprites;
      subSectionCol.appendChild(pokeSprites);
    //  let prevBoton = nextB(poke.id ,0);
     // let nextBoton = nextB(poke.id,1);
    }


    };
async function carga (url, text){

  const NewUl = document.createElement("ul");

  let myJson = await calldata(url);

  for (let i = 0; i < myJson.results.length; i++) {
     
    let NewLi = document.createElement('li');
    let NewA = createLink( myJson.results[i].name, function(){
        pikaSection(myJson.results[i])
    });
    NewLi.appendChild(NewA);
    NewUl.appendChild(NewLi);
  };

  createSection(NewUl, text);
    
    }; 
function armarFila(){

  let menuRow = document.createElement('div');
  menuRow.className='row';

  let menuColumnIco = document.createElement('div');
  const HomeButton = document.createElement('img');
  HomeButton.src ="./assets/img/pikaw.png";
  menuColumnIco.appendChild(HomeButton);
  menuColumnIco.className="col";
  menuRow.appendChild(menuColumnIco);

return menuRow;
    };
function armarFila2(categories){

    let menuRow = document.createElement('div');
    menuRow.className='row';

    let menuHome = document.createElement('div');
    
    menuHome.className="col pikaTextMenu";
    let aHome= document.createElement('a');
    const aText=document.createTextNode('HOME');
    aHome.classList.add('pikaTextMenu');
    aHome.setAttribute('href', '#');
   aHome.addEventListener("click",  function(){
    createSection();
});

    aHome.appendChild(aText);

    menuHome.appendChild(aHome);
    menuRow.appendChild(menuHome);

  for (const key in categories) {
       let enlace = createLink (
         categories[key].text,
          function(){
              carga(categories[key].url, categories[key].text);
          }
      );

    let menuColumn = document.createElement('div');
    menuColumn.className='col pikaTextMenu';
    menuColumn.appendChild(enlace);
    menuRow.appendChild(menuColumn);
    
  };

  return menuRow;
    };
function CreateMenu(){

    ///MENU ELEMENTS DECLARATION//
    const MenuItems = {
        categories: 
    [
          {
            text: "POKEDEX",
            url: "https://pokeapi.co/api/v2/pokemon/",
          },
          {
            text: "LOCATIONS",
            url: "https://pokeapi.co/api/v2/location",
          },
          {
            text:"BERRIES",
            url: "https://pokeapi.co/api/v2/berry/",
          }
    ]
    }



    let menuContainer = document.createElement('div'); //Create a Menu container
    menuContainer.className='container pikaHeader'; 

    menuRow = armarFila();
    menuRow2 = armarFila2(MenuItems.categories);
    menuContainer.appendChild(menuRow);
    menuContainer.appendChild(menuRow2);
    mainHTML.appendChild(menuContainer);

    };
function createSection(section, tittle){
      if (section==undefined){
        clearMain();
      let ContentContainer = document.createElement('div'); 
      ContentContainer.className= "container pikaContent";
      const contentRow= document.createElement('div');
      contentRow.className="row";
      const contentCol1= document.createElement('div');
      contentCol1.className="col col-12 pikaWelcomeTittle"
      contentCol1.innerHTML='Welcome to the Pika-Dex!';

      contentRow.appendChild(contentCol1);
      
      const welcomeImage = document.createElement('img');
      welcomeImage.src ="./assets/img/welcome.png";
      const contentCol2= document.createElement('div');
      contentCol2.className="col col-12 pikaImage"
      contentCol2.appendChild(welcomeImage);
      contentRow.appendChild(contentCol2);
      ContentContainer.appendChild(contentRow);
      mainHTML.appendChild(ContentContainer);
      }else{
        clearMain();
   

      let ContentContainer = document.createElement('div'); 
      ContentContainer.className= "container pikaContent";
      const contentRow= document.createElement('div');
      contentRow.className="row";
      const contentCol1= document.createElement('div');
      contentCol1.className="col col-12 pikaTittle"
      contentCol1.innerHTML=tittle;

      contentRow.appendChild(contentCol1);
    
      const contentCol2= document.createElement('div');
      contentCol2.className="col col-2 pikaList "

      contentCol2.appendChild(section);
      contentRow.appendChild(contentCol2);

      contentRow.appendChild(subSectionCol);
      ContentContainer.appendChild(contentRow);
      mainHTML.appendChild(ContentContainer);

      }
     
    };

window.onload   = function (){
 CreateMenu();
 createSection();

};
