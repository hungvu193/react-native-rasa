import { v4 as uuidv4 } from 'uuid';
import {
  IMessage,
  User
} from 'react-native-gifted-chat';
import { IRasaResponse } from './types';
/**
 * Random id for each message
 */
export { uuidv4 };

/**
 * Return message after format
 * @param {Object} botMessageObj
 * @param {Object} botData
 */

// To do add compatibility for checkboxes (It will need create a custom schema similar tu slack)
export const createNewBotMessage = (botMessageObj: IRasaResponse, botData: User): IMessage => {
  return {
    createdAt: new Date(),
    _id: uuidv4(),
    user: botData,
    text: botMessageObj?.text ?? '',
    image: botMessageObj?.image ?? '',
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: false,
      values: botMessageObj?.buttons?.map((button) => ({
        title: button.title,
        value: button.payload,
      })) ?? [],
    },
  };
}

/**
 * Receive a string and return bot message
 * @param {string} emptyMessage
 * @param {Object} botData
 */
export const createBotEmptyMessage = (emptyMessage: string, botData: User): IMessage => {
  return {
    createdAt: new Date(),
    _id: uuidv4(),
    user: botData,
    text: emptyMessage,
  };
}

/**
 * Receive a string, userDta and return user message
 * @param {string} text
 * @param {Object} userData
 */
export const createQuickUserReply = (text: string, userData: User): IMessage => {
  return {
    createdAt: new Date(),
    _id: uuidv4(),
    user: userData,
    text,
  };
}

export const fetchOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};


export const isValidNotEmptyArray = (array: any[]) => {
  if (
    typeof array !== 'undefined'
    && array != null
    && array.length != null
    && array.length > 0
  ) {
    return true;
  }
  return false;
};