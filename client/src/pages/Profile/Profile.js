export default function Profile(props){
    var profile = props.profile,
    pcss = {
        textAlign:"center",
        fontSize:"14px"
    },
    divimgcss = {
        height:"75px",
        width:"75px",
        borderRadius:"1000px",
        overflow:"hidden",
        display:"flex",
        justifyContent:"center"
    },
    imgcss = {
        height:"inherit"
    };

    function src_check(){
        if(props.src) return props.src;
        else return process.env.REACT_APP_BASE_URL + "/api/user/image?username=" + profile.user;
    }
    return(
        <div className="container" id="profile">
            <div>
                <div className="mt-2" align="center">
                    <div style={divimgcss} align="center">
                        <img alt="Profile" style={imgcss} src={src_check()}/>
                    </div>
                </div>
            </div>
            <h3 className="mt-1 text-center">{profile.user}</h3>
            <p style={pcss}>
                {profile.description ? profile.description : "Insert description here he said"}
            </p>
            <hr/>
        </div>
    )
}