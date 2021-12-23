export interface IRasaMessage {
  sender: string;
  message: string;
}

export interface IButton {
  title: string;
  payload: string;
}


export interface IRasaResponse {
  recipient_id: string | number
  text?: string;
  image?: string;
  json_message?: {};
  template?: string;
  response?: string;
  attachment?: IButtonTemplate;
  buttons?: IButton[];
  elements?: object[]
}

// Using as reference Facebook schemas
// https://developers.facebook.com/docs/messenger-platform/send-messages/templates
export interface IButtonTemplate {
  type: string;
  payload: {
    template_type: "radio" | "checkbox";
    text: string;
    payload?: string;
    slot: string;
    buttons: {
      type?: string;
      title?: string;
      payload?: string;
    }[]
  }
}
