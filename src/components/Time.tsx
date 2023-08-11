import React from "react";
import { parseISO, format } from "date-fns";

import ar from "date-fns/locale/ar";

import fr from "date-fns/locale/fr";
import en from "date-fns/locale/en-US";
type TimeAgoProps = {
  timestamp: string;
  lang: string;
};

const Time = ({ timestamp, lang }: TimeAgoProps) => {
  const locale = lang === "AR" ? ar : lang === "FR" ? fr : en;

  const date =
    lang === "AR" || lang === "FR"
      ? format(parseISO(timestamp), "dd  MMMM , yyyy -  HH:mm a ", {
          locale,
        })
      : format(parseISO(timestamp), " MMMM  dd  , yyyy -  hh :mm a", {
          locale,
        });

  return (
    <span
      dir={lang === "AR" ? "rtl" : "ltr"}
      style={{
        marginTop: "1rem",
        fontStyle: "italic",
        color: "#343333",

        fontFamily: lang === "AR" ? "Cairo" : "Roboto",
      }}
      title={timestamp}
    >
      &nbsp; <i>{date}</i>
    </span>
  );
};

export default Time;
