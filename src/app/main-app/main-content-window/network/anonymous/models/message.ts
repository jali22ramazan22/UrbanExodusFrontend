export class Message{
  constructor(
    public sender: string,
    public messageContent: string,
    public sent?: Date
  ){}
}
