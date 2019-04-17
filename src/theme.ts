import { createMuiTheme } from "@material-ui/core";
import primary from "@material-ui/core/colors/lightGreen";
import secondary from "@material-ui/core/colors/lime";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary[700],
    },
    secondary: {
      main: secondary[500],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
