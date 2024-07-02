// src/Mapeo.ts
import aracnido from '../assets/aracnido.png';
import bicho from '../assets/bicho.png';
import bicho2 from '../assets/bicho2.jpeg';
import descarga from '../assets/descarga.png';
import dibujo from '../assets/dibujo.jpg';
import Gato from '../assets/Gato.jpeg';
import gato2 from '../assets/gato2.jpg';
import img from '../assets/img.png';
import perro from '../assets/perro.jpg';
import Serpiente from '../assets/Serpiente.jpg';

const imageMap: { [key: string]: string } = {
  'aracnido.png': aracnido,
  'bicho.png': bicho,
  'bicho2.jpeg': bicho2,
  'descarga.png': descarga,
  'dibujo.jpg': dibujo,
  'Gato.jpeg': Gato,
  'gato2.jpg': gato2,
  'img.png': img,
  'perro.jpg': perro,
  'Serpiente.jpg': Serpiente
};

export const getImage = (imageName: string): string => {
  return imageMap[imageName] || ''; // Retorna la imagen o una cadena vacía si no se encuentra
};
