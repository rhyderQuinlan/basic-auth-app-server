import {removeItem, setItem, getItem} from '../clientStorage';
import {LOCAL_STORAGE_TEMPLATE} from '../../constants';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

let authTokens: AuthTokens | null = null;

export const getAccessToken = async () => {
  if (authTokens && authTokens.accessToken) {
    return authTokens.accessToken;
  }
  return await getItem(LOCAL_STORAGE_TEMPLATE.accessToken);
};

export const getTokens = async () => {
  if (authTokens) {
    return authTokens;
  }
  try {
    const accessToken = await getItem(LOCAL_STORAGE_TEMPLATE.accessToken);
    const refreshToken = await getItem(LOCAL_STORAGE_TEMPLATE.refreshToken);
    if (accessToken) {
      authTokens = {accessToken, refreshToken};
      return {accessToken, refreshToken};
    }
    return null;
  } catch (err) {
    console.error('Failed getTokens');
    console.error(err);
    return null;
  }
};

export const saveTokens = async ({accessToken, refreshToken}: AuthTokens) => {
  authTokens = {accessToken, refreshToken};
  try {
    await setItem(LOCAL_STORAGE_TEMPLATE.accessToken, accessToken);
    await setItem(LOCAL_STORAGE_TEMPLATE.refreshToken, refreshToken);
  } catch (err) {
    console.error('Failed saveTokens');
    console.error(err);
  }
};

export const removeTokens = async () => {
  await removeItem(LOCAL_STORAGE_TEMPLATE.accessToken);
  await removeItem(LOCAL_STORAGE_TEMPLATE.refreshToken);
  authTokens = null;
};
