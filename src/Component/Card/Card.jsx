import Icon from "../Icon/Icon";
import './Card.css'
function Card({onPlay,player,index,gameEnd}){

    let icon =<Icon/>
    if(player=='X'){
        icon = <Icon name={'cross'}/>
    }
    else if(player=='0'){
        icon = <Icon name={'circle'}/>
    }
    return(
        <div className="card" onClick={()=> !gameEnd && player=="" && onPlay(index)}> {/** if someone clicks on the card the state of the card should change */}
            {icon}
        </div>
    );

}

export default Card;

// for using icons we're using react-icon module