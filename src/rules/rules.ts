export type Category = keyof typeof rules;

export type PenaltyType = "atenai" | "jogai" | "mubobi" | "chukoku";

export const rules = {
  IPPON: {
    winPoints: 2,
    penalties: {
      atenai: 3,
      jogai: 3,
      mubobi: 3,
    },
  },
  NIHON: {
    winPoints: 4,
    penalties: {
      atenai: 3,
      chukoku: 4,
    },
  },
  SANBON: {
    winPoints: 6,
    penalties: {
      atenai: 3,
      chukoku: 4,
    },
  },
} as const;
