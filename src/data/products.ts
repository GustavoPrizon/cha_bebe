export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imagem: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "bepantol",
    name: "Bepantol",
    description: "Bepantol - kit Leve 4 pague 3",
    price: 45.9,
    imagem: "imagem-1.jpg",
  },
  {
    id: "fraldas-p-50",
    name: "Fraldas (P)",
    description: "Pacote com fraldas tamanho P - 50 unidades.",
    price: 64,
    imagem: "imagem-2.jpg",
  },
  {
    id: "lencol-berco",
    name: "Lençol de Berço",
    description: "Lençol de berço de bebê, lavável na máquina",
    price: 99,
    imagem: "imagem-4.jpg",
  },
  {
    id: "kit-pampers",
    name: "Kit Pampers",
    description:
      "Composto por shampoo, sabonete, óleo hidratante, loção hidratante e fralda RN Pampers.",
    price: 150,
    imagem: "imagem-3.jpg",
  },
  {
    id: "fraldas-m-160",
    name: "Fraldas (M)",
    description: "Pacote com fraldas tamanho M - 160 unidades.",
    price: 227.5,
    imagem: "imagem-5.jpg",
  },
  {
    id: "Banheira",
    name: "Banheira Burigotto",
    description: "Banheira Burigotto Splash + Trocador",
    price: 299,
    imagem: "imagem-6.jpg",
  },
];
