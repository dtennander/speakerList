import * as React from 'react'

interface ListProps {
    data : string[]
}

const List : React.SFC<ListProps> = (props : ListProps) => {
    return (
        <ul>
            {props.data.map(createListItem)}
        </ul>
    );
};

function createListItem(item: string) {
    return (
        <li key={item}> {item} </li>
    )
}

export default List