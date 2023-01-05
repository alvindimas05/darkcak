import AdSense from "react-adsense";

export default function Ads(){
    return(
        <>
          <AdSense.Google
          client="ca-pub-8704779397583283"
          slot="7624229219"
          style={{ display:"block" }}
          format="auto"/>  
        </>
    )
}