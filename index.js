import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shuffle } from './utils';


const generateInts = (n) => {
    let arr = new Array(n);
    for (let i = 0; i < n; ++i) {
        arr[i] = i;
    }
    arr = shuffle(arr);
    return arr;
};


const cards = (state = [], action) => {
    switch (action.type) {
    case 'GENERATE_CARDS':
        return generateInts(52);
    default:
        return state;
    }
};

const reducer = (state = {}, action) => {
    return {
        cards: cards(state.cards, action),
    };
};

const store = createStore(reducer);


class Card extends React.Component {
    render() {
        return (
            <div>{this.props.cardId}</div>
        );
    }
}
Card.propTypes = {
    cardId: React.PropTypes.integer,
};

class CardsList extends React.Component {
    render() {
        const components = this.props.cards.map((cardId, idx) => {
            return (
                <Card key={idx} cardId={cardId} />
            );
        });
        return (
            <div className="cardsList">
                {components}
            </div>
        );
    }
}
CardsList.propTypes = {
    cards: React.PropTypes.array,
};

class CardsApp extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => {
                    store.dispatch({
                        type: 'GENERATE_CARDS',
                    });
                }}>
                    Generate Random Cards
                </button>
                <CardsList cards={this.props.cards} />
            </div>
        );
    }
}
CardsApp.propTypes = {
    cards: React.PropTypes.array,
};

const render = () => ReactDOM.render(
    <CardsApp {...store.getState()} />,
    document.getElementById('root')
);

store.subscribe(render);
render();
