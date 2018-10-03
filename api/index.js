/* tslint:disable:no-console */

import app from "./app";
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});
