
document.querySelector('.busca').addEventListener('submit', async (e)=>{

    e.preventDefault();
    let input = document.querySelector('#searchInput').value;
    if(input !== ''){
    clearInfo();
    Warning('Carregando...');
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
    ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`);
    let json = await result.json();
    
    if(json.cod === 200 ){
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg,
            weather: json.weather[0].description
        });
    }
    else{
        clearInfo();
        modalWarning();
       
    }
}else{
    clearInfo();
    modalWarning();
}



})


function showInfo(obj){
    
    Warning('');
    document.querySelector('.init-text').style.display = 'none'
    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    document.querySelector('.tempInfo').innerHTML = `${obj.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed}<span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png` )
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;
    document.querySelector('.weathersit legend').innerHTML = obj.weather;
    document.querySelector('.resultado').style.display = 'block'
    
}

function clearInfo(){
    Warning('');
    let input = document.querySelector('#searchInput').value;
    input.innerHTML = "";
    document.querySelector('.resultado').style.display = 'none';
    document.querySelector('.init-text').style.display = 'block'
}

function Warning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function modalWarning(){
    let modal = document.querySelector('.modalWarning');
    modal.style.display = 'flex';
    setTimeout(()=>{
        modal.style.top = '50%'
    },200)
}


document.querySelector('.closeModal').addEventListener('click',()=>{
    let modal = document.querySelector('.modalWarning');
    modal.style.top = '-50%'
    setTimeout(()=>{
        modal.style.display = 'flex'
       
    },200)
});
document.querySelector('.clear').addEventListener('click',(e)=>{
    e.preventDefault();
    
});






