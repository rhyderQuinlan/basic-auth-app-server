import axios, {HttpStatusCode} from 'axios';

export enum Method {
  GET = 'get',
  POST = 'post',
}

export async function httpRequest(
  path: string,
  method: string,
  body: any,
): Promise<{data: any | null; status: number}> {
  console.log(`HTTPREQUEST http://localhost:3001/${path}`);
  const options = {
    method: method,
    url: `http://localhost:3001/${path}`,
    data: body,
  };

  return axios
    .request(options)
    .then((response: any) => {
      return {data: response.data.data, status: response.data.status};
    })
    .catch((error: any) => {
      console.error(error);
      return {data: null, status: HttpStatusCode.InternalServerError};
    });
}
