import Post from "./Post";

export default function Posts(props){
    var data = props.data,
    setData = props.setData;
    
    return data.map(dat => (<Post dat={dat} data={data} setData={setData} key={dat.post_id}/>));
}