import { IsNotEmpty, Length } from 'class-validator';

export class CreateNotificationsBody {
  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  category: string;
}
