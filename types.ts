
export enum NatureType {
  SUNFLOWER = 'SUNFLOWER',
  SEASHELL = 'SEASHELL',
  PINECONE = 'PINECONE'
}

export interface GeometryProps {
  phi: number;
  count: number;
  type: NatureType;
}
