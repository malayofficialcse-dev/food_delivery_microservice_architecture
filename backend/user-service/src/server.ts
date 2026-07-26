import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { init } from "./services/index.service";
const port = Number(process.env.PORT || 5002);
init().then(() => app.listen(port, () => console.log(`User service running on ${port}`))).catch((error) => { console.error(error); process.exit(1); });
