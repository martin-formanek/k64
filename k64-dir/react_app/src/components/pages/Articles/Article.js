import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import useFetch from "../../../helpers/useFetch.js"

export default function Article() {
    const location = useLocation();
    const jsonAPI = useFetch("jsonapi/node/article/");
    const routerAPI = useFetch("router/");
    const [articleData, setArticleData] = useState({
        title: "",
        content: ""
    });
    
    useEffect(() => {       
        routerAPI.get("translate-path?path=" + location.pathname)
        .then(data => {
            if (!data.resolved) {
                // TODO: REDIRECT TO 404
                return false;
            }
            const uiid = data.entity.uuid;
            
            // TODO: filter only needed fields to enhance perfo
            jsonAPI.get(uiid)
            .then(data => {
                
                const fields = data.data.attributes;
                console.log(fields);
                setArticleData({
                    title: fields.title,
                    content: fields.body.value
                })
            });
        });

    }, []);
    
    return (<>      
        <h1>{articleData.title}</h1>
        <div className="article-content" dangerouslySetInnerHTML={{__html: articleData.content}} />        
    </>);
}