import BackgroundTimer from "react-native-background-timer";
import { Notifications } from "react-native-notifications";
import config from "./config";

export default function Notif(){
    const ws = new WebSocket(config.ws_url);
    ws.onopen = () => BackgroundTimer.runBackgroundTimer(() => {
        if(ws.readyState === WebSocket.OPEN) ws.send("ping");
    }, 60 * 1000);
    ws.onmessage = (e) => {
        if(e.data !== "pong"){
            var data = JSON.parse(e.data);
            Notifications.postLocalNotification({
                title:"Darkcak Admin",
                body:`Received report type ${data.type === 1 ? "Post" : "Comment"} from ${data.from}`
            });
        }
    }
}