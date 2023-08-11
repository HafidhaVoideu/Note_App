import React from "react";
import { useTheme, Typography } from "@mui/material";
import { tokens } from "../theme/muiTheme";

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Typography
      color={colors.white[900]}
      sx={{ width: "100%" }}
      component="h1"
      variant="h3"
      fontWeight="700"
    >
      {title}
    </Typography>
  );
};

export default Title;
