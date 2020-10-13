//Llamar modulos necesarios
const { readdirSync } = require("fs")
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Load status");
//Iniciamos el exportamiento
module.exports = (client) => {
    const load = dirs => {

        const commands = readdirSync(`./cmds/${dirs}/`).filter(d => d.endsWith('.js'));
        /*Llamamos que si la carpeta commands esta conectada con el npm FS le de que busque dicha carpeta junto a su 
  SubCarpeta
  */
        for (let file of commands) { //For para acortar todo
            let carpeta = require(`../cmds/${dirs}/${file}`); //Si la Subcarpeta esta en la ruta CMDS pase a su respectivo CMD 

            client.commands.set(carpeta.config.name, carpeta); //Acá iniciamos un nuevo establecimiento
            if (carpeta.config.name) { // NO TOCAR
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> falta un help.name, o help.name no es un string.`);
                continue;
            }//NO TOCAR 
            if (carpeta.config.alias) carpeta.config.alias.forEach(a => client.alias.set(a, carpeta.config.name)); /*
            Hacemos un condicionador de la carpeta junto al config que tendra nuestro cmd junto al alias
            y hacemos dicho forEach
            */
        }; //Cerramos for
    };
    require('fs')
        .readdirSync('./cmds')
        .filter(a => !a.endsWith('.js'))
        .forEach(x => load(x));
    //Hacemos un array con las subcarpetas que habrán en la carpeta dominante (CMDS)
    console.log(table.toString());//NO TOCAR
};//Cierre de exportamiento