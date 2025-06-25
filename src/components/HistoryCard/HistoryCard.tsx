import type { CityItem } from "../../store/types";
import { HistoryItem } from "./HistoryItem/HistoryItem";

import style from "./style.module.scss";

type Props = {
  history: CityItem[];
  onItemClick: (city: string, isPendingRemove: boolean) => void;
  onItemRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, isPending: boolean) => void;
};

export const HistoryCard = ({ history, onItemClick, onItemRemove }: Props) => {
  return (
    <div className={style.cardWrapper}>
      {[...history].reverse().map((item) => {
        const isPendingRemove = !!item.removed;

        return (
          <HistoryItem
            key={item.id}
            item={item}
            isPendingRemove={isPendingRemove}
            onItemClick={onItemClick}
            onItemRemove={onItemRemove}
          />
        );
      })}
    </div>
  );
};
