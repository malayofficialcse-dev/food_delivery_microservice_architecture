import express,{Application, urlencoded} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import notificationRoute from "./routes/notification.routes";

const app :Application = express();
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(morgan("dev"));

app.get("/",(req,res) => {
    res.status(200).json(
        {
            success:true,
            service:"Notification service",
            message:"Notification service is running"
        }
    );
});


app.use("/api/v1/notifications",notificationRoute);