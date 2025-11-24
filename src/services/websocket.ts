import { HOST } from '../constants';
import { HTTPTransport } from '../core/httpTransport';

export type MessageFileResponse = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type MessageResponse = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: MessageFileResponse;
};

export type MessagesResponse = MessageResponse[];

export interface WebSocketConfig {
  chatId: string;
  userId: string;
  onMessageReceive: (message: MessagesResponse) => void;
  onUserConnected?: (data: { content: string; type: string }) => void;
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
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    );
  });

  socket.addEventListener('message', event => {
    try {
      const parsedData = JSON.parse(event.data);
      console.log('Получены данные', parsedData);

      if ('type' in parsedData && parsedData.type === 'user connected') {
        config.onUserConnected?.(parsedData);
      } else {
        const processedData = Array.isArray(parsedData) ? parsedData : [parsedData];
        config.onMessageReceive(processedData);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
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
