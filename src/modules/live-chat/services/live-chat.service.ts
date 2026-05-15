import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { ApiSuccess, ChatStatus } from '@/types/contracts';

export type ChatConversationDto = {
  id: string;
  guestName?: string | null;
  guestEmail?: string | null;
  status: ChatStatus;
  createdAt: string;
};

export type ChatMessageDto = {
  id: string;
  conversationId: string;
  senderType: 'guest' | 'customer' | 'staff';
  content: string;
  createdAt: string;
};

export const liveChatService = {
  createConversation: async (payload: { guestName?: string; guestEmail?: string }) => {
    const response = await httpClient.post<ApiSuccess<ChatConversationDto>>('/chat/conversations', payload);
    return unwrapApiData(response.data);
  },
  listMessages: async (conversationId: string) => {
    const response = await httpClient.get<ApiSuccess<ChatMessageDto[]>>(`/chat/conversations/${conversationId}/messages`);
    return unwrapApiData(response.data);
  },
  sendMessage: async (conversationId: string, content: string) => {
    const response = await httpClient.post<ApiSuccess<ChatMessageDto>>(`/chat/conversations/${conversationId}/messages`, { content });
    return unwrapApiData(response.data);
  },
  listAdminConversations: async () => {
    const response = await httpClient.get<ApiSuccess<ChatConversationDto[]>>('/admin/chat/conversations');
    return unwrapApiData(response.data);
  },
  listAdminMessages: async (conversationId: string) => {
    const response = await httpClient.get<ApiSuccess<ChatMessageDto[]>>(`/admin/chat/conversations/${conversationId}/messages`);
    return unwrapApiData(response.data);
  },
  adminReply: async (conversationId: string, content: string) => {
    const response = await httpClient.post<ApiSuccess<ChatMessageDto>>(`/admin/chat/conversations/${conversationId}/messages`, { content });
    return unwrapApiData(response.data);
  },
  adminClose: async (conversationId: string) => {
    const response = await httpClient.patch<ApiSuccess<ChatConversationDto>>(`/admin/chat/conversations/${conversationId}/close`);
    return unwrapApiData(response.data);
  }
};
