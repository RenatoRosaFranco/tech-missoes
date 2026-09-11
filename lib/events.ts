export type CommunityEvent = {
  id: string;
  title: string;
  dateLabel: string;
  place: string;
  description: string;
  href?: string;
};

export const communityEvents: CommunityEvent[] = [];
