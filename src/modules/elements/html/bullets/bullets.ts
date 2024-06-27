export interface IBullet {
  text: string;
  css: string[];
}

export interface IBullets {
  cssContainer?: string[];
  cssLi?: string[];
  bullets: IBullet[];
}
