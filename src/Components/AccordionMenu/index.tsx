import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"

import {
    Container,
    TitleContainer,
    Title,
    Icon,
    Menu,
    Name,
    Item,
    Value,
    QuantityContainer,
    RemoveButton,
    AddButton,
    Quantity
} from './style'

interface ListItem {
    name: string;
    price: string;
    qtd: number;
}[];

interface ListItemProps {
    items: ListItem[];
    title: string;
}

export default function AccordionMenu({ title, items }: ListItemProps) {
    const [open, setOpen] = useState(false)
    const [count, setCount] = useState(0)

    return (
        <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
            <Container>
                <TitleContainer>
                    <Title>{title}</Title>
                    <Icon name={open ? "caret-up" : "caret-down"} size={24} />
                </TitleContainer>
                {open && (<Menu>
                    {items.map((item, index) =>
                    (<Item key={index}>
                        <Name>{item.name}</Name>
                        <Value>{item.price}</Value>
                        <QuantityContainer removeClippedSubviews={true}>
                            <RemoveButton                                
                                name="remove-circle"
                                color="red"
                                size={24}
                                onPress={setCount(count === 0 ? 0 : count - 1)
                                }
                            />
                            <Quantity                            
                            contextMenuHidden={true}
                            value={count.toString()}
                            onChange={() => setCount(count)}
                            keyboardType='numeric' />
                            <AddButton  
                                color="green"
                                name="add-circle"
                                size={24}
                                onPress={setCount(count + 1)} />
                        </QuantityContainer>
                    </Item>))}
                </Menu>
                )}
            </Container>
        </TouchableWithoutFeedback>
    )
}

