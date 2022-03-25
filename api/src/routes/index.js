const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog,Temperament } = require('../db');
const { API_KEY } = process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el=>{       
        return{
            name: el.name,
            id: el.id,
            image: el.image.url,
            temperament: el.temperament,
            weight: el.weight.metric,
            height: el.height.metric,
            life_span: el.life_span,
            
        }
        
    })
    return apiInfo
};
/*const getApiInfo = ()=>{
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then( res=>{
     const api = res.data.map(el=>{
         console.log(api)
         return{
            name: el.name,
            id: el.id,
            image: el.image.url,
            temperament: el.temperament,
            weight: el.weight.metric,
            height: el.height.metric,
            life_span: el.life_span,
         }
     })
    return api
     
    })
}*/


const getDbInfo = async () =>{
    return await Dog.findAll({
        includes:{
            model:Temperament,
            attribute:['name'],
            through:{
                attribute:[],
            }

        }
    })
}
const Alldogs =async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoDog = apiInfo.concat(dbInfo)
    return infoDog
}
router.get('/dogs',async(req,res)=>{
    const name = req.query.name;
    const dogsTotal = await Alldogs();
    if(name){
        const dogi = await dogsTotal.filter(el=>el.name.toLowerCase().includes(name.toLocaleLowerCase()));
        dogi.length ? res.status(200).send(dogi) : res.status(404).send('no se encontro ese dogi');
        
    }else {
        res.status(200).send(dogsTotal)
    }
});

router.get('/temperament',async(req,res)=>{
let ApiTemperament = await axios.get( `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
let temperaments = ApiTemperament.data.map(el=>el.temperament)
temperaments = temperaments.join().split(",");

temperaments.forEach((e)=>{
    Temperament.findOrCreate({
        where:{name:e}
    })
})
    const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);

});

router.post('/dog', async (req,res) => { 
    let {name, weight,height, temperament, life_span, image, createdInDb}= req.body
    // Creo la nueva raza en la BD
    let createdDog = await Dog.create ({
        name,
        weight,
        height,
        life_span,
        image,
        createdInDb
    })
    // El temperamento lo saco de la base de datos cargada previamente con la info de la API
       let temperamentDb = await Temperament.findAll ({
        where: {
            name:temperament } 
        })
        // Agrega el temperamento a la raza creada
        createdDog.addTemperament(temperamentDb)
        res.send (createdDog)
            });


            router.get ('/dogs/:id', async (req, res) => {
                const id = req.params.id;
                const dogTotal = await Alldogs()
                if (id) {
                    let dogId = dogTotal.filter( el => el.id == id)     
                    dogId.length?
                    res.status(200).json(dogId) :
                    res.status(404).send('Dog not found')
                }
            })






module.exports = router;
