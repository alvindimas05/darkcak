export default function Loading(){
    return(
        <div className="position-fixed pt-5 top-0 start-0 w-100 h-100"
        style={{ backgroundColor:"white", zIndex:"10" }}>
            <div className="w-100" align="center">
                <img className="w-50" src="https://media.tenor.com/0oQHLsM7HTcAAAAC/cute-chibi.gif" 
                alt="Loading Gif Anime"/>
            </div>
            <div className="w-100 text-center">
                <h2>Loading...</h2>
            </div>
        </div>
    )
}