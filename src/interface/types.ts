export interface Response<T> {
  message: string;
  body: T;
  status: number;
}

export interface ResponseProject {
  urlImage: UrlImage;
  details: Details;
  _id: string;
  projectId: string;
  title: string;
  description: string;
  slug: string;
  githubUrl: string;
  images: Image[];
  tecnologies: string[];
  resume: string;
  objectives: string[];
  learnings: string[];
  outStanding: boolean;
  __v: number;
}

export interface UrlImage {
  url: string;
  alt: string;
}

export interface Details {
  role: string;
  time: string;
}

export interface Image {
  url: string;
  alt: string;
  _id: string;
}

export interface ResponseImage {
  name: string;
  url: string;
  type: string;
  _id: string;
  _v: number;
}
