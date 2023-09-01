import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Categoria } from "./Categoria";

@Entity('tarefas')
export class Tarefa extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'timestamp',
    default: 'NOW()'
  })
  public criado_em: string;

  @Column()
  public descricao: string;

  @Column({
    type: 'date'
  })
  public prazo: string;

  @Column({
    type: 'char'
  })
  public situacao: string;

  @Column()
  public categorias_idcategoria: number;

  @Column()
  public usuarios_idcriador: number;

  @Column()
  public usuarios_idexecutor: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.tarefa)
  @JoinColumn({ name: 'categorias_idcategoria' })
  public categoria: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.tarefaCriador)
  @JoinColumn({ name: 'usuarios_idcriador' })
  public usuario_criador: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.tarefaExecutor)
  @JoinColumn({ name: 'usuarios_idexecutor' })
  public usuario_executor: Usuario;
}
