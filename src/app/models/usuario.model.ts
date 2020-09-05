export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string
  ) {}
}
export class UsuarioModel {
  constructor() {}
  id: number;
  nombreUsuario: string;
  pass: string;
  rolID: number;
}
