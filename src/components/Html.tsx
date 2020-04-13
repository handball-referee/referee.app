interface Props {
  body: string;
  styles: string;
  scripts: string;
  state: string;
}

const Html: (props: Props) => string = ({
  body, styles, scripts, state,
}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="theme-color" content="#000000">
  <link rel="manifest" href="/static/manifest.json">
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  ${styles}
  <title>Handball Referee Test</title>
</head>
<body style="margin: 0">
  <div id="app">${body}</div>
  <script>
    window.__PRELOADED_STATE__ = ${state.replace(/</g, "\\u003c")}
  </script>
  ${scripts}
</body>
</html>`;

export default Html;
