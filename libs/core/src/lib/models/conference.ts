export interface Conference {
  id: string;
  title: string;
  // First step to remove compile errors and type errors
  name?: string;
  subTitle: string;
  matches: number;
  chats: number;
  logoUrl: string;
  letsChatWithUrl: string;
  qrImageUrl: string;
}
