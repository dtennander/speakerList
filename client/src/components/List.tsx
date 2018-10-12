import * as React from 'react'
import {Speaker} from "models";

interface ListProps {
    data : Speaker[]
}

const List : React.SFC<ListProps> = (props : ListProps) => {
    return (
        <ul>
            {props.data.map(createListItem)}
        </ul>
    );
};

function createListItem(item: Speaker) {
    const style = item.have_spoken ? {textDecoration: "line-through"} :{};
    return (
        <li style={style} key={item.name}> {item.name} </li>
    )
}

export default List