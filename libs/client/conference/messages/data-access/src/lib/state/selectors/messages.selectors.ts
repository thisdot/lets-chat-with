import { createSelector, createFeatureSelector } from '@ngrx/store';
import { messageFeatureKey, MessagesState } from '../reducers';
import { ChatThread, IdentifierModel, InterestModel, Message } from '@conf-match/api';
import { MatchesSelectors } from '@conf-match/client/conference/matches/data-access';
import { MatchAttendeeNumber } from '@conf-match/core';

export const selectMessages = createFeatureSelector<MessagesState>(messageFeatureKey);

export const selectChatThreadList = createSelector(
  selectMessages,
  (state) => state?.chatThreadList
);

/**
 * Returns a message chatThread with another participant if exists
 */
export const selectChatThreadByParticipant = (participantId: string) =>
  createSelector(selectChatThreadList, (chatThreads: ChatThread[]) => ({
    chatThread: chatThreads?.find((chatThread) => chatThread.match.attendee.id === participantId),
    participantId,
  }));

/**
 * Returns a message chatThread with another participant if exists
 */
export const selectChatThreadByMatch = (matchId: string) =>
  createSelector(selectChatThreadList, (chatThreads: (ChatThread & { matchId: string })[]) => ({
    chatThread: chatThreads?.find((chatThread) => chatThread.matchId === matchId),
    matchId,
  }));

export const selectChatThreadListTerm = createSelector(
  selectMessages,
  (state) => state?.chatThreadListTerm
);

export const selectFilteredChatThreadList = createSelector(
  selectChatThreadList,
  MatchesSelectors.selectGetMatchBasicInfo,
  selectChatThreadListTerm,
  (chatThreads, getMatchInfo, term) =>
    chatThreads
      ?.map((chatThread) => {
        const lastMessage = chatThread.messages.items.find(
          (message: Message) => message.createdAt === chatThread.lastMessageAt
        );
        return {
          ...chatThread,
          messages: { ...chatThread.messages, items: lastMessage ? [lastMessage] : [] },
        };
      })
      ?.filter(
        (chatThread: ChatThread & { matchId: string }) =>
          getMatchInfo(chatThread.matchId)
            ?.attendee?.fullName?.toLowerCase()
            ?.indexOf(term.toLowerCase()) > -1
      )
      ?.map((chatThread: ChatThread & { matchId: string }) => ({
        ...chatThread,
        match: getMatchInfo(chatThread.matchId),
      }))
);

export const selectChatThreadListCount = createSelector(
  selectFilteredChatThreadList,
  (state) => state?.length
);

export const selectChatThread = createSelector(selectMessages, (state) => state?.chatThread);
export const selectChatThreadMessages = createSelector(
  selectChatThread,
  (chatThread) => chatThread?.messages
);

export const selectChatThreadInterests = createSelector(
  selectChatThread,
  MatchesSelectors.selectGetMatchBasicInfo,
  (chatThread: ChatThread & { matchId: string }, getMatchInfo): InterestModel[] => {
    const match = getMatchInfo(chatThread.matchId);
    return match.interests
      .filter((matchInterest) => matchInterest.attendeeId !== match.attendee.id)
      .map((matchInterest) => matchInterest.interest);
  }
);

export const selectChatThreadIdentifiers = createSelector(
  selectChatThread,
  MatchesSelectors.selectGetMatchBasicInfo,
  (chatThread: ChatThread & { matchId: string }, getMatchInfo): IdentifierModel[] => {
    const match = getMatchInfo(chatThread.matchId);
    return match.desiredIdentifiers
      .filter((matchdesiredIdentifier) => matchdesiredIdentifier.attendeeId !== match.attendee.id)
      .map((matchdesiredIdentifier) => matchdesiredIdentifier.desiredIdentifier);
  }
);

export const selectChatThreadInfo = createSelector(
  selectChatThread,
  MatchesSelectors.selectGetMatchBasicInfo,
  (chatThread: ChatThread & { matchId: string }, getMatchInfo) => {
    return chatThread ? getMatchInfo(chatThread.matchId) : null;
  }
);
export const selectChatThreadAttendeeNumber = createSelector(
  selectChatThread,
  MatchesSelectors.selectGetMatchBasicInfo,
  (chatThread: ChatThread & { matchId: string }, getMatchInfo): MatchAttendeeNumber => {
    if (!chatThread) {
      return null;
    }
    const match = getMatchInfo(chatThread.matchId);
    return match.attendee1Id === match.attendee.id ? 'Attendee1' : 'Attendee2';
  }
);

export const selectMatchedSince = createSelector(
  selectChatThread,
  MatchesSelectors.selectGetMatchBasicInfo,
  (chatThread: ChatThread & { matchId: string }, getMatchInfo) =>
    getMatchInfo(chatThread.matchId)?.createdAt
);

export const selectMessagesNextToken = createSelector(
  selectChatThread,
  (chatThread) => chatThread?.messages.nextToken
);

export const selectIsLoadingMessages = createSelector(
  selectMessages,
  (state) => state?.isLoadingMessages
);
