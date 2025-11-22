import { HOST } from '../constants';
import { HTTPTransport } from '../core/httpTransport';

export interface WebSocketConfig {
  chatId: string;
  userId: string;
  onMessageReceive: (message: string) => void;
}

export interface WebSocketObject {
  close: () => void;
  sendMessage: (arg: string) => void;
}

const chatsApi = new HTTPTransport(`${HOST}/chats`);

export async function openWebsocket(config: WebSocketConfig): Promise<WebSocketObject> {
  const resp = await chatsApi.post<{ token: string }>(`/token/${config.chatId}`);
  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${config.userId}/${config.chatId}/${resp.data.token}`
  );

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
  });

  socket.addEventListener('message', event => {
    console.log('Получены данные', event.data);
  });

  return {
    close: () => {
      socket.close();
    },
    sendMessage: msg => {
      socket.send(
        JSON.stringify({
          content: msg,
          type: 'message',
        })
      );
    },
  };
}
