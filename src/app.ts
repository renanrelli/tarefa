import promptSync from 'prompt-sync';
const prompt = promptSync();
import db from './db';
import { CategoriaMenu } from "./views/CategoriaMenu";
import { UsuarioController } from './controllers/UsuarioController';
import { UsuarioMenu } from './views/UsuarioMenu';

async function main():Promise<void>{

  await db.initialize()
  menuLogin();
}
main()

async function menuLogin(){
  let input: string = '';
  let usuarioController = new UsuarioController();

  do{
    console.clear();
    console.log('0 - Sair');
    console.log('1 - Login');


    input = prompt('Selecione a opção desejada:');
    if(input == '1'){
      let login = await usuarioController.login();
      if (login == true){
        await menu();
      } else{
        console.log('Usuário ou senha incorretos');
      }
    }
    prompt('Pressione qualquer tecla para continuar:')
  }
  while(input != '0');


}
async function menu(){
  let categoriaMenu: CategoriaMenu = new CategoriaMenu();
  let usuarioMenu: UsuarioMenu = new UsuarioMenu();
  let input: string = '';
  do{
    console.clear();
    usuarioMenu.show()
    categoriaMenu.show()
    console.log('0 - Sair');
    input = prompt('Selecione a opção desejada:');

    if(input != '0'){
      await usuarioMenu.execute(input)
      await categoriaMenu.execute(input)
      prompt('Pressione qualquer tecla para continuar:')
    }
  }
  while(input != '0');


};
