import promptSync from 'prompt-sync';
const prompt = promptSync();
import db from './db';
import { CategoriaMenu } from "./views/CategoriaMenu";
import { TarefaMenu } from "./views/TarefaMenu";
import { UsuarioMenu } from './views/UsuarioMenu';
import { UsuarioController } from './controllers/UsuarioController';
import { TarefaController } from './controllers/TarefaController';

async function main():Promise<void>{

  await db.initialize()
  menu();
}

async function menu(){
  let input: string = '';
  let usuarioController = new UsuarioController();
  let tarefaController = new TarefaController();
  let categoriaMenu: CategoriaMenu = new CategoriaMenu();
  let usuarioMenu: UsuarioMenu = new UsuarioMenu();
  let tarefaMenu: TarefaMenu = new TarefaMenu();


  do{
    console.clear()
    console.log('0 - Sair');
    console.log('1 - Login');
    input = prompt('Selecione a opção desejada:');
    if(input == '1'){
      let login = await usuarioController.login();
      if (login){
        await tarefaMenu.idUsuarioLogado(login.id);
        do{
          console.clear();
          usuarioMenu.show()
          categoriaMenu.show()
          tarefaMenu.show()
          console.log('0 - Sair');
          input = prompt('Selecione a opção desejada:');

          if(input != '0'){
            await usuarioMenu.execute(input)
            await categoriaMenu.execute(input)
            await tarefaMenu.execute(input)
            prompt('Pressione qualquer tecla para continuar:')
          }
        }
        while(input != '0');
      } else{
        console.log('Usuário ou senha incorretos');
      }
    }
    prompt('Pressione qualquer tecla para continuar:')
  }
  while(input != '0')
};
main()
