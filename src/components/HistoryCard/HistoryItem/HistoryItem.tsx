import clsx from "clsx";
import dayjs from "dayjs";
import type { CityItem } from "../../../store/types";
import { palette } from "../../../styles/palette";
import { Button } from "../../Button/Button";
import { Icon } from "../../Icons";
import style from "./style.module.scss";

type Props = {
  item: CityItem;
  isPendingRemove: boolean;
  onItemClick: (city: string, isPendingRemove: boolean) => void;
  onItemRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, isPending: boolean) => void;
};

export const HistoryItem = ({ item, isPendingRemove, onItemClick, onItemRemove }: Props) => {
  return (
    <div
      key={item.id}
      className={clsx(style.historyItem, {
        [style.historyItemPending]: isPendingRemove,
      })}
      onClick={() => onItemClick(item.city, isPendingRemove)}
    >
      <div key={item.id} className={style.titleWrapper}>
        <div> {item.city}</div>
        <div style={{ fontSize: "12px", color: palette.greyMedium }}>
          {dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}
        </div>
      </div>
      <div>
        <Button
          icon
          style={{ color: palette.darkMedium }}
          onClick={(e) => onItemRemove(e, item.id, isPendingRemove)}
          title={isPendingRemove ? "Undo" : "Remove"}
        >
          <Icon name={isPendingRemove ? "undo" : "remove"} />
        </Button>
      </div>
    </div>
  );
};
