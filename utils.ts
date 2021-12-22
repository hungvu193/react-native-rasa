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
 * Return a message after format
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
 * Receives a string and botData and returns an empty bot message
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

/**
 * Receive an array and Returs true if is a valid array and its is not empty otherwise it returns false
 * @param {array} array
 */
export const isValidNotEmptyArray = (array: any[]): boolean => {
  return !!(array && array?.length && array?.length > 0)
};