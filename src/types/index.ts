import { IconName, IconType } from "./icons";

export type { IconName, IconType };

export type Notification = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  readType: string;
};

export type NoticeType = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  fixed: boolean;
  category: {
    id: number;
    name: string;
  };
};

export type UserBoardType = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  ViewCount: number;
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    profile: {
      username: string;
      image: string;
    };
  };
};

export type CategoryType = {
  id: number;
  name: string;
};

export const BannerType = {
  APP: "APP",
  WEB: "WEB",
} as const;

export const RankInfo = {
  JUN: {
    key: "JUN",
    label: "준회원",
    imageSrc: "/images/profile/emerald-2-refined.png",
  },
  JAJO: {
    key: "JAJO",
    label: "자조회원",
    imageSrc: "/images/profile/topaz-refined.png",
  },
  JOONGHEUNG: {
    key: "JOONGHEUNG",
    label: "중흥회원",
    imageSrc: "/images/profile/opal-refined.png",
  },
  BOOGUK: {
    key: "BOOGUK",
    label: "부국회원",
    imageSrc: "/images/profile/diamond-2-refined.png",
  },
  UNRANKED: {
    key: "UNRANKED",
    label: "예비회원",
    imageSrc: "/images/profile/sapphire-refined.png",
  },
} as const;

export type RankKey = keyof typeof RankInfo;
export type RankLabel = (typeof RankInfo)[RankKey]["label"];

export const getRankImage = (rankKey: RankKey | undefined): string => {
  if (!rankKey) return RankInfo.UNRANKED.imageSrc;
  return RankInfo[rankKey].imageSrc;
};

export const getRankLabel = (rankKey: RankKey | undefined): RankLabel => {
  if (!rankKey) return RankInfo.UNRANKED.label;
  return RankInfo[rankKey].label;
};
