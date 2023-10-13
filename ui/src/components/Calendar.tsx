import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import {
  DayCellContentArg,
  DayHeaderContentArg,
  EventClickArg,
} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import et from "@fullcalendar/core/locales/en-au";

import { CSSProperties } from "react";
import { Event } from "../types/event";

type Props = {
  onEventClick: (id: string) => Promise<void>;
  onCreateEventButtonClick: () => void;
  events: Event[];
};

export const MyCalendar = ({
  onEventClick,
  onCreateEventButtonClick,
  events,
}: Props) => {
  const renderHeaderContent = (info: DayHeaderContentArg) => {
    const headerStyle: CSSProperties =
      info.text === "Sun" || info.text === "Sat" ? { color: "#dd4822" } : {};
    return <p style={headerStyle}>{info.text}</p>;
  };

  const renderCellContent = (info: DayCellContentArg) => {
    const day = info.date.getDay();
    const cellStyle: CSSProperties =
      day === 0 || day === 6 ? { color: "#dd4822" } : {};

    return <p style={cellStyle}>{info.dayNumberText}</p>;
  };
  return (
    <FullCalendar
      selectable
      editable
      locale={et}
      dayHeaderContent={renderHeaderContent}
      dayCellContent={renderCellContent}
      plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
      initialView="dayGridMonth"
      themeSystem="bootstrap5"
      headerToolbar={{
        start: "createEvent",
        center: "title",
        end: "prev next",
      }}
      customButtons={{
        createEvent: {
          text: "Create Event",
          click: () => onCreateEventButtonClick(),
        },
      }}
      events={events}
      eventClick={async (info: EventClickArg) => {
        onEventClick(info.event.id);
      }}
    />
  );
};
