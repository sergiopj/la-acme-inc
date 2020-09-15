import { NavigableButton, screenReady } from '@telefonica/la-web-sdk';
import { HomeScreenData } from '../../../../../dialogs/src/models';
import { Preloadable, useAura } from '@telefonica/la-web-sdk';
import React, { useEffect } from 'react';
import { Intent } from '../../../../../dialogs/src/models';


const HomeScreen: React.FC<HomeScreenData> = (data: HomeScreenData) => {
    const { categories, title } = data;

    const { sendCommand } = useAura();   
    
    const test: any = {};

    const goToGames = () => {
        console.log('test')
        sendCommand({ intent: Intent.GAMES, entities: [test] });
    }
    return (
        <div className="HomeScreen">
            <h1>{title}</h1>
            {console.log(categories)}
            {categories.map((category: any) => (
                <NavigableButton
                    onClick={(e: any) => goToGames()}
                    key={category.id}
                    defaultClass=""
                    focusedClass=""
                    id="categories-button"
                >
                    Go to {category.name}
                </NavigableButton>
            ))}
        </div>
    );
};

export default screenReady(HomeScreen);
