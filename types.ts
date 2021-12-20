export interface IRasaMessage {
  sender: string;
  message: string;
}

export interface IButton {
  title: string;
  payload: string;
}


export interface IRasaResponse {
  text: string;
  buttons?: IButton[];
  image?: string;
}