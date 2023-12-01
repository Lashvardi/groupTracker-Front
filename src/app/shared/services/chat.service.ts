import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: HubConnection;

  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7273/chatHub') // Adjust the URL to your setup
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public sendMessage = (
    receiverUserId: string,
    message: string,
    senderId: string
  ) => {
    this.hubConnection
      .invoke('SendMessage', receiverUserId, message, senderId)
      .catch((err) => console.error(err));
  };

  public addReceiveMessageListener = (
    onReceiveMessage: (senderId: string, message: string) => void
  ) => {
    this.hubConnection.on('ReceiveMessage', (senderId, message) => {
      onReceiveMessage(senderId, message);
    });
  };
}
