export interface Game {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    valoracion: number;
    fechadesalida: Date;
    categorias: string[];
    empresa: string;
    imagen: '';
  }