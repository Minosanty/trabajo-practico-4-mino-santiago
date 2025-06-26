import Character from "../models/character.model.js";
export const crearPersonaje= async (req,res)=>{
   const{name,ki,race,gender,description }=req.body
   if(req.body){
    for(let valor in req.body){
        if(typeof req.body[valor] === "string"){
            req.body[valor] = req.body[valor].trim();
        }
     }
   }
    try {
        //validacion para que los datos no vengan vacios 
        if(name=== undefined)return res.status(400).json({message:"nombre no puede estar vacio"});
        if(ki === undefined)return res.status(400).json({message:"Ki no puede estar vacio"});
        if(race === undefined)return res.status(400).json({message:"Race no puede estar vacio"});
        if(gender === undefined)return res.status(400).json({message:"Gender no puede estar vacio"});

        const nombreUnico = await Character.findOne({where: {name}});
        if (nombreUnico !== null) return res.status(400).json({message: "nombre exitente"});

        const kiInt = Math.floor(ki);
        if (ki !== kiInt) return res.status(400).json({message: " Ki invalido"});

        if (gender!=="Male" && gender!=="Female") return res.status(400).json({message: "genero invalido "})

        if(description !== undefined){
            if(typeof description !== "string"){
                return res.status(400).json({errorMessage: "'description' invalida"});
            }
        }

        const character= await Character.create({name,ki,race,gender,description});
        res.status(201).json({message: "se ha creado el personaje", character});
        } 
        catch (error) {
        res.status(500).json({mensaje:"error en la creacion del personaje "});
    }

}

export const actulizarPer = async(req, res) =>{
    if(req.body){
    for(let valor in req.body){
        if(typeof req.body[valor] === "string"){
            req.body[valor] = req.body[valor].trim();
        }
    }
   }
   const {name, ki, race, gender, descripcion}=req.body

try{
    if(name){
        const nombreUnico = await Character.findOne({where: {name}});
        if(nombreUnico !==null) return res.status(400).json({message: "nombre exixtente"});}
 

const[updated] = await Character.update({name, ki, race, gender, descripcion},{
    where: {id: req.params.id}
});
if(updated === 0) return res.status(400).json({message: "el personaje no existe"});

return res.status(200).json({message:"se actualizo el personaje"});


} 
catch (error) {
        console.log(error)
        res.status(500).json({mensaje:"error en la creacion del personaje "});
    }
}


export const obtenerTodosLosPersonajes = async(req,res)=>{
    try{
        const personajes = await Character.findAll();
        if(personajes.length=== 0) return res.status(404).json({message: "no se encontro ningun personaje "})

        return res.status(200).json(personajes);
}   catch(error){
    console.log(error)
    res.status(500).json({message: error.message});
}

         
}


export const obtenerPorId = async(req,res)=>{
try{
const personaje = await Character.findByPk(req.params.id);
if(personaje) return res.status(200).json(personaje);

return req.status(404).json({message:"el personaje no existe "});

}catch(error){ res.status(500).json({message: error.message});}
   
}

export const eliminacion= async(req,res)=>{
    try{
const eliminados = await Character.destroy({where:{id:req.params.id}});
console.log(eliminados)

if (eliminados===0)return res.status(404).json({message:"personaje no encontrado"})

 res.status(204).json({message:"personaje eliminado"});

}catch(error){
    console.log(error)
    res.status(500).json({message:error.message});
}
}
