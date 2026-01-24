/**
 * WebSocket Service
 * Handles real-time communication for notifications, live updates, etc.
 */

type MessageHandler = (data: any) => void;
type EventHandler = (event: Event) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private messageHandlers: Map<string, MessageHandler[]> = new Map();
  private isConnecting = false;

  constructor(url: string = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/ws') {
    this.url = url;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      if (this.isConnecting) {
        reject(new Error('Connection in progress'));
        return;
      }

      this.isConnecting = true;

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const wsUrl = token ? `${this.url}?token=${token}` : this.url;

        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          this.isConnecting = false;
          resolve();
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(event);
        };

        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isConnecting = false;
          reject(error);
        };

        this.socket.onclose = () => {
          console.log('WebSocket disconnected');
          this.isConnecting = false;
          this.attemptReconnect();
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect().catch((error) => {
          console.error('Reconnection failed:', error);
        });
      }, this.reconnectDelay);
    }
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data);
      const { type, data } = message;

      const handlers = this.messageHandlers.get(type) || [];
      handlers.forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in message handler for type ${type}:`, error);
        }
      });
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }

  subscribe(messageType: string, handler: MessageHandler): () => void {
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, []);
    }

    this.messageHandlers.get(messageType)!.push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(messageType);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  send(type: string, data: any): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, data }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageHandlers.clear();
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

export const wsService = new WebSocketService();
