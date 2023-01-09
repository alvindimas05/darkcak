import AdSense from "react-adsense";

export default function Ads(){
  return(
    <AdSense.Google
    className="adsbygoogle"
    style={{ display:"block" }}
    client="ca-pub-8704779397583283"
    slot="7624229219"
    format="auto"
    responsive="true"
    />
  );
}